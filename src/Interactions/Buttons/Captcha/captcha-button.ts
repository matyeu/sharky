import {ButtonInteraction, Guild } from "discord.js";
import {SharkClient} from "../../../Librairie";
import {find} from "../../../Models/guild";

export default async function (client: SharkClient, interaction: ButtonInteraction, language: any) {

    const serverConfig: any = await find(interaction.guild!.id);
    const member = await interaction.guild!.members.fetch(interaction.user.id);
    const role = client.getRole(interaction.guild!, serverConfig.captcha.role)!;

    if (!serverConfig.captcha.state) return interaction.replyErrorMessage(client, language("CAPTCHA_OFF"), true);
    if (!serverConfig.captcha.role) return interaction.replyErrorMessage(client, language("ROLE_NOTFOUND"), true);

    await interaction.reply({content: language("CAPTCHA_SUCCESS"), ephemeral: true});

    if (!member?.roles.cache.has(role.id)) {
        await member?.roles.add(role, `${member.user.username} has accepted the server's rules.`);
        const text = `TEXT_${Math.floor((Math.random() * 14) + 1)}`;

        if (serverConfig.captcha.general)
            await client.getChannel(<Guild>member!.guild, serverConfig.captcha.channelGeneral, {content: `❗️ ➜ ${language(text).replace('%user%', member)}`});
    }


}

export const button = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        filepath: "Interactions/Buttons/Captcha/buttonCaptchaData",
    }
}