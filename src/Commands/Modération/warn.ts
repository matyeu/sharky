import { ActionRowBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonInteraction, ButtonStyle, CommandInteraction, EmbedBuilder, Message, TextChannel } from "discord.js";
import { EMBED_SUCCESS, EMBED_CLOSE, FOOTER_MODERATION, IDLE_BUTTON, EMBED_INFO } from "../../config";
import { dateDay, SharkClient } from "../../Librairie";
import { find as findGuild } from "../../Models/guild";
import { create as createWarn, find as findWarn, findOne as findOneWarn, findGuild as findGuilWarn } from "../../Models/warn";

const Logger = require("../../Librairie/logger");

export default async function (client: SharkClient, interaction: CommandInteraction, language: any) {

    const serverConfig: any = await findGuild(interaction.guild!.id);
    const memberStaff = interaction.guild?.members.cache.get(interaction.user.id)!;

    //@ts-ignore
    switch (interaction.options.getSubcommand()) {
        case 'user':
            const deleteWarn = interaction.options.get("delete", false) as any;
            const reason = interaction.options.get("reason", false) as any;

            const memberOption: any = interaction.options.get("user", true).value as string;
            const memberReplace = memberOption!.replace("<@", "").replace(">", "");
            const memberToWarn = await interaction.guild!.members.cache.get(memberReplace);

            if (!memberToWarn) return interaction.replyErrorMessage(client, language("MEMBER_ERROR"), true);

            if (memberStaff.roles.highest.comparePositionTo(memberToWarn.roles.highest) <= 0)
                return interaction.replyErrorMessage(client, language("ERROR_HIGHEST"), true);

            const embed = new EmbedBuilder()
                .setColor(deleteWarn ? EMBED_SUCCESS : EMBED_CLOSE)
                .setAuthor({
                    name: `${memberStaff.displayName}#${memberStaff.user.discriminator}`,
                    iconURL: memberStaff.user.displayAvatarURL()
                })
                .setTitle(`${deleteWarn ? language("UNWARN") : language("WARN")}`)
                .addFields(
                    {
                        name: language("MEMBER"),
                        value: `${memberToWarn.displayName}#${memberToWarn.user.discriminator} (${memberToWarn.id})`,
                        inline: true
                    },
                    {
                        name: language("DATE"),
                        value: dateDay(),
                        inline: true
                    })
                .setTimestamp()
                .setFooter({ text: FOOTER_MODERATION, iconURL: interaction.guild!.iconURL()! });

            const buttons = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(deleteWarn ? `unwarn` : `warn`)
                        .setEmoji(deleteWarn ? "✅" : "⚡")
                        .setLabel(deleteWarn ? language("UNWARN") : language("WARN"))
                        .setStyle(deleteWarn ? ButtonStyle.Success : ButtonStyle.Danger))
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`cancelWarn`)
                        .setLabel("Cancel")
                        .setStyle(ButtonStyle.Primary)
                );

            const embedMod = new EmbedBuilder()
                .setColor(deleteWarn ? ButtonStyle.Success : ButtonStyle.Danger)
                .setAuthor({
                    name: `${memberStaff.displayName}#${memberStaff.user.discriminator}`,
                    iconURL: memberStaff.displayAvatarURL()
                })
                .setTimestamp()
                .setFooter({ text: language("CASE").replace('%number%', serverConfig.sanctionsCase + 1) })

            if (!reason && !deleteWarn) {
                const warns: any = await findWarn(interaction.guild!.id, memberToWarn.user.id);

                const embedInfo = new EmbedBuilder()
                    .setColor(EMBED_INFO)
                    .setAuthor({
                        name: `${memberStaff.displayName}#${memberStaff.user.discriminator}`,
                        iconURL: memberStaff.user.displayAvatarURL()
                    })
                    .setDescription(language("WARN_USER_HAS").replace('%user%', `${memberToWarn.displayName}#${memberToWarn.user.discriminator}`)
                        .replace('%number%', warns.length))

                for (let i = 0; i < (warns.length > 25 ? 25 : warns.length); i++) {
                    const userWarn = warns[i];
                    const byMember = interaction.guild?.members.cache.get(userWarn.memberStaff)!;
                    const by = byMember ? `${byMember.displayName}#${byMember.user.discriminator}` : language("OLD_STAFF");
                    embedInfo.addFields(
                        {
                            name: language("NAME_VALUE_USER").replace('%number%', userWarn.id)
                                .replace('%staff%', by).replace('%date%', userWarn.date),
                            value: userWarn.reason,
                            inline: true
                        })
                }
                embedInfo.setTimestamp()
                    .setFooter({ text: FOOTER_MODERATION, iconURL: interaction.guild!.iconURL()! });

                return interaction.reply({ embeds: [embedInfo] });
            } else if (reason && !deleteWarn) {
                embed.setDescription(language("DESCRIPTION_EMBED").replace('%staff%', interaction.user)
                    .replace('%action%', deleteWarn ? language("UNWARN").toLowerCase() : language("WARN").toLowerCase())
                    .replace('%user%', `${memberToWarn.displayName}#${memberToWarn.user.discriminator}`).replace('%reason%', reason.value))

                embedMod.setDescription(language("DESCRIPTION_MODLOG_WARN").replace('%user%', `${memberToWarn.displayName}#${memberToWarn.user.discriminator}`)
                    .replace('%userId%', memberToWarn.id).replace('%reason%', reason.value))

                const replyMessage = await interaction.reply({ embeds: [embed], components: [buttons], fetchReply: true });
                const collector = replyMessage.createMessageComponentCollector({ filter: () => true, idle: IDLE_BUTTON });

                collector.on('collect', async (inter: ButtonInteraction) => {
                    if (!memberStaff.permissions.has(["ManageMessages"]))
                        return inter.replyErrorMessage(client, language("ERROR_PERMISSION"), true);

                    if (inter.customId === "cancelWarn") {
                        const buttonEnd = new ActionRowBuilder<ButtonBuilder>()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId(`buttonCancel`)
                                    .setDisabled(true)
                                    .setLabel(language("COMMAND_CANCEL"))
                                    .setStyle(ButtonStyle.Secondary))

                        return inter.update({ components: [buttonEnd] });
                    }

                    serverConfig.sanctionsCase++
                    await serverConfig.save();

                    embed.setDescription(language("NEW_DESCRIPTION_EMBED").replace('%action%', language("WARN").toLowerCase())
                        .replace('%staff%', `${memberToWarn.displayName}#${memberToWarn.user.discriminator}`).replace('%reason%', reason.value))

                    const channelPublic = <TextChannel>interaction.guild!.channels.cache.find(channelPublic => channelPublic.id === serverConfig.channels.logs.modLog);
                    let reference: string = "";

                    if (channelPublic && serverConfig.modules.sanctions)
                        await channelPublic.send({ embeds: [embedMod] }).then(async (message: Message) => { reference = message.id });

                    await createWarn(interaction.guild!.id, memberToWarn.user.id, serverConfig.sanctionsCase, interaction.user.id, reason.value, reference);

                    try {
                        const embedUser = new EmbedBuilder()
                            .setColor(EMBED_INFO)
                            .setTitle(language("TITLE_EMBEDUSER").replace('%client%', client.user!.username).replace('%action%', language("WARN")))
                            .setDescription(language("DESCRIPTION_EMBEDUSER").replace('%action%', language("WARN").toLowerCase())
                                .replace('%server%', interaction.guild!.name).replace('%reason%', reason.value))
                            .addFields(
                                { name: language("SERVER"), value: `${interaction.guild?.name}`, inline: true },
                                { name: language("DATE"), value: `\`${dateDay()}\``, inline: true },
                                { name: language("ADDFIELD_NUMBER_WARN"), value: `\`${serverConfig.sanctionsCase}\``, inline: true })
                            .setFooter({ text: language("FOOTER_EMBEDUSER") })

                        const buttonInfo = new ActionRowBuilder<ButtonBuilder>()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId(`buttonInfo`)
                                    .setDisabled(true)
                                    .setLabel(language("LABEL_BUTTON_USER").replace('%action%', language("WARN").toLowerCase())
                                        .replace('%user%', `${memberToWarn.displayName}#${memberToWarn.user.discriminator}`))
                                    .setStyle(ButtonStyle.Secondary))

                        await memberToWarn.send({ embeds: [embedUser] });
                        await inter.update({ embeds: [embed], components: [buttonInfo] });
                    }
                    catch (err: any) {
                        if (err.message.match("Cannot send messages to this user")) {
                            const buttonInfo = new ActionRowBuilder<ButtonBuilder>()
                                .addComponents(
                                    new ButtonBuilder()
                                        .setCustomId(`buttonInfo`)
                                        .setDisabled(true)
                                        .setLabel(language("LABEL_BUTTON_SERVER").replace('%user%', `${memberToWarn.displayName}#${memberToWarn.user.discriminator}`)
                                            .replace('%action%', language("WARN").toLowerCase()))
                                        .setStyle(ButtonStyle.Secondary));

                            await Logger.warn(`${memberToWarn.user.tag} blocks his private messages, so he did not receive the reason for his kick.`);
                            return inter.update({ embeds: [embed], components: [buttonInfo] })
                        };

                        return Logger.error(err);
                    }

                });

                collector.on('end', _ => {
                    const buttonEnd = new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`buttonEnd`)
                                .setDisabled(true)
                                .setLabel(language("COLLECTOR_END"))
                                .setStyle(ButtonStyle.Secondary))

                    replyMessage.edit({ components: [buttonEnd] });
                });
            } else {
                if (!reason) return interaction.replyErrorMessage(client, language("REASON_REQUIRED"), true);
                const foundWarn: any = await findOneWarn(interaction.guild!.id, memberToWarn.user.id, deleteWarn.value);
                if (!foundWarn) return interaction.replyErrorMessage(client, language("NOT_WARNING"), true);

                embed.setDescription(language("DESCRIPTION_EMBED").replace('%staff%', interaction.user)
                    .replace('%action%', deleteWarn ? language("UNWARN").toLowerCase() : language("WARN").toLowerCase())
                    .replace('%user%', `${memberToWarn.displayName}#${memberToWarn.user.discriminator}`).replace('%reason%', reason.value))

                embedMod.setDescription(language("DESCRIPTION_MODLOG_UNWARN").replace('%user%', `${memberToWarn.displayName}#${memberToWarn.user.discriminator}`)
                    .replace('%userId%', memberToWarn.id).replace('%reason%', reason.value).replace('%reference%', `[#${foundWarn.id}](https://discord.com/channels/${interaction.guild!.id}/${serverConfig.channels.logs.modLog}/${foundWarn.reference})`))

                const replyMessage = await interaction.reply({ embeds: [embed], components: [buttons], fetchReply: true });
                const collector = replyMessage.createMessageComponentCollector({ filter: () => true, idle: IDLE_BUTTON });

                const byMember = interaction.guild?.members.cache.get(foundWarn.memberStaff)!;
                embed.spliceFields(1, 0,
                    {
                        name: language("ADDFIELD_STAFF"),
                        value: `${byMember ? `${byMember}\n(${byMember.id})` : language("OLD_STAFF")}`,
                        inline: true
                    });

                collector.on('collect', async (inter: ButtonInteraction) => {
                    if (!memberStaff.permissions.has(["ManageMessages"]))
                        return inter.replyErrorMessage(client, language("ERROR_PERMISSION"), true);

                    if (inter.customId === "cancelWarn") {
                        const buttonEnd = new ActionRowBuilder<ButtonBuilder>()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId(`buttonCancel`)
                                    .setDisabled(true)
                                    .setLabel(language("COMMAND_CANCEL"))
                                    .setStyle(ButtonStyle.Secondary))

                        return inter.update({ components: [buttonEnd] });
                    }

                    serverConfig.sanctionsCase++
                    await serverConfig.save();

                    const channelPublic = <TextChannel>interaction.guild!.channels.cache.find(channelPublic => channelPublic.id === serverConfig.channels.logs.modLog);

                    if (channelPublic && serverConfig.modules.sanctions) await channelPublic.send({ embeds: [embedMod] });

                    await foundWarn.delete();

                    try {
                        const embedUser = new EmbedBuilder()
                            .setColor(EMBED_INFO)
                            .setTitle(language("TITLE_EMBEDUSER").replace('%client%', client.user!.username).replace('%action%', language("UNWARN")))
                            .setDescription(language("DESCRIPTION_EMBEDUSER").replace('%action%', language("UNWARN").toLowerCase())
                                .replace('%server%', interaction.guild!.name).replace('%reason%', reason.value))
                            .addFields(
                                { name: language("SERVER"), value: `${interaction.guild?.name}`, inline: true },
                                { name: language("DATE"), value: `\`${foundWarn.date}\``, inline: true },
                                { name: language("ADDFIELD_NUMBER_WARN"), value: `\`${foundWarn.id}\``, inline: true })
                            .setFooter({ text: FOOTER_MODERATION })

                        const buttonInfo = new ActionRowBuilder<ButtonBuilder>()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId(`buttonInfo`)
                                    .setDisabled(true)
                                    .setLabel(language("LABEL_BUTTON_USER").replace('%action%', language("WARN").toLowerCase())
                                        .replace('%user%', `${memberToWarn.displayName}#${memberToWarn.user.discriminator}`))
                                    .setStyle(ButtonStyle.Secondary))

                        await memberToWarn.send({ embeds: [embedUser] });
                        await inter.update({ embeds: [embed], components: [buttonInfo] });
                    }
                    catch (err: any) {
                        if (err.message.match("Cannot send messages to this user")) {
                            const buttonInfo = new ActionRowBuilder<ButtonBuilder>()
                                .addComponents(
                                    new ButtonBuilder()
                                        .setCustomId(`buttonInfo`)
                                        .setDisabled(true)
                                        .setLabel(language("LABEL_BUTTON_SERVER").replace('%user%', `${memberToWarn.displayName}#${memberToWarn.user.discriminator}`)
                                            .replace('%action%', language("UNWARN").toLowerCase()))
                                        .setStyle(ButtonStyle.Secondary));

                            await Logger.warn(`${memberToWarn.user.tag} blocks his private messages, so he did not receive the reason for his kick.`);
                            return inter.update({ embeds: [embed], components: [buttonInfo] })
                        };

                        return Logger.error(err);
                    }



                });

                collector.on('end', _ => {
                    const buttonEnd = new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`buttonEnd`)
                                .setDisabled(true)
                                .setLabel(language("COLLECTOR_END"))
                                .setStyle(ButtonStyle.Secondary))

                    replyMessage.edit({ components: [buttonEnd] });
                });
            }


            break;
        case 'server': 
        const warnsServer: any = await findGuilWarn(interaction.guild!.id);

        const embedServer = new EmbedBuilder()
                .setColor(EMBED_INFO)
                .setAuthor({
                    name: `${interaction.guild!.name}`,
                    iconURL: `${interaction.guild!.iconURL() ? interaction.guild!.iconURL() : ""}` })
                .setDescription(language("WARN_SERVER_HAS").replace('%server%', interaction.guild!.name).replace('%number%', warnsServer.length))
                .setTimestamp()
                .setFooter({text: FOOTER_MODERATION, iconURL: interaction.guild!.iconURL()!});

                for (let i = 0; i < (warnsServer.length > 25 ? 25 : warnsServer.length); i++) {
                    let userWarn = warnsServer[i];
                    let userWarning = interaction.guild?.members.cache.get(userWarn.memberWarn)!;
                    let user = userWarning ? `${userWarning.displayName}#${userWarning.user.discriminator}` : language("OLD_MEMBER");
                    let byMember = interaction.guild?.members.cache.get(userWarn.memberStaff)!;
                    let by = byMember ? `${byMember.displayName}#${byMember.user.discriminator}` : language("OLD_STAFF");
                    embedServer.addFields(
                        {
                            name: language("NAME_VALUE_SERVER").replace('%user%', user).replace('%staff%', by).replace('%date%', userWarn.date),
                            value: userWarn.reason,
                            inline: true
                        })
                }

                return interaction.reply({embeds: [embedServer]});

        break;
        default:
            //@ts-ignore
            return interaction.replyErrorMessage(client, language("DEFAULT").replace('%subcommand%', interaction.options.getSubcommand()), true);
    };


}

