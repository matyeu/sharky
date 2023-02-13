import {SharkClient} from "../../Librairie";
import {
    ActionRowBuilder,
    ApplicationCommandOptionType,
    ButtonBuilder,
    ButtonStyle,
    CommandInteraction,
    EmbedBuilder
} from "discord.js";
import {EMOJIS, EMBED_GENERAL, FOOTER} from "../../config";
import {find} from "../../Models/guild";

export default async function (client: SharkClient, interaction: CommandInteraction, language: any) {

    const serverConfig: any = await find(interaction.guild!.id);
    const capchtaConfig = serverConfig.captcha;

    const embed = new EmbedBuilder()
        .setColor(EMBED_GENERAL)
        .setTitle(language("TITLE").replace('%client%', client.user!.username))
        .addFields(
            {
                name: language("ADDFIELD_STATE"),
                value: capchtaConfig.state ? `${client.getEmoji(EMOJIS.succes)}` : `${client.getEmoji(EMOJIS.error)}`,
                inline: true
            },
            {
                name: language("ADDFIELD_STATE_GENERAL"),
                value: capchtaConfig.general ? `${client.getEmoji(EMOJIS.succes)}` : `${client.getEmoji(EMOJIS.error)}`,
                inline: true
            },
            {
                name: language("ADDFIELD_CHANNEL"),
                value: capchtaConfig.channel ? `<#${capchtaConfig.channel}>` : "`None`",
                inline: true
            },
            {
                name: language("ADDFIELD_CHANNEL_GENERAL"),
                value: capchtaConfig.channelGeneral ? `<#${capchtaConfig.channelGeneral}>` : "`None`",
                inline: true
            },
            {
                name: language("ADDFIELD_ROLE"),
                value: capchtaConfig.role ? `<@&${capchtaConfig.role}>` : "`None`",
                inline: true
            },
            {
                name: language("ADDFIELD_MESSAGE"),
                value: capchtaConfig.message ? `${'```'}${capchtaConfig.message}${'```'}` : "```None```"
            }
        )
        .setTimestamp()
        .setFooter({text: FOOTER, iconURL: client.user!.displayAvatarURL()})

    const buttons = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(capchtaConfig.state ? 'stateOff-button' : 'stateOn-button')
                .setLabel(capchtaConfig.state ? language("STATE_OFF") : language("STATE_ON"))
                .setStyle(capchtaConfig.state ? ButtonStyle.Danger : ButtonStyle.Primary)
        )
        .addComponents(
            new ButtonBuilder()
                .setCustomId(capchtaConfig.general ? 'stateGeneralOff-button' : 'stateGeneralOn-button')
                .setLabel(capchtaConfig.general ? language("STATE_OFF") : language("STATE_ON"))
                .setStyle(capchtaConfig.general ? ButtonStyle.Danger : ButtonStyle.Primary)
        )
        .addComponents(
            new ButtonBuilder()
                .setCustomId("channel-button")
                .setLabel("Channel")
                .setStyle(ButtonStyle.Secondary)
        )
        .addComponents(
            new ButtonBuilder()
                .setCustomId("role-button")
                .setLabel("Role")
                .setStyle(ButtonStyle.Secondary)
        )
        .addComponents(
            new ButtonBuilder()
                .setCustomId("message-button")
                .setLabel("Message")
                .setStyle(ButtonStyle.Secondary)
        )


    return interaction.reply({embeds: [embed], components: [buttons], fetchReply: true});
}

export const slash = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        description: "Command captcha",
        description_localizations: {
            fr: "Permet de configurer le captcha du serveur",
        },
        category: "Administration",
        permissions: ["Administrator"],
    }
}