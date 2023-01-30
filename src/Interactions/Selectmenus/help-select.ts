import {SharkClient} from "../../Librairie";
import {SelectMenuInteraction, EmbedBuilder} from "discord.js";
import {EMOJIS, EMBED_GENERAL, FOOTER} from "../../config";
import {readdirSync} from "fs";

export default async function (client: SharkClient, interaction: SelectMenuInteraction, language: any) {

    const embedHead = new EmbedBuilder()
        .setColor(EMBED_GENERAL)
        .setTitle(language("TITLE"))
        .setDescription(language("DESCRIPTION").replace('%client%', interaction.client.user?.username))

    const embed = new EmbedBuilder()
        .setColor(EMBED_GENERAL)
        .setTimestamp()
        .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL()})

    await interaction.update({content: null}).then(() => {
        const commandFolder = readdirSync('./src/Commands');

        switch (interaction.values[0]) {
            case 'staff':
                embed.setTitle(`${client.getEmoji(EMOJIS.devBot)} ${language("TITLE_COMMAND")} ${client.getEmoji(EMOJIS.devBot)}`);
                for (const category of commandFolder) {
                    if (category !== "Administration" && category !== "Moderation") continue;

                    const emojisCat = {
                        Administration: client.getEmoji(EMOJIS.admin),
                        Moderation: client.getEmoji(EMOJIS.discordemployee)
                    }

                    embed.addFields({
                        name: `${emojisCat[category]} ${category} - (${client.slashCommands.filter(cmd => cmd.slash.data.category == category).map(cmd => cmd.slash.data.name).length})`,
                        value: `\`${client.slashCommands.filter(cmd => cmd.slash.data.category == category).map(cmd => cmd.slash.data.name).join(',')}\``
                    })
                }
                break;
            case 'general':
                embed.setTitle(`🎈 ${language("TITLE_COMMAND")} 🎈`);
                for (const category of commandFolder) {
                    if (category !== "Général") continue;

                    const emojisCat = {
                        G\u00e9n\u00e9ral: client.getEmoji(EMOJIS.general)
                    }

                    embed.addFields({
                        name: `${emojisCat[category]} ${category} - (${client.slashCommands.filter(cmd => cmd.slash.data.category == category).map(cmd => cmd.slash.data.name).length})`,
                        value: `\`${client.slashCommands.filter(cmd => cmd.slash.data.category == category).map(cmd => cmd.slash.data.name).join(',')}\``
                    })
                }
                break;
            default:
                return interaction.editErrorMessage(client, `Le topic ${interaction.values[0]} **n'existe pas**.`)
        }
    });
    return interaction.editReply({embeds: [embedHead, embed]});
}

export const select = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        filepath: "Interactions/Selectmenus/selectHelpData",
    }
}