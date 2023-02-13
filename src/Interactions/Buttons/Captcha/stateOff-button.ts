import {SharkClient} from "../../../Librairie";
import {
    ActionRowBuilder,
    ApplicationCommandOptionType,
    ButtonBuilder,
    ButtonStyle,
    ButtonInteraction,
    EmbedBuilder
} from "discord.js";
import {find, edit} from "../../../Models/guild";
import {EMOJIS, EMBED_GENERAL, FOOTER} from "../../../config";

export default async function (client: SharkClient, interaction: ButtonInteraction, language: any) {

    const member = await interaction.guild!.members.fetch(interaction.user.id);
    const serverConfig: any = await find(interaction.guild!.id);
    const capchtaConfig = serverConfig.captcha;

    if (!member.permissions.has(["Administrator"]))
        return interaction.replyErrorMessage(client, language("ERROR_PERMISSION"), true);

    capchtaConfig.state = !capchtaConfig.state;
    await edit(interaction.guild!.id, serverConfig);

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

    return interaction.update({embeds: [embed], components: [buttons]})

}

export const button = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        filepath: "Interactions/Buttons/Captcha/buttonStateOffData",
    }
}