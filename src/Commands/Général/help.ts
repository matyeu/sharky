import {SharkClient} from "../../Librairie";
import {ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, EmbedBuilder, SelectMenuBuilder} from "discord.js";
import {EMOJIS, EMBED_GENERAL, FOOTER, LINK_APP, LINK_SUPPORT} from "../../config";

export default async function (client: SharkClient, interaction: CommandInteraction, language: any) {

    const embed = new EmbedBuilder()
        .setColor(EMBED_GENERAL)
        .setTitle(language("TITLE"))
        .setDescription(language("DESCRIPTION").replace('%client%', interaction.client.user?.username))
        .setTimestamp()
        .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL()})

    const buttons = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                    new ButtonBuilder()
                    .setLabel(language("INVITE_ME"))
                    .setURL(`${LINK_APP}`)
                    .setStyle(ButtonStyle.Link)
                    )
            .addComponents(
                    new ButtonBuilder()
                    .setLabel("Support")
                    .setURL(`${LINK_SUPPORT}`)
                    .setStyle(ButtonStyle.Link)
                    )
            .addComponents(
                    new ButtonBuilder()
                    .setLabel(language("VOTE_ME"))
                    .setDisabled(true)
                    .setURL(`${LINK_APP}`)
                    .setStyle(ButtonStyle.Link)
                    )

    const row = new ActionRowBuilder<SelectMenuBuilder>()
        .addComponents(
            new SelectMenuBuilder()
                .setCustomId("help-select")
                .setPlaceholder(language("PLACEHOLDER"))
                .addOptions([
                    {
                        label: language("LABEL_STAFF"),
                        description: language("DESCRIPTION_STAFF"),
                        emoji: EMOJIS.devBot,
                        value: "staff",
                    },
                    {
                        label: language("LABEL_GENERAL"),
                        description: language("DESCRIPTION_GENERAL"),
                        emoji: "🎈",
                        value: "general",
                    }
                ])
        );

    return interaction.reply({embeds: [embed], components: [row, buttons]})


}

export const slash = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        description: "Command help",
        category: "Général",
        permissions: ["SendMessages"],
    }
}