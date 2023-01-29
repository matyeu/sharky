import {SharkClient} from "../../Librairie";
import {ApplicationCommandOptionType, CommandInteraction} from "discord.js";
import {find, edit} from "../../Models/guild";

export default async function (client: SharkClient, interaction: CommandInteraction, language: any) {

    const serverConfig: any = await find(interaction.guild!.id);
    const languageOption = interaction.options.get("language", true).value as string;

    serverConfig.language = languageOption;
    await edit(interaction.guild!.id, serverConfig);

    return interaction.replySuccessMessage(client, language("CONTENT"), true);
}

export const slash = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        description: "Allows you to change the language of the bot",
        category: "Administration",
        permissions: ["Administrator"],
        options: [
            {
                name: "language",
                type: ApplicationCommandOptionType.String,
                description: "Choose the language you want",
                required: true,
                choices: [
                    {name: "fr-FR", value: "fr-FR"},
                    {name: "en-US", value: "en-US"}
                ],
            }],
    }
}