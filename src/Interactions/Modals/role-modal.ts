import {SharkClient} from "../../Librairie";
import {ModalSubmitInteraction} from "discord.js";
import {find, edit} from "../../Models/guild";

export default async function (client: SharkClient, interaction: ModalSubmitInteraction, language: any) {

    const serverConfig: any = await find(interaction.guild!.id);
    const roleId: any = interaction.fields.getTextInputValue('roleId-modal');

    if (isNaN(roleId)) return interaction.replyErrorMessage(client, language("ERROR_CONTENT"), true);

    const role = await interaction.guild!.roles.cache.get(roleId);

    if (!role) return interaction.replyErrorMessage(client, language("ROLE_NOTFOUND"), true);

    serverConfig.captcha.role = roleId;
    await edit(interaction.guild!.id, serverConfig);
    await interaction.replySuccessMessage(client, language("CONTENT_SUCCESS").replace('%role%', role), true);

}

export const modal = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        filepath: "Interactions/Modals/Captcha/modalRoleData",
    }
}