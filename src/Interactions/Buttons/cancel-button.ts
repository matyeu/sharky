import {ButtonInteraction} from "discord.js";
import {EMOJIS} from "../../config";
import { SharkClient } from "../../Librairie";

export default async function (client: SharkClient, interaction: ButtonInteraction, language: any) {

    let check = client.getEmoji(EMOJIS.succes);

    if (interaction.customId.split(':')[1] !== interaction.user.id)
    return interaction.replyErrorMessage(client, language("ERROR_AUTHOR"), true);

return interaction.update({content: language("CONTENT").replace('%emoji%', check), embeds: [], components: []});



};

export const button = {
    data: {
        name: "cancel",
        filepath: "Interactions/Buttons/cancelButtonData",
    }
}