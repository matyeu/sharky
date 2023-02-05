import {SharkClient} from "../../../Librairie";
import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ButtonInteraction,
    ComponentType,
    EmbedBuilder
} from "discord.js";
import {find} from "../../../Models/embed";

export default async function (client: SharkClient, interaction: ButtonInteraction, language: any) {

    const embedConfig: any = await find(interaction.guild!.id, interaction.user.id);

    if (!embedConfig) return interaction.replyErrorMessage(client, language("EMBED_DB_NOTFOUND"), true);
    if (embedConfig.userID !== interaction.user.id) return interaction.replyErrorMessage(client, language("ERROR_PERMISSION"), true);

    const embedCancel = new EmbedBuilder()

    for (const embed of embedConfig.embeds) {
        embedCancel.setColor(embed.color ? embed.color : null)
            .setThumbnail(embed.thumbail ? embed.thumbail : null)
            .setAuthor({name: embed.author.name ? embed.author.name : null, iconURL: embed.author.iconURL ? embed.author.iconURL : null})
            .setTitle(embed.title ? embed.title : null)
            .setURL(embed.url ? embed.url : null)
            .setDescription(embed.description ? embed.description : "\u200b")
            .setImage(embed.picture ? embed.picture : null)
            .setFooter({text: embed.footer.text ? embed.footer.text : null, iconURL: embed.footer.iconURL ? embed.footer.iconURL : null})
        if (embed.timestamp) embedCancel.setTimestamp()

        for (const field of embed.addField) {
            if (field.length <= 0) return;

            embedCancel.addFields({name: field.name,value: field.value, inline: field.inline})
        }
    }

    const buttonCancel = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                    new ButtonBuilder()
                    .setCustomId(`buttonEnd`)
                    .setDisabled(true)
                    .setLabel(language("EMBED_CANCEL"))
                    .setStyle(ButtonStyle.Secondary))

    await interaction.update({embeds: [embedCancel], components: [buttonCancel]});
    return embedConfig.delete();



}

export const button = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        filepath: "Interactions/Buttons/Embed/buttonEmbedCancelData",
    }
}