import {SharkClient} from "../../Librairie";
import {ApplicationCommandOptionType, CommandInteraction, EmbedBuilder} from "discord.js";
import {find, edit} from "../../Models/guild";
import {EMBED_ERROR, EMBED_SUCCESS, FOOTER} from "../../config";

export default async function (client: SharkClient, interaction: CommandInteraction, language: any) {

    const serverConfig: any = await find(interaction.guild!.id);
    const isActivated = serverConfig.modules.antipub;

    serverConfig.modules.antipub = !isActivated;
    await edit(interaction.guild!.id, serverConfig);

    const embed = new EmbedBuilder()
        .setColor(isActivated ? EMBED_ERROR : EMBED_SUCCESS)
        .setTitle(`Antipub ${isActivated ? 'OFF' : 'ON'}`)
        .setDescription(language("DESCRIPTION").replace('%state%', isActivated ? 'ON' : 'OFF'))
        .setTimestamp()
        .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL()})

    return interaction.reply({embeds: [embed]})

}

export const slash = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        description: "Allow or deny discord links",
        description_localizations: {
            fr: "Autoriser ou refuser les liens discord",
        },
        category: "Administration",
        permissions: ["Administrator"],
    }
}