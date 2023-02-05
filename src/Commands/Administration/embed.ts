import {SharkClient} from "../../Librairie";
import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    CommandInteraction,
    EmbedBuilder,
    SelectMenuBuilder
} from "discord.js";
import {EMOJIS, EMBED_GENERAL} from "../../config";
import {create, find} from "../../Models/embed";

export default async function (client: SharkClient, interaction: CommandInteraction, language: any) {

    const embed = new EmbedBuilder()
        .setColor(EMBED_GENERAL)
        .setDescription("\u200b")

    const editEmbed = new ActionRowBuilder<SelectMenuBuilder>()
        .addComponents(
            new SelectMenuBuilder()
                .setCustomId(`edit-select`)
                .setPlaceholder(language("PLACEHOLDER_EDIT"))
                .addOptions([
                    {
                        label: language("LABEL_COLOR"),
                        emoji: EMOJIS.color,
                        value: "color",
                    },
                    {
                        label: language("LABEL_AUTHOR"),
                        emoji: EMOJIS.avatar,
                        value: "author",
                    },
                    {
                        label: language("LABEL_PICTURE_AUTHOR"),
                        emoji: EMOJIS.picture,
                        value: "picture_author",
                    },
                    {
                        label: language("LABEL_TITLE"),
                        emoji: "✏️",
                        value: "title",
                    },
                    {
                        label: language("LABEL_URL"),
                        emoji: "🧷",
                        value: "url",
                    },
                    {
                        label: "Description",
                        emoji: "📝",
                        value: "description",
                    },
                    {
                        label: "Thumbail",
                        emoji: EMOJIS.picture,
                        value: "thumbail",
                    },
                    {
                        label: language("LABEL_ADD_FIELD"),
                        emoji: "➕",
                        value: "add_field",
                    },
                    {
                        label: language("LABEL_REMOVE_FIELD"),
                        emoji: "➖",
                        value: "remove_field",
                    },
                    {
                        label: language("LABEL_PICTURE"),
                        emoji: "🖼️",
                        value: "picture",
                    },
                    {
                        label: "Footer",
                        emoji: "🔶",
                        value: "footer",
                    },
                    {
                        label: language("LABEL_FOOTER_PICTURE"),
                        emoji: "🖼️",
                        value: "picture_footer",
                    },
                    {
                        label: "Timestamp",
                        emoji: EMOJIS.calendar,
                        value: "timestamp",
                    }
                ])
        );

    const buttons = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`embedSend-button`)
                .setLabel(language("EMBED_SEND"))
                .setStyle(ButtonStyle.Primary)
        )
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`embedCancel-button`)
                .setLabel(language("EMBED_CANCEL"))
                .setStyle(ButtonStyle.Danger)
        )

    const replyMessage = await interaction.reply({embeds: [embed], components: [editEmbed, buttons], fetchReply: true});

    const firstEmbed = [];
    await firstEmbed.push(
            {
                color: "",
                author: {name: "", iconURL: ""},
                pictureAuthor: "",
                title: "",
                url: "",
                description: "",
                addField: [],
                thumbail: "",
                picture: "",
                footer: {text: "", iconURL: ""},
                timestamp: false,
            })

    await create(interaction.guild!.id, interaction.user.id, firstEmbed);
    const collector = replyMessage.createMessageComponentCollector({ filter: ()=> true, idle: 300000 });

    collector.on('end', async () => {
        const embedConfig: any = await find(interaction.guild!.id, interaction.user.id);

        const buttonEnd = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                    new ButtonBuilder()
                    .setCustomId(`buttonEnd`)
                    .setDisabled(true)
                    .setLabel(language("COLLECTOR_END"))
                    .setStyle(ButtonStyle.Secondary))

        await replyMessage.edit({embeds: [embed], components: [buttonEnd]});
        if (embedConfig) embedConfig.delete();
    });


}

export const slash = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        description: "Allows you to create and send embeds",
        description_localizations: {
            fr: "Permet de créer et envoyer des embeds",
        },
        category: "Administration",
        permissions: ["Administrator"],
    }
}