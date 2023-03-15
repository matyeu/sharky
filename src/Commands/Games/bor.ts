import { ActionRowBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonInteraction, ButtonStyle, CommandInteraction, EmbedBuilder } from "discord.js";
import { EMBED_ERROR, EMBED_GENERAL, EMBED_SUCCESS, EMOJIS, FOOTER_CASINO, IDLE_BUTTON } from "../../config";
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
        .setDescription(language("DESCRIPTION").replace('%bet%', bet).replace('%emoji%', client.getEmoji(EMOJIS.money))
            .replace('%user%', `${member.displayName}#${member.user.discriminator}`))
        .setTimestamp()
        .setFooter({ text: FOOTER_CASINO, iconURL: interaction.client.user?.displayAvatarURL() });

    const buttons = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`black:${interaction.user.id}`)
                .setLabel(language("BLACK"))
                .setStyle(ButtonStyle.Secondary))
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`red:${interaction.user.id}`)
                .setLabel(language("RED"))
                .setStyle(ButtonStyle.Danger))
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`green:${interaction.user.id}`)
                .setLabel(language("GREEN"))
                .setStyle(ButtonStyle.Success))

    const replyMessage = await interaction.reply({ embeds: [embed], components: [buttons], fetchReply: true });
    const collector = replyMessage.createMessageComponentCollector({ filter: () => true, idle: IDLE_BUTTON });

    let betCurrent = bet;
    let round = 2;

    collector.on("collect", async (inter: ButtonInteraction) => {

        if (inter.customId.split(':')[1] !== inter.user.id)
            return inter.replyErrorMessage(client, language("ERROR_PERMISSION"), true);

        let randomColor = 'red';
        const probability = Math.floor(Math.random() * 39);
        if (probability === 0) randomColor = 'green';
        else if (probability % 2 === 0) randomColor = 'black';
        const chooseColor = inter.customId.split(':')[0];

        if (inter.customId.split(':')[0] === 'cashout') {

            casinoConfig.money += betCurrent * round;
            await edit(interaction.guild!.id, interaction.user.id, casinoConfig);

            embed.setColor(EMBED_SUCCESS)
            embed.setDescription(language("DESCRIPTION_CASHOUUT").replace('%bet%', betCurrent).replace('%emoji%', client.getEmoji(EMOJIS.money))
                .replace('%user%', `${member.displayName}#${member.user.discriminator}`));

            await inter.update({ embeds: [embed] });
            return collector.stop();
        } else if (chooseColor === randomColor) {
            betCurrent = randomColor === 'green' ? (bet * 35) : (bet * 2);

            const descriptionWin = embed.setDescription(language("DESCRIPTION").replace('%bet%', betCurrent).replace('%emoji%', client.getEmoji(EMOJIS.money))
                .replace('%user%', `${member.displayName}#${member.user.discriminator}`));

            buttons.addComponents(
                new ButtonBuilder()
                    .setCustomId(`cashout:${interaction.user.id}`)
                    .setEmoji(EMOJIS.money)
                    .setLabel(language("CASHOUT"))
                    .setStyle(ButtonStyle.Primary));

            await inter.update({ embeds: [descriptionWin], components: [buttons] });
            round++

        }
        else {
            casinoConfig.money -= betCurrent;
            await edit(interaction.guild!.id, interaction.user.id, casinoConfig);

            const embedLost = embed.setColor(EMBED_ERROR)
                .setDescription(language("DESCRIPTION_LOST").replace('%bet%', betCurrent).replace('%emoji%', client.getEmoji(EMOJIS.money))
                    .replace('%user%', `${member.displayName}#${member.user.discriminator}`));

            await inter.update({ embeds: [embedLost], components: [] });
            return collector.stop();

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
        description: "Allows you to play black or red.",
        description_localizations: {
            fr: "Permet de jouer à noir ou rouge.."
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