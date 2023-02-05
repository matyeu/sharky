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
import {EMBED_ERROR, EMBED_INFO, EMOJIS, IDLE_BUTTON} from "../../../config";

export default async function (client: SharkClient, interaction: ButtonInteraction, language: any) {

    const embedConfig: any = await find(interaction.guild!.id, interaction.user.id);

    if (!embedConfig) return interaction.replyErrorMessage(client, language("EMBED_DB_NOTFOUND"), true);
    if (embedConfig.userID !== interaction.user.id) return interaction.replyErrorMessage(client, language("ERROR_PERMISSION"), true);

    await interaction.update({content: null});

    const replyMessage = await interaction.channel!.send({
        embeds: [new EmbedBuilder()
            .setColor(EMBED_INFO)
            .setDescription(language("MESSAGE_SEND").replace('%emoji%', client.getEmoji(EMOJIS.information)).replace('%user%', interaction.user))],
    })

    let mentionChannel: any;

    const collector = interaction.channel!.createMessageCollector({
        filter: (message) => message.member === interaction.member,
        time: IDLE_BUTTON
    });

    collector.on("collect", async (message) => {
        await message.delete();

        let channelId = message.content.replace('<', '').replace('#', '').replace('>', '');
         mentionChannel = await interaction.guild!.channels.cache.get(channelId)!;
        if (!mentionChannel || mentionChannel.type !== 0 && mentionChannel.type !== 5 && mentionChannel.type !== 10) {
            const replyMessageError = await interaction.channel!.send({
                embeds: [new EmbedBuilder()
                    .setColor(EMBED_ERROR)
                    .setDescription(language("ERROR_CHANNEL").replace('%emoji%', client.getEmoji(EMOJIS.error)).replace('%user%', interaction.user))],
            })
            setTimeout(() => {
                replyMessageError.delete()
            }, 5000);
        }

        for (const embed of embedConfig.embeds) {

            const embedSend = new EmbedBuilder()
            .setColor(embed.color ? embed.color : null)
            .setThumbnail(embed.thumbail ? embed.thumbail : null)
            .setAuthor({name: embed.author.name ? embed.author.name : null, iconURL: embed.author.iconURL ? embed.author.iconURL : null})
            .setTitle(embed.title ? embed.title : null)
            .setURL(embed.url ? embed.url : null)
            .setDescription(embed.description ? embed.description : "\u200b")
            .setImage(embed.picture ? embed.picture : null)
            .setFooter({text: embed.footer.text ? embed.footer.text : null, iconURL: embed.footer.iconURL ? embed.footer.iconURL : null})
            if (embed.timestamp) embedSend.setTimestamp()
            for (const field of embed.addField) {
                if (field.length <= 0) return;

                embedSend.addFields({name: field.name,value: field.value, inline: field.inline})
            }


            await client.getChannel(interaction.guild!, channelId, {embeds: [embedSend]});
            return collector.stop()
        }

    })

    collector.on('end', async () => {
        await replyMessage.delete();

        const embedSend = new EmbedBuilder()

        for (const embed of embedConfig.embeds) {
            embedSend.setColor(embed.color ? embed.color : null)
            .setThumbnail(embed.thumbail ? embed.thumbail : null)
            .setAuthor({name: embed.author.name ? embed.author.name : null, iconURL: embed.author.iconURL ? embed.author.iconURL : null})
            .setTitle(embed.title ? embed.title : null)
            .setURL(embed.url ? embed.url : null)
            .setDescription(embed.description ? embed.description : "\u200b")
            .setImage(embed.picture ? embed.picture : null)
            .setFooter({text: embed.footer.text ? embed.footer.text : null, iconURL: embed.footer.iconURL ? embed.footer.iconURL : null})
            if (embed.timestamp) embedSend.setTimestamp()

            for (const field of embed.addField) {
                if (field.length <= 0) return;

                embedSend.addFields({name: field.name,value: field.value, inline: field.inline})
            }
        }

        const buttonEnd = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                    new ButtonBuilder()
                    .setCustomId(`buttonEnd`)
                    .setDisabled(true)
                    .setLabel(language("COLLECTOR_END").replace('%channel%', mentionChannel.name))
                    .setStyle(ButtonStyle.Secondary))

        await interaction.editReply({embeds: [embedSend], components: [buttonEnd]});
        return embedConfig.delete();

    })

}

export const button = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        filepath: "Interactions/Buttons/Embed/buttonEmbedSendData",
    }
}