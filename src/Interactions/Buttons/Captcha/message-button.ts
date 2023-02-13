import { ActionRowBuilder, ButtonInteraction, TextInputBuilder, TextInputStyle, ModalBuilder } from "discord.js";
import {SharkClient} from "../../../Librairie";

export default async function (client: SharkClient, interaction: ButtonInteraction, language: any) {

    const member = await interaction.guild!.members.fetch(interaction.user.id);

    if (!member.permissions.has(["Administrator"]))
        return interaction.replyErrorMessage(client, language("ERROR_PERMISSION"), true);

    const modal: any = new ModalBuilder()
			.setCustomId('message-modal')
            .setTitle(language("TITLE"));

    const channel: any = new TextInputBuilder()
			.setCustomId('messageContent-modal')
			.setLabel(language("LABEL"))
			.setStyle(TextInputStyle.Paragraph);

    const firstActionRow: any = new ActionRowBuilder().addComponents(channel);
    modal.addComponents(firstActionRow);

    return interaction.showModal(modal);


}

export const button = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        filepath: "Interactions/Buttons/Captcha/buttonMessageData",
    }
}