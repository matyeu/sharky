import {SharkClient} from "../../Librairie";
import {CommandInteraction, EmbedBuilder} from "discord.js";
import {EMBED_INFO, FOOTER, } from "../../config";

export default async function (client: SharkClient, interaction: CommandInteraction, language: any) {

    const start = Date.now();
    interaction.reply({content: "Pong !"}).then(() => {

        const end = Date.now();
        const time = end - start;

        let botLatency = `${'```js'}\n ${Math.round(time)} ms ${'```'}`
        let apiLatency = `${'```js'}\n ${Math.round(interaction.client.ws.ping)} ms ${'```'}`

        const embed = new EmbedBuilder()
            .setColor(EMBED_INFO)
            .setTitle(language("TITLE"))
            .addFields(
                {name: language("BOT_LATENCY"), value: botLatency, inline: true},
                {name: language("API_LATENCY"), value: apiLatency, inline: true},
            )
            .setTimestamp()
            .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL()});

        interaction.editReply({content: null, embeds: [embed]});
    });


}

export const slash = {
    data: {
        name: "ping",
        description: "Ping ? Pong !",
        category: "Developpement",
        permissions: ["Administrator"],
    }
}