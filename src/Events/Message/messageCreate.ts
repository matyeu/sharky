import {SharkClient} from "../../Librairie";
import {EmbedBuilder, Message} from "discord.js";
import {find} from "../../Models/guild";
import {EMBED_CLOSE, FOOTER_MODERATION} from "../../config";

const Logger = require('../../Librairie/logger');

export default async function (client: SharkClient, message: Message) {

    if (message.author.bot) return;
    if (message.system) return Logger.warn("A system message has been created");

    const serverConfig: any = await find(message.guild!.id);
    const messageLang = require(`../../Librairie/languages/${serverConfig.language}/Events/Message/messageCreateData`);
    const member = message.member!;

    if (serverConfig.modules.antipub) {
        if (message.content.includes('discord.gg/') || message.content.includes('discordapp/invite')) {
            if (message.member!.permissions.has(["ManageMessages"])) return;
            await message.delete();
            await message.member?.timeout(1.8e+6, messageLang("MEMBER_TIMEOUT").replace('%user%', member.displayName)).catch((err) => {
                Logger.error(err)
            })

            const date = (Date.now() + 1.8e+6) / 1000;
            const timeStamp = date.toString().split('.')[0];

            const embedMod = new EmbedBuilder()
                .setColor(EMBED_CLOSE)
                .setDescription(messageLang("DESCRIPTION_TIMEOUT").replace('%user%', `${member.displayName}#${member.user.discriminator}`)
                    .replace('%time%',timeStamp))
                .setTimestamp()
                .setFooter({text: FOOTER_MODERATION, iconURL: client.user!.displayAvatarURL()})
            return client.getChannel(message.guild!, serverConfig.channels.logs.sanction, {embeds: [embedMod]});

        }
    }
}