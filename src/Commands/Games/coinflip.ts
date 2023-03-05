import { ActionRowBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonInteraction, ButtonStyle, CommandInteraction, EmbedBuilder } from "discord.js";
import { EMBED_ERROR, EMBED_GENERAL, EMBED_SUCCESS, EMOJIS, FOOTER_CASINO, IDLE_BUTTON, IMAGES } from "../../config";
import { SharkClient } from "../../Librairie";
import { find, edit } from "../../Models/economy";

export default async function (client: SharkClient, interaction: CommandInteraction, language: any) {

    const casinoConfig: any = await find(interaction.guild!.id, interaction.user.id);
    const bet = interaction.options.get('bet', true).value as number;
    const member = await interaction.guild!.members.fetch(interaction.user.id);

    if (casinoConfig.money < bet || bet === 0)
        return interaction.replyErrorMessage(client, language("NOT_FOUND"), true);

    if (bet > 500) return interaction.replyErrorMessage(client, language("ERROR_BET"), true);

    const embed = new EmbedBuilder()
        .setColor(EMBED_GENERAL)
        .setTitle(language("TITLE"))
        .setDescription(language("DESCRIPTION").replace('%bet%', bet).replace('%emoji%', client.getEmoji(EMOJIS.money))
            .replace('%user%', `${member.displayName}#${member.user.discriminator}`))
        .setTimestamp()
        .setFooter({ text: FOOTER_CASINO, iconURL: client.user?.displayAvatarURL() });

    const buttons = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`face:${interaction.user.id}`)
                .setEmoji(EMOJIS.face)
                .setLabel(language("FACE"))
                .setStyle(ButtonStyle.Secondary))
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`tail:${interaction.user.id}`)
                .setEmoji(EMOJIS.tail)
                .setLabel(language("TAIL"))
                .setStyle(ButtonStyle.Secondary));

    const replyMessage = await interaction.reply({ embeds: [embed], components: [buttons], fetchReply: true });
    const collector = replyMessage.createMessageComponentCollector({ filter: () => true, idle: IDLE_BUTTON });

    let betCurrent = bet;
    let round = 2;

    collector.on("collect", async (inter: ButtonInteraction) => {

        if (inter.customId.split(':')[1] !== inter.user.id)
            return inter.replyErrorMessage(client, language("ERROR_PERMISSION"), true);

        let choice = ['face', "tail"];
        let choiceRandom = choice[Math.floor(Math.random() * choice.length)].toLowerCase();
        let choiceUser = inter.customId.split(':')[0];

        if (inter.customId.split(':')[0] === 'cashout') {

            casinoConfig.money += betCurrent;
            await edit(interaction.guild!.id, interaction.user.id, casinoConfig);

            embed.setColor(EMBED_SUCCESS)
            embed.setDescription(language("DESCRIPTION_CASHOUUT").replace('%bet%', betCurrent).replace('%emoji%', client.getEmoji(EMOJIS.money))
                .replace('%user%', `${member.displayName}#${member.user.discriminator}`));

            await inter.update({ embeds: [embed] });
            return collector.stop();
        }
        else {

            const embedCoins = new EmbedBuilder()
                .setColor(EMBED_GENERAL)
                .setImage(choiceRandom === "tail" ? IMAGES.coinflip_tail : IMAGES.coinflip_face)
                .setTimestamp()
                .setFooter({ text: FOOTER_CASINO, iconURL: client.user?.displayAvatarURL() });

            await inter.update({ embeds: [embedCoins], components: [] });

            if (choiceRandom === choiceUser) {
                betCurrent = bet * round;

                setTimeout(async () => {
                    const descriptionWin = embed.setDescription(language("DESCRIPTION").replace('%bet%', betCurrent).replace('%emoji%', client.getEmoji(EMOJIS.money))
                        .replace('%user%', `${member.displayName}#${member.user.discriminator}`));

                    buttons.addComponents(
                        new ButtonBuilder()
                            .setCustomId(`cashout:${interaction.user.id}`)
                            .setEmoji(EMOJIS.money)
                            .setLabel(language("CASHOUT"))
                            .setStyle(ButtonStyle.Success));

                    await replyMessage.edit({ embeds: [descriptionWin], components: [buttons] });
                    return round++;
                }, 4100);
            } else {
                casinoConfig.money -= betCurrent;
                await edit(interaction.guild!.id, interaction.user.id, casinoConfig);

                setTimeout(async () => {
                    const embedLost = embed.setColor(EMBED_ERROR)
                    .setDescription(language("DESCRIPTION_LOST").replace('%bet%', betCurrent).replace('%emoji%', client.getEmoji(EMOJIS.money))
                    .replace('%user%', `${member.displayName}#${member.user.discriminator}`));

                    await replyMessage.edit({ embeds: [embedLost]});
                    return collector.stop();
                }, 4100);
            }
        }
    });

    collector.on('end', _ => {
        const buttonEnd = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`buttonEnd`)
                    .setDisabled(true)
                    .setLabel(language("COLLECTOR_END"))
                    .setStyle(ButtonStyle.Secondary))

        replyMessage.edit({ components: [buttonEnd] });
    });
}

export const slash = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        description: "Allows you to flip a coin.",
        description_localizations: {
            fr: "Permet de jouer à pile ou face."
        },
        category: "Games",
        permissions: ["SendMessages"],
        options: [
            {
                name: "bet",
                type: ApplicationCommandOptionType.Number,
                description: "The amount of money you want to bet.",
                description_localizations: {
                    fr: "La somme d'argent que vous voulez parier."
                },
                required: true,
            }
        ],
    }
}