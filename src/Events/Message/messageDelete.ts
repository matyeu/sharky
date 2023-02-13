import {SharkClient} from "../../Librairie";
import {Message, EmbedBuilder} from "discord.js";
import {find} from "../../Models/guild";
import {EMOJIS, EMBED_ERROR, FOOTER_LOG} from "../../config";

const Logger = require('../../Librairie/logger');

export default async function (client: SharkClient, message: Message) {

    let serverConfig: any = await find(message.guild!.id);
    let server = serverConfig.channels.logs.message;

    if (!serverConfig.modules.logs) return;

    if (message.system) return Logger.warn("A system message has been deleted");
    if (message.interaction) return Logger.warn("A slash command has been deleted");
    if (message.embeds.length != 0) return Logger.warn("A embed has been deleted");

    const embed = new EmbedBuilder()
        .setColor(EMBED_ERROR)
        .setTitle("Message supprimé")
        .setTimestamp()
        .addFields(
                {
                    name: "👤 Membre (ID)",
                    value: `<@${message.author.id}> (${message.author.id})`,
                    inline: true
                },
                {
                    name: `${client.getEmoji(EMOJIS.channel)} Salon (ID)`,
                    value: `${message.channel}`,
                    inline: true
                }
                )
    if (message.content.length > 1024) {
        embed.addFields(
                {
                    name: "💬 Avant la modification",
                    value: message.content.substring(0, 1024),
                    inline: false
                },
                {
                    name: "💬 (suite)",
                    value: message.content.substring(1024),
                    inline: false
                }
                )
    } else {
        embed.addFields({
            name: "💬 Avant la modification",
            value: message.content.substring(0, 1024),
            inline: false
        },)
    }
    embed.setFooter({
        text: FOOTER_LOG,
        iconURL: message.client.user?.displayAvatarURL()
    });
    return client.getChannel(message.guild!, server, {embeds: [embed]});

}