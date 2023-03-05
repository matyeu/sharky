import { ActionRowBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonInteraction, ButtonStyle, CommandInteraction, EmbedBuilder, Message, TextChannel } from "discord.js";
import { EMBED_CLOSE, EMBED_INFO, EMBED_SUCCESS, FOOTER_MODERATION, IDLE_BUTTON } from "../../config";
import { dateDay, SharkClient } from "../../Librairie";
import { find as findGuild } from "../../Models/guild";
import { create as createMute, find as findMute } from "../../Models/mute";

const Logger = require("../../Librairie/logger");
const ms = require("ms");

export default async function (client: SharkClient, interaction: CommandInteraction, language: any) {

    const serverConfig: any = await findGuild(interaction.guild!.id);

    const userOption = interaction.options.get("user", true).value as string;
    const userReplace = userOption!.replace("<@", "").replace(">", "");

    const memberToMute = await interaction.guild?.members.cache.get(userReplace.replace(/ /g, ""))!;
    let memberStaff = interaction.guild?.members.cache.get(interaction.user.id)!;

    const reason = interaction.options.get("reason", true).value as string;
    const timeOption = interaction.options.get("time", false)!;
    let time = timeOption ? ms(timeOption.value) : ms("30m");

    if (!memberToMute) return interaction.replyErrorMessage(client, language("MEMBER_NOTFOUND"), true);

    if (memberToMute && memberStaff.roles.highest.comparePositionTo(memberToMute.roles.highest) <= 0)
        return interaction.replyErrorMessage(client, language("ERROR_HIGHEST"), true);

    const memberIsTimeout = memberToMute.communicationDisabledUntil;

    const embed = new EmbedBuilder()
        .setColor(memberIsTimeout ? EMBED_SUCCESS : EMBED_CLOSE)
        .setAuthor({
            name: `${memberStaff.displayName}#${memberStaff.user.discriminator}`,
            iconURL: memberStaff.user.displayAvatarURL()
        })
        .setTitle(memberIsTimeout ? language("UNMUTE") : language("MUTE"))
        .setDescription(language("DESCRIPTION_EMBED").replace('%staff%', interaction.user).replace('%reason%', reason)
            .replace('%user%', `${memberToMute.displayName}#${memberToMute.user.discriminator}`)
            .replace('%action%', memberIsTimeout ? language("UNMUTE").toLowerCase() : language("MUTE").toLowerCase()))
        .addFields(
            {
                name: language("ADDFIELD_MEMBER"),
                value: `${memberToMute} (${memberToMute.id})`,
                inline: true
            },
            {
                name: language("ADDFIELD_DATE"),
                value: dateDay(),
                inline: true
            })
        .setTimestamp()
        .setFooter({ text: FOOTER_MODERATION, iconURL: interaction.client.user!.displayAvatarURL()! });

    const buttons = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(memberIsTimeout ? language("UNMUTE").toLowerCase() : language("MUTE").toLowerCase())
                .setEmoji(memberIsTimeout ? "🔈" : "🔇")
                .setLabel(memberIsTimeout ? language("UNMUTE") : language("MUTE"))
                .setStyle(memberIsTimeout ? ButtonStyle.Success : ButtonStyle.Danger))

        .addComponents(
            new ButtonBuilder()
                .setCustomId(`cancelMute`)
                .setLabel("Cancel")
                .setStyle(memberIsTimeout ? ButtonStyle.Danger : ButtonStyle.Primary));


    const replyMessage = await interaction.reply({ embeds: [embed], components: [buttons], fetchReply: true });
    const collector = replyMessage.createMessageComponentCollector({ filter: () => true, idle: IDLE_BUTTON });

    const channelPublic = <TextChannel>interaction.guild!.channels.cache.find(channelPublic => channelPublic.id === serverConfig.channels.logs.modLog);

    collector.on("collect", async (inter: ButtonInteraction) => {
        memberStaff = await inter.guild!.members.fetch(inter.user.id);

        if (!memberStaff.permissions.has(["MuteMembers"]))
            return inter.replyErrorMessage(client, language("ERROR_PERMISSION"), true);

        if (inter.customId === "cancelMute") {
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

        const embedMod = new EmbedBuilder()

        if (serverConfig.modules.sanctions) {
            embedMod.setColor(memberIsTimeout ? EMBED_SUCCESS : EMBED_CLOSE)
                .setAuthor({
                    name: `${memberStaff.displayName}#${memberStaff.user.discriminator}`,
                    iconURL: memberStaff.displayAvatarURL()
                })
                .setFooter({ text: language("CASE").replace('%number%', serverConfig.sanctionsCase) })
        }

        if (inter.customId === "mute") {
            let reference: string = "";

            const date = (Date.now() + time) / 1000;
            const timeStamp = date.toString().split('.')[0];

            embed.setDescription(language("NEW_DESCRIPTION_EMBED").replace('%staff%', inter.user)
                .replace('%action%', language("MUTE").toLowerCase()).replace('%reason%', reason));

            embedMod.setDescription(language("DESCRIPTION_MODLOG_MUTE").replace('%time%', timeStamp).replace('%reason%', reason)
                .replace('%user%', `${memberToMute.displayName}#${memberToMute.user.discriminator}`));

            if (channelPublic && serverConfig.modules.sanctions)
                await channelPublic.send({ embeds: [embedMod] }).then(async (message: Message) => { reference = message.id });
            await createMute(interaction.guild!.id, serverConfig.sanctionsCase, memberToMute.id, memberStaff.id, reason, Date.now(), reference);

            try {
                const embedUser = new EmbedBuilder()
                    .setColor(EMBED_INFO)
                    .setTitle(language("TITLE_EMBEDUSER").replace('%client%', client.user!.username).replace('%action%', language("MUTE")))
                    .setDescription(language("DESCRIPTION_EMBEDUSER").replace('%server%', interaction.guild!.name).replace('%reason%', reason))
                    .setTimestamp()
                    .setFooter({ text: FOOTER_MODERATION, iconURL: interaction.client.user?.displayAvatarURL() });

                const buttonInfo = new ActionRowBuilder<ButtonBuilder>()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`buttonInfo`)
                            .setDisabled(true)
                            .setLabel(language("LABEL_BUTTON_USER").replace('%action%', language("MUTE").toLowerCase())
                                .replace('%user%', `${memberToMute.displayName}#${memberToMute.user.discriminator}`))
                            .setStyle(ButtonStyle.Secondary))

                await memberToMute.send({ embeds: [embedUser] });
                await memberToMute.timeout(time, 'Mute').then(async () => {
                    const muteConfig: any = await findMute(inter.guild!.id, memberToMute.id);

                    setTimeout(async () => { await muteConfig.delete() }, time)

                }).catch((err) => Logger.error(err));
                return inter.update({ embeds: [embed], components: [buttonInfo] });
            }
            catch (err: any) {
                if (err.message.match("Cannot send messages to this user")) {
                    const buttonInfo = new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`buttonInfo`)
                                .setDisabled(true)
                                .setLabel(language("LABEL_BUTTON_SERVER").replace('%user%', `${memberToMute.displayName}#${memberToMute.user.discriminator}`)
                                    .replace('%action%', language("MUTE").toLowerCase()))
                                .setStyle(ButtonStyle.Secondary))

                    await Logger.warn(`${memberToMute.user.tag} blocks his private messages, so he did not receive the reason for his warn.`);
                    await memberToMute.timeout(time, 'Mute').catch((err) => Logger.error(err));
                    return inter.update({ embeds: [embed], components: [buttonInfo] });
                }

                return Logger.error(err);
            }

        } else {
            const muteConfig: any = await findMute(inter.guild!.id, memberToMute.id);

            embed.setDescription(language("NEW_DESCRIPTION_EMBED").replace('%staff%', inter.user)
                .replace('%action%', language("UNMUTE").toLowerCase()).replace('%reason%', reason));

            embedMod.setDescription(language("DESCRIPTION_MODLOG_UNMUTE").replace('%reason%', reason).replace('%reference%', `[#${muteConfig.case}](https://discord.com/channels/${interaction.guild!.id}/${serverConfig.channels.logs.modLog}/${muteConfig.reference})`)
                .replace('%user%', `${memberToMute.displayName}#${memberToMute.user.discriminator}`));

            if (channelPublic && serverConfig.modules.sanctions) await channelPublic.send({ embeds: [embedMod] });

            await muteConfig.delete();

            try {
                const embedUser = new EmbedBuilder()
                    .setColor(EMBED_INFO)
                    .setTitle(language("TITLE_EMBEDUSER").replace('%client%', client.user!.username).replace('%action%', language("UNMUTE")))
                    .setDescription(language("DESCRIPTION_EMBEDUSER").replace('%server%', interaction.guild!.name).replace('%reason%', reason))
                    .setTimestamp()
                    .setFooter({ text: FOOTER_MODERATION, iconURL: interaction.client.user?.displayAvatarURL() });

                const buttonInfo = new ActionRowBuilder<ButtonBuilder>()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`buttonInfo`)
                            .setDisabled(true)
                            .setLabel(language("LABEL_BUTTON_USER").replace('%action%', language("UNMUTE").toLowerCase())
                                .replace('%user%', `${memberToMute.displayName}#${memberToMute.user.discriminator}`))
                            .setStyle(ButtonStyle.Secondary))

                await memberToMute.send({ embeds: [embedUser] });
                await memberToMute.timeout(null, 'Unmute').catch((err) => Logger.error(err));
                return inter.update({ embeds: [embed], components: [buttonInfo] });
            }
            catch (err: any) {
                if (err.message.match("Cannot send messages to this user")) {
                    const buttonInfo = new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`buttonInfo`)
                                .setDisabled(true)
                                .setLabel(language("LABEL_BUTTON_SERVER").replace('%user%', `${memberToMute.displayName}#${memberToMute.user.discriminator}`)
                                    .replace('%action%', language("UNMUTE").toLowerCase()))
                                .setStyle(ButtonStyle.Secondary))

                    await Logger.warn(`${memberToMute.user.tag} blocks his private messages, so he did not receive the reason for his warn.`);
                    await memberToMute.timeout(null, 'Unmute').catch((err) => Logger.error(err));
                    return inter.update({ embeds: [embed], components: [buttonInfo] });
                }
            }
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

export const slash = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        description: "Mute ou unmute un membre.",
        category: "Modération",
        permissions: ["MuteMembers"],
        cooldown: 1,
        options: [
            {
                name: "user",
                name_localizations: {
                    fr: "utilisateur",
                },
                description: "Mention or ID of the user.",
                description_localizations: {
                    fr: "Mention ou ID de l'utilisateur.",
                },
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: "reason",
                name_localizations: {
                    fr: "raison",
                },
                description: "Reason of mute.",
                description_localizations: {
                    fr: "Raison du mute.",
                },
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: "time",
                name_localizations: {
                    fr: "temps"
                },
                type: ApplicationCommandOptionType.String,
                description: "Mute time.",
                description_localizations: {
                    fr: "Temps du mute."
                }
            }

        ]
    }
}