import {SharkClient} from "../../Librairie";
import {ApplicationCommandOptionType, CommandInteraction, EmbedBuilder} from "discord.js";
import {EMBED_INFO, EMBED_SUCCESS, EMOJIS, FOOTER} from "../../config";

export default async function (client: SharkClient, interaction: CommandInteraction, language: any) {

    const emojiOption = interaction.options.get('emoji', true).value as any;
    const getEmoji = await interaction.client!.emojis.cache.get(emojiOption.match(/\d{15,}/g)[0])!;
    const member = await interaction.guild!.members.fetch(interaction.user);

    if (!getEmoji) return interaction.replyErrorMessage(client, language("ERROR_EMOJI"), true);
    const link = getEmoji.animated ? `https://cdn.discordapp.com/emojis/${getEmoji.id}.gif` : `https://cdn.discordapp.com/emojis//${getEmoji.id}.png`;

    const embed = new EmbedBuilder()
        .setThumbnail(link)
        .setTimestamp()
        .setFooter({text: FOOTER, iconURL: interaction.client!.user.displayAvatarURL()})


    //@ts-ignore
    switch (interaction.options.getSubcommand(false)) {
        case 'create':
            if (getEmoji.guild.id === interaction.guild!.id)
                return interaction.replyErrorMessage(client, language("EMOJI_ALREADY").replace('%emoji%', getEmoji), true);

            await interaction.guild!.emojis.create({
                attachment: link,
                name: `${getEmoji.name}`,
                reason: language("REASON").replace('%user%', `${member.displayName}#${member.user.discriminator}`)
            })
                .then(emoji => {
                    embed.setColor(EMBED_SUCCESS)
                        .setDescription(language("DESCRIPTION_CREATE").replace('%emoji%', emoji))
                    .addFields(
                            {
                                name: language("ADDFIELD_NAME"),
                                value: `\`${emoji.name}\``,
                                inline: true
                            },
                            {
                                name: "ID",
                                value: `\`${emoji.id}\``,
                                inline: true
                            },
                            {
                                name: language("ADDFIELD_ANIME"),
                                value: emoji.animated ? `${client.getEmoji(EMOJIS.succes)}` : `${client.getEmoji(EMOJIS.error)}`,
                                inline: true
                            },
                            {
                                name: language("ADDFIELD_LINK"),
                                value: emoji.animated ? `https://cdn.discordapp.com/emojis/${emoji.id}.gif` : `https://cdn.discordapp.com/emojis//${emoji.id}.png`,
                                inline: true
                            }
                            )
                })
                .catch(console.error);
            break;
        case 'info':
            embed.setColor(EMBED_INFO)
                .setDescription(language("DESCRIPTION_INFO").replace('%emoji%', getEmoji))
                .addFields(
                    {
                        name: language("ADDFIELD_NAME"),
                        value: `\`${getEmoji.name}\``,
                        inline: true
                    },
                    {
                        name: "ID",
                        value: `\`${getEmoji.id}\``,
                        inline: true
                    },
                    {
                        name: language("ADDFIELD_ANIME"),
                        value: getEmoji.animated ? `${client.getEmoji(EMOJIS.succes)}` : `${client.getEmoji(EMOJIS.error)}`,
                        inline: true
                    },
                    {
                        name: language("ADDFIELD_LINK"),
                        value: link,
                        inline: true
                    }
                )
            break;
        case 'remove':
            const emojiGuild = await interaction.guild!.emojis.cache.get(getEmoji.id);
            if (!emojiGuild) return interaction.replyErrorMessage(client, language("EMOJI_NOTFOUND"), true);

            await interaction.guild!.emojis.delete(emojiGuild, language("REASON").replace('%user%', `${member.displayName}#${member.user.discriminator}`)).catch(console.error);
            return interaction.replySuccessMessage(client, language("EMOJI_DELETE"), false);
            break;
        default:
            return interaction.replyErrorMessage(client, language("DEFAULT"), true);
    }

    return interaction.reply({embeds: [embed]})
}

export const slash = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        description: "Command emoji",
        description_localizations: {
            fr: "Commande emoji",
        },
        category: "Administration",
        permissions: ["Administrator"],
        options: [
            {
                name: "create",
                name_localizations: {
                    fr: "ajout"
                },
                type: ApplicationCommandOptionType.Subcommand,
                description: "Adding a new emoji",
                description_localizations: {
                    fr: "Ajout d'un nouvel emoji",
                },
                options: [
                    {
                        name: "emoji",
                        type: ApplicationCommandOptionType.String,
                        description: "Emoji",
                        required: true
                    }
                ]
            },
            {
                name: "info",
                type: ApplicationCommandOptionType.Subcommand,
                description: "Get the information from an emoji",
                description_localizations: {
                    fr: "Obtenez les informations d'un emoji",
                },
                options: [
                    {
                        name: "emoji",
                        type: ApplicationCommandOptionType.String,
                        description: "Emoji",
                        required: true
                    }
                ]
            },
            {
                name: "remove",
                name_localizations: {
                    fr: "suppression"
                },
                type: ApplicationCommandOptionType.Subcommand,
                description: "Delete an emoji",
                description_localizations: {
                    fr: "Supprime un emoji",
                },
                options: [
                    {
                        name: "emoji",
                        type: ApplicationCommandOptionType.String,
                        description: "Emoji",
                        required: true
                    }
                ]
            },

        ],
    }
}