import {SharkClient} from "../../Librairie";
import {ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, CommandInteraction, EmbedBuilder, Message} from "discord.js";
import {find, edit} from "../../Models/economy";
import {EMOJIS, EMBED_ERROR, EMBED_INFO, EMBED_SUCCESS, FOOTER_CASINO, IDLE_BUTTON} from "../../config";

export default async function (client: SharkClient, interaction: CommandInteraction, language: any) {

    const casinoConfig: any = await find(interaction.guild!.id, interaction.user.id);
    const bet = interaction.options.get('bet', true).value as number;
    const member = await interaction.guild!.members.fetch(interaction.user.id)

    if (casinoConfig.money < bet || bet === 0)
        return interaction.replyErrorMessage(client, language("NOT_FOUND"), true);

    if (bet > 500)
        return interaction.replyErrorMessage(client, language("ERROR_BET"), true);

    let stop: any = ((Math.random() * 6)).toFixed(1);
    stop = parseFloat(stop);
    const profit = bet;
    let newProfit: any = 0;

    const loss = bet;
    let multiplier: any = 1;


    let replyEmbed = new EmbedBuilder()
        .setColor(EMBED_INFO)
        .setTitle("Crash")
        .setDescription(language("DESCRIPTION").replace('%user%', `${member.displayName}#${member.user.discriminator}`)
        .replace('%bet%', bet).replace('%emoji%', client.getEmoji(EMOJIS.money)))
        .addFields(
                {inline: true, name: language("MULTIPLY"), value: `${multiplier}x`},
                {inline: true, name: "Profit: ", value: `${newProfit} ${client.getEmoji(EMOJIS.money)}`},
                {inline: false, name: language("HOW_TO_PLAY").replace('%emoji%', client.getEmoji(EMOJIS.integration)), value: language("HOW_TO_PLAY_VALUE")}
                )
        .setTimestamp()
        .setFooter({text: FOOTER_CASINO, iconURL: client.user?.displayAvatarURL()});

    const button = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
                new ButtonBuilder()
                .setCustomId(`stop:${interaction.user.id}`)
                .setLabel("STOP")
                .setStyle(ButtonStyle.Danger))

    const buttonDisabled = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
                new ButtonBuilder()
                .setCustomId("stop")
                .setLabel("STOP")
                .setStyle(ButtonStyle.Danger)
                .setDisabled(true))

    await interaction.reply({embeds: [replyEmbed],components: [button],fetchReply: true})
    .then((crashMessage: Message) => {
        const refreshID = setInterval(() => {
            multiplier = (multiplier + 0.2).toFixed(1);
            multiplier = parseFloat(multiplier);
            newProfit = (multiplier * profit).toFixed(0);
            newProfit = parseFloat(newProfit) - profit;

            replyEmbed = new EmbedBuilder()
                        .setColor(EMBED_SUCCESS)
                        .setTitle("Crash")
                       .setDescription(language("DESCRIPTION").replace('%user%', `${member.displayName}#${member.user.discriminator}`)
                       .replace('%bet%', bet).replace('%emoji%', client.getEmoji(EMOJIS.money)))
                        .addFields(
                                {inline: true, name: language("MULTIPLY"), value: `${multiplier}x`},
                                {inline: true, name: "Profit: ", value: `${newProfit} ${client.getEmoji(EMOJIS.money)}`},
                                {inline: false, name: language("HOW_TO_PLAY").replace('%emoji%', client.getEmoji(EMOJIS.integration)), value: language("HOW_TO_PLAY_VALUE")}
                                )
                        .setTimestamp()
                        .setFooter({text: FOOTER_CASINO, iconURL: client.user?.displayAvatarURL()});
            crashMessage.edit({
                embeds: [replyEmbed]
            });

            if (multiplier >= stop) {
                clearInterval(refreshID);
                replyEmbed = new EmbedBuilder()
                            .setColor(EMBED_ERROR)
                            .setTitle("Crash")
                            .setDescription(language("DESCRIPTION").replace('%user%', `${member.displayName}#${member.user.discriminator}`)
                            .replace('%bet%', bet).replace('%emoji%', client.getEmoji(EMOJIS.money)))
                            .addFields(
                                {inline: true, name: language("MULTIPLY"), value: `${multiplier}x`},
                                {inline: true, name: "Profit: ", value: `${newProfit} ${client.getEmoji(EMOJIS.money)}`},
                                {inline: false, name: language("HOW_TO_PLAY").replace('%emoji%', client.getEmoji(EMOJIS.integration)), value: language("HOW_TO_PLAY_VALUE")}
                                )
                            .setTimestamp()
                            .setFooter({text: FOOTER_CASINO, iconURL: client.user?.displayAvatarURL()});
                crashMessage.edit({
                    embeds:[ replyEmbed],
                    components: [buttonDisabled]
                });

                casinoConfig.money -= loss;
                edit(interaction.guild!.id, interaction.user.id, casinoConfig);
            }
            }, 2000)

        const collector = crashMessage.createMessageComponentCollector({ filter: ()=> true, idle: IDLE_BUTTON });

        collector.on('collect', async (inter: ButtonInteraction) => {
            if (inter.customId.split(':')[1] !== inter.user.id)
                return inter.replyErrorMessage(client, language("ERROR_PERMISSION"), true);

            clearInterval(refreshID);
            replyEmbed = new EmbedBuilder()
                        .setColor(EMBED_SUCCESS)
                        .setTitle("Crash")
                        .setDescription(language("SUCCESS").replace('%user%', `${member.displayName}#${member.user.discriminator}`)
                        .replace('%newProfit%', newProfit).replace('%emoji%', client.getEmoji(EMOJIS.money)))
                        .addFields(
                                {inline: true, name: language("MULTIPLY"), value: `${multiplier}x`},
                                {inline: true, name: "Profit: ", value: `${newProfit} ${client.getEmoji(EMOJIS.money)}`},
                                {inline: false, name: language("HOW_TO_PLAY").replace('%emoji%', client.getEmoji(EMOJIS.integration)), value: language("HOW_TO_PLAY_VALUE").replace('%emoji%', client.getEmoji(EMOJIS.integration))}
                                )
            await inter.update({
                embeds: [ replyEmbed ],
                components: [buttonDisabled]
            });

            casinoConfig.money += newProfit;
            await edit(interaction.guild!.id, interaction.user.id, casinoConfig);
            return collector.stop();
        });
    })


}

export const slash = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        description: "Allows you to play crash",
        description_localizations: {
            fr: "Permet de jouer à crash",
        },
        category: "Games",
        permissions: ["SendMessages"],
        options: [
            {
                name: "bet",
                name_localizations: {
                    fr: "montant"
                },
                type: ApplicationCommandOptionType.Number,
                description: "The amount of money you want to bet.",
                description_localizations: {
                    fr: "a somme d'argent que vous voulez parier.",
                },
                required: true,
            }
        ],
    }
}