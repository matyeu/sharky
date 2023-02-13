import { ActionRowBuilder, ButtonInteraction, TextInputBuilder, TextInputStyle, ModalBuilder } from "discord.js";
import {SharkClient} from "../../../Librairie";

export default async function (client: SharkClient, interaction: ButtonInteraction, language: any) {

    const member = await interaction.guild!.members.fetch(interaction.user.id);

    if (!member.permissions.has(["Administrator"]))
        return interaction.replyErrorMessage(client, language("ERROR_PERMISSION"), true);

    const modal: any = new ModalBuilder()
			.setCustomId('channel-modal')
            .setTitle(language("TITLE"));

    const channelCaptcha: any = new TextInputBuilder()
			.setCustomId('channelCaptchaId-modal')
			.setLabel(language("LABEL_CAPTCHA"))
			.setStyle(TextInputStyle.Short);
    
    const channelGeneral: any = new TextInputBuilder()
			.setCustomId('channelGeneralId-modal')
			.setLabel(language("LABEL_GENERAL"))
			.setStyle(TextInputStyle.Short);

    const channelCaptchaRow: any = new ActionRowBuilder().addComponents(channelCaptcha);
    const channelGeneralRow: any = new ActionRowBuilder().addComponents(channelGeneral);
    modal.addComponents(channelCaptchaRow, channelGeneralRow);

    return interaction.showModal(modal);


}

export const button = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        filepath: "Interactions/Buttons/Captcha/buttonChannelData",
    }
}