import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder } from "discord.js";
import { SharkClient } from "../../Librairie";
import { findServer as findLevels } from "../../Models/level";
import { findServer as findEconomy } from "../../Models/economy";
import { EMBED_GENERAL, EMOJIS, FOOTER } from "../../config";

export default async function (client: SharkClient, interaction: CommandInteraction, language: any) {

    const rankig = interaction.options.get('choice', true).value;
    const serverLevels: any = await findLevels(interaction.guild!.id);
    const serverEconomy: any = await findEconomy(interaction.guild!.id);

    const embed = new EmbedBuilder()
        .setColor(EMBED_GENERAL)
        .setAuthor({ name: `${interaction.guild?.name}`, iconURL: `${interaction.guild?.iconURL()}` })
        .setTitle(language("TITLE"))
        .setTimestamp()
        .setFooter({ text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL() });

    switch (rankig) {
        case 'levels':
            const sortedLevels = serverLevels.sort((a: any, b: any) =>
                b.community.experience + b.community.experience ? 1 : -1
            );
            for (const e of sortedLevels.splice(0, 5)) {
                let user = await interaction.guild?.members.fetch(e.userID)!;

                embed.setDescription(language("DESCRIPTION_LEVEL"))
                embed.addFields(
                    {
                        name: user.displayName,
                        value: language("ADDFIELD_LEVEL").replace('%level%', e.community.level)
                        .replace('%experience%', e.community.experience).replace('%emoji%', client.getEmoji(EMOJIS.xp)),
                        inline: false
                    }
                );
            }
            break;
        case 'walth':
            const money = client.getEmoji(EMOJIS.money),
                bank = client.getEmoji(EMOJIS.bank);

                const sortedRichesse = serverEconomy.sort((a: any, b: any) =>
                a.money + a.bank < b.money + b.bank ? 1 : -1
            );
            for (const e of sortedRichesse.splice(0, 5)) {
                let user = await interaction.guild?.members.fetch(e.userID)!;
                embed.addFields(
                    {
                        name: user.displayName,
                        value: language("ADDFIELD_WALTH").replace('%money%', e.money).replace('%emojiM%', money)
                        .replace('%bank%', e.bank).replace('%emojiB%', bank),
                        inline: false
                    }
                );
            }
            break;
        default:
            return interaction.replyErrorMessage(client, language("ERROR_RANKING"), true);
    }

    return interaction.reply({embeds: [embed]});

}

export const slash = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        name_localizations: {
            fr: "classements"
        },
        description: "Displays community rankings",
        description_localizations: {
            fr: "Affiche les classements de la communauté",
        },
        category: "Général",
        permissions: ["SendMessages"],
        options: [
            {
                name: "choice",
                name_localizations: {
                    fr: "choix"
                },
                description: "The ranking to be displayed",
                description_localizations: {
                    fr: "Le classement à afficher"
                },
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {
                        name: "Levels",
                        value: "levels"
                    },
                    {
                        name: "Wealth",
                        name_localizations: {
                            fr: "Richesse"
                        },
                        value: "walth"
                    },
                ],
            }
        ],
    }
}