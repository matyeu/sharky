import {SharkClient} from "../../Librairie";
import {ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ModalSubmitInteraction} from "discord.js";
import {find, edit} from "../../Models/guild";
import {EMBED_GENERAL, FOOTER} from "../../config";

export default async function (client: SharkClient, interaction: ModalSubmitInteraction, language: any) {

    const serverConfig: any = await find(interaction.guild!.id);
    const channelCaptchaId: any = interaction.fields.getTextInputValue('channelCaptchaId-modal');
    const channelGeneralId: any = interaction.fields.getTextInputValue('channelGeneralId-modal');

    if (isNaN(channelCaptchaId) || isNaN(channelGeneralId)) return interaction.replyErrorMessage(client, language("ERROR_CONTENT"), true);

    const channelCaptcha = await interaction.guild!.channels.cache.get(channelCaptchaId);
    const channelGeneral = await interaction.guild!.channels.cache.get(channelGeneralId);

    if (!channelCaptcha || !channelGeneral) return interaction.replyErrorMessage(client, language("CHANNEL_NOTFOUND"), true);

    const embed = new EmbedBuilder()
    .setColor(EMBED_GENERAL)
    .setTitle(language("TITLE").replace('%client%', client.user!.username))
    .setDescription(serverConfig.captcha.message)
    .setTimestamp()
    .setFooter({text: FOOTER, iconURL: client.user!.displayAvatarURL()})

    const button = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
                new ButtonBuilder()
                .setCustomId('captcha-button')
                .setLabel(language("BUTTON_LABEL"))
                .setStyle(ButtonStyle.Primary)
                )

    serverConfig.captcha.channel = channelCaptchaId;
    serverConfig.captcha.channelGeneral = channelGeneralId;
    await edit(interaction.guild!.id, serverConfig);

    await interaction.replySuccessMessage(client, language("CONTENT_SUCCESS").replace('%channel%', channelCaptcha), true);
    await client.getChannel(interaction.guild!, channelCaptchaId, {embeds: [embed], components: [button]});

}

export const modal = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        filepath: "Interactions/Modals/Captcha/modalChannelData",
    }
}