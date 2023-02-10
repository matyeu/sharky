import {SharkClient} from "../../Librairie";
import {CommandInteraction, EmbedBuilder} from "discord.js";
import {find, edit} from "../../Models/economy";
import {EMOJIS, EMBED_INFO} from "../../config";

export default async function (client: SharkClient, interaction: CommandInteraction, language: any) {

    const economyConfig: any = await find(interaction.guild!.id, interaction.user.id);

    const workCd = 1.44e+7;
    const lastWork = await economyConfig.work;

    if (lastWork !== null && workCd - (Date.now() - lastWork) > 0) {
        const cdTime = workCd - (Date.now() - lastWork);
        return interaction.replyErrorMessage(client, language("WORK_COOLDOWN").replace('%timeH%', Math.floor(cdTime / (1000 * 60 * 60) % 24))
        .replace('%timeM%', Math.floor(cdTime / (1000 * 60) % 60)).replace('%timeS%', Math.floor(cdTime / (1000) % 60)), true)
    }

    const number_random = Math.floor((Math.random() * 100) + 20);

    economyConfig.money += number_random;
    economyConfig.work = Date.now();

    const text = `TEXT_${Math.floor((Math.random() * 9) + 1)}`;

    const embed = new EmbedBuilder()
    .setColor(EMBED_INFO)
    .setDescription(`${client.getEmoji(EMOJIS.information)} ${language(text).replace('%number%', number_random).replace('%emoji%', client.getEmoji(EMOJIS.money))}`)

    await edit(interaction.guild!.id, interaction.user.id, economyConfig);
    return interaction.reply({embeds: [embed]});

}

export const slash = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        name_localizations: {
            fr: "travail"
        },
        description: "Allows you to earn money while working.",
        description_localizations: {
            fr: "Permet de récupérer de l'argent en travaillant."
        },
        category: "Economy",
        permissions: ["SendMessages"],
    }
};