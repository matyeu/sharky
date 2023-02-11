import {SharkClient} from "../../Librairie";
import {Collection, EmbedBuilder, Interaction} from "discord.js";
import {find as findClient} from "../../Models/client";
import {find as findGuild} from "../../Models/guild";
import {EMBED_INFO, SERVER_SUPPORT} from "../../config";

const Logger = require("../../Librairie/logger");

export default async function (client: SharkClient, interaction: Interaction) {

    const clientConfig: any = await findClient(SERVER_SUPPORT);
    const serverConfig: any = await findGuild(interaction.guild!.id);
    const languageInter = require(`../../Librairie/languages/${serverConfig.language}/Events/Client/interactionData`);

    const administrators = clientConfig.administrators;
    const member = await interaction.guild!.members.fetch(interaction.user.id);

    if (interaction.isCommand() && interaction.inGuild()) {
        try {
            let command = client.slashCommands.get(interaction.commandName);
            if (!command) return interaction.replyErrorMessage(client, languageInter("COMMAND_NOTFOUND").replace('%command%', interaction.commandName), true);

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

            if (!member.permissions.has([command.slash.data.permissions]) || command.slash.data.category === "Developpement" && administrators.indexOf(interaction.user.id) === -1)
                return interaction.replyErrorMessage(client, languageInter("ERROR_PERMISSION"), true);

            if (!client.cooldowns.has(interaction.commandName)) client.cooldowns.set(interaction.commandName, new Collection());

            const timeNow = Date.now();
            const tStamps = client.cooldowns.get(interaction.commandName);
            const cdAmount = (command.slash.data.cooldown || 10) * 1000;

            if (tStamps.has(interaction.user.id) && administrators.indexOf(interaction.user.id) === -1) {
                const cdExpirationTime = tStamps.get(interaction.user.id) + cdAmount;

                if (timeNow < cdExpirationTime) {
                    let timeLeft = (cdExpirationTime - timeNow) / 1000;

                    await interaction.replyErrorMessage(client, languageInter("COOLDOWN").replace('%time%', timeLeft.toFixed(0)), true);
                    return Logger.warn(`The cooldown was triggered by ${interaction.user.tag} on the ${interaction.commandName} command`);
                }
            }

            tStamps.set(interaction.user.id, timeNow);
            setTimeout(() => tStamps.delete(interaction.user.id), cdAmount);


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
            const languageButton = require(`../../Librairie/languages/${serverConfig.language}/${getButton.button.data.filepath}`);
            Logger.client(`The ${interaction.customId} button was used by ${interaction.user?.tag} on the ${interaction.guild?.name} server.`);
            getButton.default(client, interaction, languageButton)
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