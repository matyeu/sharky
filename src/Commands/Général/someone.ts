import { ActionRowBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonInteraction, ButtonStyle, CommandInteraction, EmbedBuilder } from "discord.js";
import { EMBED_GENERAL, FOOTER, IDLE_BUTTON } from "../../config";
import { SharkClient } from "../../Librairie";

export default async function (client: SharkClient, interaction: CommandInteraction, language: any) {

    const members = await interaction.guild!.members.fetch();
    let randMember = members.random()!;

    const userFlags = (await randMember.user.fetchFlags()).toArray();
    const perkFlags = {
        Staff: language("STAFF"),
        Partner: language("PARTNER"),
        BugHunterLevel1: language("BUGHUNTERLEVEL_1"),
        BugHunterLevel2: language("BUGHUNTERLEVEL_2"),
        Hypesquad: language("HYPESQUAD"),
        HypeSquadOnlineHouse1: language("HYPESQUADONLINEHOUSE_1"),
        HypeSquadOnlineHouse2: language("HYPESQUADONLINEHOUSE_2"),
        HypeSquadOnlineHouse3: language("HYPESQUADONLINEHOUSE_3"),
        PremiumEarlySupporter: language("PREMIUMEARLYSUPPORTER"),
        TeamPseudoUser: language("TEAMPSEUDOUSER"),
        VerifiedBot: language("VERIFIEDBOT"),
        VerifiedDeveloper: language("VERIFIEDDEVELOPER"),
    };

    const embed = new EmbedBuilder()
        .setColor(EMBED_GENERAL)
        .setThumbnail(randMember.displayAvatarURL())
        .addFields(
            {
                name: language("USER"),
                value: randMember.user.username,
                inline: true
            },
            {
                name: language("DISCRIMINATOR"),
                value: randMember.user.discriminator,
                inline: true
            },
            {
                name: language("ID"),
                value: randMember.id,
                inline: true
            },
            {
                name: language("CREATED"),
                value: `<t:${parseInt(String(randMember.user.createdTimestamp! / 1000))}:f>`,
                inline: true
            },
            {
                name: language("JOIN"),
                value: `<t:${parseInt(String(randMember.joinedTimestamp! / 1000))}:f>`,
                inline: true
            },
            {
                name: language("BADGES"),
                value: userFlags.length > 0 ? `\`${userFlags.map(flag => perkFlags[<keyof object>flag]).join(', ')}\`` : '`None`',
                inline: true
            }
        )
        .setTimestamp()
        .setFooter({ text: FOOTER, iconURL: client.user?.displayAvatarURL() })

    const button = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`search:${interaction.user.id}`)
                .setLabel(language("BUTTON_LABEL"))
                .setStyle(ButtonStyle.Secondary))

    const replyMessage = await interaction.reply({ embeds: [embed], components: [button], fetchReply: true });
    const collector = replyMessage.createMessageComponentCollector({ filter: () => true, idle: IDLE_BUTTON });

    collector.on("collect", async (inter: ButtonInteraction) => {
        if (inter.customId.split(':')[1] !== inter.user.id)
            return inter.replyErrorMessage(client, language("ERROR_PERMISSION"), true);

        randMember = members.random()!;

        const newEmbed = new EmbedBuilder()
            .setColor(EMBED_GENERAL)
            .setThumbnail(randMember.displayAvatarURL())
            .addFields(
                {
                    name: language("USER"),
                    value: randMember.user.username,
                    inline: true
                },
                {
                    name: language("DISCRIMINATOR"),
                    value: randMember.user.discriminator,
                    inline: true
                },
                {
                    name: language("ID"),
                    value: randMember.id,
                    inline: true
                },
                {
                    name: language("CREATED"),
                    value: `<t:${parseInt(String(randMember.user.createdTimestamp! / 1000))}:f>`,
                    inline: true
                },
                {
                    name: language("JOIN"),
                    value: `<t:${parseInt(String(randMember.joinedTimestamp! / 1000))}:f>`,
                    inline: true
                },
                {
                    name: language("BADGES"),
                    value: userFlags.length > 0 ? `\`${userFlags.map(flag => perkFlags[<keyof object>flag]).join(', ')}\`` : '`None`',
                    inline: true
                }
            )
            .setTimestamp()
            .setFooter({ text: FOOTER, iconURL: client.user?.displayAvatarURL() })

        const button = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`search:${interaction.user.id}`)
                    .setLabel(language("BUTTON_LABEL"))
                    .setStyle(ButtonStyle.Secondary))

        await inter.update({ embeds: [newEmbed], components: [button], fetchReply: true });
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
        description: "Displays a member's information randomly.",
        description_localizations: {
            fr: "Affiche les informations d'un membre aléatoirement."
        },
        category: "Général",
        permissions: ["SendMessages"],
    }
}