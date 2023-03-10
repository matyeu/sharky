import {SharkClient} from "../../Librairie";
import {ApplicationCommandOptionType, CommandInteraction} from "discord.js";
import {find, edit} from "../../Models/guild";

export default async function (client: SharkClient, interaction: CommandInteraction, language: any) {

    const serverConfig: any = await find(interaction.guild!.id);
    const languageOption = interaction.options.get("language", true).value as string;

    if (serverConfig.language === languageOption)
        return interaction.replyErrorMessage(client, language("LANGUAGE_ALREADY").replace('%language%', languageOption), true);

    serverConfig.language = languageOption;
    await edit(interaction.guild!.id, serverConfig);

    return interaction.replySuccessMessage(client, language("CONTENT"), true);
}

export const slash = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        description: "Allows you to change the language of the bot",
        description_localizations: {
            fr: "Permet de changer la langue du bot.",
        },
        category: "Administration",
        permissions: ["Administrator"],
        options: [
            {
                name: "language",
                type: ApplicationCommandOptionType.String,
                description: "Choose the language you want",
                description_localizations: {
                    fr: "Indiquer la langue souhaitée",
                },
                required: true,
                choices: [
                    {name: "fr-FR", value: "fr-FR"},
                    {name: "en-US", value: "en-US"}
                ],
            }],
    }
}