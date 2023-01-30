import {SharkClient} from "../../Librairie";
import {EmbedBuilder, Interaction} from "discord.js";
import {find} from "../../Models/guild";
import {EMBED_INFO} from "../../config";

const Logger = require("../../Librairie/logger");

export default async function (client: SharkClient, interaction: Interaction) {

    const serverConfig: any = await find(interaction.guild!.id);
    const languageInter = require(`../../Librairie/languages/${serverConfig.language}/Events/Client/interactionData`);

    const administrators = serverConfig.administrators;
    const member = await interaction.guild!.members.fetch(interaction.user.id);

    if (interaction.isCommand() && interaction.inGuild()) {
        try {
            let command = client.slashCommands.get(interaction.commandName);
            if (!command) return interaction.replyErrorMessage(client, `La commande **${interaction.commandName}** n'a pas été trouver`, true);

            const category = command.slash.data.category
            const languageCommand = require(`../../Librairie/languages/${serverConfig.language}/Commands/${category}/${interaction.commandName}Data`);

            const commandMaintenance = serverConfig.maintenance.commandes.find((e: any) => e.cmdName == interaction.commandName);
            const categoryMaintenance = serverConfig.maintenance.category.find((e: any) => e.categoryName == command.slash.data.category);

            // START SYSTEM OF MAINTENANCE
            const embedMaintenance = new EmbedBuilder()
            .setColor(EMBED_INFO)
            .setTitle(languageInter("TITLE"))
            .setFooter({text: languageInter("FOOTER").replace('%client%', client.user!.username)});

            if (serverConfig.maintenance.state && administrators.indexOf(interaction.user.id) === -1) {
                embedMaintenance.setDescription(languageInter("DESCRIPTION_BOT").replace('%user%', member.displayName).replace('%client%', client.user!.username))
                if (serverConfig.maintenance.reason) embedMaintenance.addFields({name: languageInter("REASON"),value: serverConfig.maintenance.reason});
                return interaction.reply({embeds: [embedMaintenance], ephemeral: true});
            } else if (commandMaintenance && commandMaintenance.state && administrators.indexOf(interaction.user.id) === -1) {
                embedMaintenance.setDescription(languageInter("DESCRIPTION_COMMAND").replace('%user%', member.displayName).replace('%command%', interaction.commandName))
                if (commandMaintenance.reason) embedMaintenance.addFields({name: languageInter("REASON"),value: commandMaintenance.reason});
                return interaction.reply({embeds: [embedMaintenance], ephemeral: true});
            } else if (categoryMaintenance && categoryMaintenance.state && administrators.indexOf(interaction.user.id) === -1) {
                embedMaintenance.setDescription(languageInter("DESCRIPTION_CATEGORY").replace('%user%', member.displayName).replace('%category%', command.slash.data.category))
                if (categoryMaintenance.reason) embedMaintenance.addFields({name: languageInter("REASON"),value: categoryMaintenance.reason});
                return interaction.reply({embeds: [embedMaintenance], ephemeral: true});
            }
            // END SYSTEM OF MAINTENANCE


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
            const getSelectMenu = client.selects.get(interaction.customId.split(':')[0]);
            if (!getSelectMenu) return;
            const languageSelect = require(`../../Librairie/languages/${serverConfig.language}/${getSelectMenu.select.data.filepath}`);
            Logger.client(`The ${interaction.customId} select-menu was used by ${interaction.user.tag} on the ${interaction.guild?.name} server.`);
            getSelectMenu.default(client, interaction, languageSelect)
        }
        catch (e) {
            return console.error(e);
        }
    }
}