export const slash = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        description: "Add or remove a warn to a user.",
        description_localizations: {
            fr: "Ajouter ou retirer un warn à un utilisateur."
        },
        category: "Modération",
        permissions: ["ManageMessages"],
        cooldown: 1,
        options: [
            {
                name: "user",
                name_localizations: {
                    fr: "utilisateur"
                },
                type: ApplicationCommandOptionType.Subcommand,
                description: "Permet d'afficher les warns d'un utilisateur.",
                options: [
                    {
                        name: "user",
                        name_localizations: {
                            fr: "utilisateur"
                        },
                        type: ApplicationCommandOptionType.String,
                        description: "Mention or ID of the user.",
                        description_localizations: {
                            fr: "Mention ou ID de l'utilisateur.",
                        },
                        required: true
                    },
                    {
                        name: "reason",
                        name_localizations: {
                            fr: "raison"
                        },
                        type: ApplicationCommandOptionType.String,
                        description: "Reason for the warning.",
                        description_localizations: {
                            fr: "Raison du warn.",
                        },
                    },
                    {
                        name: "delete",
                        name_localizations: {
                            fr: "supprimer"
                        },
                        type: ApplicationCommandOptionType.Number,
                        description: "Enter the number of the warn to be deleted.",
                        description_localizations: {
                            fr: "Indiquer le numéro du warn à supprimé."
                        }
                    },
                ]
            },
            {
                name: "server",
                name_localizations: {
                    fr: "serveur"
                },
                type: ApplicationCommandOptionType.Subcommand,
                description: "Allows to display the warns of the server.",
                description_localizations: {
                    fr: "Permet d'afficher les warns du serveur."
                }
            }
        ],
    }
}