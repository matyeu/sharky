import {SharkClient} from "../../Librairie";
import {ModalSubmitInteraction} from "discord.js";
import {find, edit} from "../../Models/guild";

export default async function (client: SharkClient, interaction: ModalSubmitInteraction, language: any) {

    const serverConfig: any = await find(interaction.guild!.id);
    const message = interaction.fields.getTextInputValue('messageContent-modal');

    serverConfig.captcha.message = message;
    await edit(interaction.guild!.id, serverConfig);
    return interaction.replySuccessMessage(client, language("CONTENT_SUCCESS"), true);
}

export const modal = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        filepath: "Interactions/Modals/Captcha/modalMessageData",
    }
}