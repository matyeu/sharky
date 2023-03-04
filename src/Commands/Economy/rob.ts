import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder } from "discord.js";
import { EMBED_INFO, EMOJIS } from "../../config";
import { SharkClient } from "../../Librairie";
import { edit, find } from "../../Models/economy";

export default async function (client: SharkClient, interaction: CommandInteraction, language: any) {

    const memberOption: any = interaction.options.get("user", true).value as string;
    const memberReplace = memberOption.replace("<@", "").replace(">", "");
    const memberToRob = await interaction.guild!.members.cache.get(memberReplace)!;

    if (!memberToRob) return interaction.replyErrorMessage(client, language("MEMBER_NOTFOUND"), true);

    const authorRobConfig: any = await find(interaction.guild!.id, interaction.user.id);
    const memberToRobConfig: any = await find(interaction.guild!.id, memberToRob.id);

    if (memberToRobConfig.money < 100)
        return interaction.replyErrorMessage(client, language("USER_TOO_POOR").replace('%user%', memberToRob), true);

    const robCd = 1.44e+7; // 4h
    const lastRob = authorRobConfig.cooldowns.rob;

    const robUserCd = 8.64e+7; // 24h
    const lastUserRob = memberToRobConfig.cooldowns.lastRob;

    if (lastRob !== null && robCd - (Date.now() - lastRob) > 0) {
        const cdTime = robCd - (Date.now() - lastRob);
        return interaction.replyErrorMessage(client, language("ROB_COOLDOWN").replace('%timeH%', Math.floor(cdTime / (1000 * 60 * 60) % 24))
            .replace('%timeM%', Math.floor(cdTime / (1000 * 60) % 60)).replace('%timeS%', Math.floor(cdTime / (1000) % 60)), true)
    }

    if (lastUserRob !== null && robUserCd - (Date.now() - lastUserRob) > 0) {
        const cdTime = robUserCd - (Date.now() - lastUserRob);
        return interaction.replyErrorMessage(client, language("ROB_USER_COOLDOWN").replace('%user%', `${memberToRob.displayName}#${memberToRob.user.discriminator}`)
            .replace('%timeH%', Math.floor(cdTime / (1000 * 60 * 60) % 24))
            .replace('%timeM%', Math.floor(cdTime / (1000 * 60) % 60)).replace('%timeS%', Math.floor(cdTime / (1000) % 60)), true)
    }

    authorRobConfig.cooldowns.rob = Date.now();
    memberToRobConfig.cooldowns.lastRob = Date.now();

    const luckRob = 45;
    const result = Math.floor(Math.random() * 100) + 1;

    let amont_random = Math.floor((Math.random() * 300) + 50);

    if (luckRob <= result) {
        if (amont_random > memberToRobConfig.money) {
            amont_random = await amont_random - memberToRobConfig.money;

            authorRobConfig.money += amont_random;
            memberToRobConfig.money -= amont_random
        } else {
            authorRobConfig.money += amont_random;
            memberToRobConfig.money -= amont_random
        }

        const text = `TEXT_WIN_${Math.floor((Math.random() * 6) + 1)}`;

        const embed = new EmbedBuilder()
            .setColor(EMBED_INFO)
            .setDescription(`${client.getEmoji(EMOJIS.information)} ${language(text).replace('%user%', interaction.user)
                .replace('%amount%', amont_random).replace('%emoji%', client.getEmoji(EMOJIS.money)).replace('%target%', memberToRob)}`)

        await interaction.reply({ embeds: [embed] });

    } else {

        const text = `TEXT_LOST_${Math.floor((Math.random() * 6) + 1)}`;

        const embed = new EmbedBuilder()
            .setColor(EMBED_INFO)
            .setDescription(`${client.getEmoji(EMOJIS.information)} ${language(text).replace('%user%', interaction.user)
                .replace('%amount%', amont_random).replace('%emoji%', client.getEmoji(EMOJIS.money)).replace('%target%', memberToRob)}`)

        await interaction.reply({ embeds: [embed] });

    }

    await edit(interaction.guild!.id, interaction.user.id, authorRobConfig);
    return edit(interaction.guild!.id, memberToRob.id, memberToRobConfig);


}

export const slash = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        name_localizations: {
            fr: "vole"
        },
        description: "Allows you to steal money from a user",
        description_localizations: {
            fr: "Permet de voler de l'argent à un utilisateur",
        },
        category: "Economy",
        permissions: ["SendMessages"],
        options: [
            {
                name: "user",
                name_localizations: {
                    fr: "utilisateur"
                },
                type: ApplicationCommandOptionType.String,
                description: "Mention or ID of the user.",
                description_localizations: {
                    fr: "Mention ou ID de l'utilisateur.",
                },
                required: true,
            }

        ],
    }
}