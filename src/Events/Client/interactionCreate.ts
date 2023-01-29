import {SharkClient} from "../../Librairie";
import {Interaction} from "discord.js";
import {find} from "../../Models/guild";

const Logger = require("../../Librairie/logger");

export default async function (client: SharkClient, interaction: Interaction) {

    const serverConfig: any = await find(interaction.guild!.id);

    if (interaction.isCommand() && interaction.inGuild()) {
        try {
            let command = client.slashCommands.get(interaction.commandName);
            if (!command) return interaction.replyErrorMessage(client, `La commande **${interaction.commandName}** n'a pas été trouver`, true);

            const category = command.slash.data.category
            const languageCommand = require(`../../Librairie/languages/${serverConfig.language}/${category}/${interaction.commandName}Data`);

            Logger.client(`The ${interaction.commandName} command was used by ${interaction.user.tag} on the ${interaction.guild?.name} server`);
            await command.default(client, interaction, languageCommand);
        }
        catch (e) {
            return console.error(e);
        }
    } else if (interaction.isButton()) {
        try {
            const getButton = client.buttons.get(interaction.customId.split(':')[0]);
            if (!getButton) return;
            Logger.client(`The ${interaction.customId} button was used by ${interaction.user?.tag} on the ${interaction.guild?.name} server.`);
            getButton.default(client, interaction)
        }
        catch (e) {
            return console.error(e);
        }
    } else if (interaction.isSelectMenu()) {
        try {
            const getSelectMenu = client.selects.get(interaction.customId);
            if (!getSelectMenu) return;
            Logger.client(`The ${interaction.customId} select-menu was used by ${interaction.user.tag} on the ${interaction.guild?.name} server.`);
            getSelectMenu.default(client, interaction)
        }
        catch (e) {
            return console.error(e);
        }
    }
}