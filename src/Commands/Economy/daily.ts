import { CommandInteraction } from "discord.js";
import { EMOJIS } from "../../config";
import { SharkClient } from "../../Librairie";
import { find as findEconomy, edit as editEconomy } from "../../Models/economy";
import { find as findLevel, edit as editLevel } from "../../Models/level";

export default async function (client: SharkClient, interaction: CommandInteraction, language: any) {

    const economyConfig: any = await findEconomy(interaction.guild!.id, interaction.user.id);
    const levelConfig: any = await findLevel(interaction.guild!.id, interaction.user.id);

    const dailyCd = 8.64e+7; // 24h
    const lastDaily = await economyConfig.cooldowns.daily;

    if (lastDaily !== null && dailyCd - (Date.now() - lastDaily) > 0) {
        const cdTime = dailyCd - (Date.now() - lastDaily);
        return interaction.replyErrorMessage(client, language("DAILY_COOLDOWN").replace('%timeH%', Math.floor(cdTime / (1000 * 60 * 60) % 24))
        .replace('%timeM%', Math.floor(cdTime / (1000 * 60) % 60)).replace('%timeS%', Math.floor(cdTime / (1000) % 60)), true)
    }

    const money_random = Math.floor((Math.random() * 500) + 20);
    const xp_random = Math.floor((Math.random() * 600) + 50);

    economyConfig.money += money_random;
    economyConfig.cooldowns.daily = Date.now();
    levelConfig.community.experience += xp_random;


    await editEconomy(interaction.guild!.id, interaction.user.id, economyConfig);
    await editLevel(interaction.guild!.id, interaction.user.id, levelConfig);
    return interaction.reply({content: language("TEXT").replace('%user%', interaction.user).replace("%amountM%", money_random)
    .replace('%emojiM%', client.getEmoji(EMOJIS.money)).replace("%amountX%", xp_random).replace('%emojiX%', client.getEmoji(EMOJIS.xp))});


}

export const slash = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        description: "Allows you to get your daily money back.",
        description_localizations: {
            fr: "Permet de récupérer ton argent journalier.",
        },
        category: "Economy",
        permissions: ["SendMessages"],
    }
};