import {SharkClient} from "../../../Librairie";
import {ActionRowBuilder, ButtonBuilder, ButtonStyle, ButtonInteraction, EmbedBuilder, SelectMenuInteraction, Snowflake} from "discord.js";
import {find, edit} from "../../../Models/embed";
import {EMOJIS, EMBED_INFO, IDLE_BUTTON, EMBED_ERROR} from "../../../config";

export default async function (client: SharkClient, interaction: SelectMenuInteraction, language: any) {

    const embedConfig: any = await find(interaction.guild!.id, interaction.user.id);

    if (!embedConfig) return interaction.replyErrorMessage(client, language("EMBED_DB_NOTFOUND"), true);
    if (embedConfig.userID !== interaction.user.id) return interaction.replyErrorMessage(client, language("ERROR_PERMISSION"), true);

    const embed = embedConfig.embeds[embedConfig.embedEdit - 1];

    if (interaction.values[0] === "timestamp") {
        await interaction.update({content: null})
        embed.timestamp = true;
        await edit(interaction.guild!.id, interaction.user!.id, embedConfig);
        return embedSend(interaction.guild!.id, interaction.user!.id, interaction);
    }

    const embedInfo = new EmbedBuilder()
        .setColor(EMBED_INFO)
        .setDescription(language(interaction.values[0].toUpperCase()).replace('%emoji%', client.getEmoji(EMOJIS.information)).replace('%user%', interaction.user))

    const embedError = new EmbedBuilder()
        .setColor(EMBED_ERROR)

    const replyMessage = await interaction.channel!.send({embeds: [embedInfo]});

    const collector = interaction.channel!.createMessageCollector({
        filter: (message) => message.member === interaction.member,
        time: IDLE_BUTTON
    });

    await interaction.update({content: null}).then(async () => {
        collector.on("collect", async (message: any) => {
            await message.delete();
            switch (interaction.values[0]) {
                case 'color':
                    if (!message.content.includes("#")) {
                        embedError.setDescription(language(`ERROR_COLOR`).replace('%emoji%', client.getEmoji(EMOJIS.error)).replace('%user%', interaction.user))
                        const replyMessageError = await message.channel.send({embeds: [embedError]})
                        setTimeout(() => {
                            replyMessageError.delete()
                        }, 5000);
                    } else {
                        embed.color = message.content;
                        await edit(message.guild!.id, message.member!.id, embedConfig);
                        await embedSend(message.guild!.id, message.member!.id, interaction);
                        return collector.stop()
                    }
                    break;
                case 'author':
                    embed.author.name = message.content;
                    await edit(message.guild!.id, message.member!.id, embedConfig);
                    await embedSend(message.guild!.id, message.member!.id, interaction);
                    return collector.stop()
                    return collector.stop()
                    break;
                case 'picture_author':
                    if (!message.content.includes('http://') && !message.content.includes('https://')) {
                        embedError.setDescription(language(`ERROR_PICTURE`).replace('%emoji%', client.getEmoji(EMOJIS.error)).replace('%user%', interaction.user))
                        const replyMessageError = await message.channel.send({embeds: [embedError]})
                        setTimeout(() => {
                            replyMessageError.delete()
                        }, 5000);
                    } else {
                        embed.author.iconURL = message.content;
                        await edit(message.guild!.id, message.member!.id, embedConfig);
                        await embedSend(message.guild!.id, message.member!.id, interaction);
                        return collector.stop()
                    }
                    break;
                case 'title':
                    embed.title = message.content;
                    await edit(message.guild!.id, message.member!.id, embedConfig);
                    await embedSend(message.guild!.id, message.member!.id, interaction);
                    return collector.stop()
                    break;
                case 'url':
                    if (!message.content.includes('http://') && !message.content.includes('https://')) {
                        embedError.setDescription(language(`ERROR_URL`).replace('%emoji%', client.getEmoji(EMOJIS.error)).replace('%user%', interaction.user))
                        const replyMessageError = await message.channel.send({embeds: [embedError]})
                        setTimeout(() => {
                            replyMessageError.delete()
                        }, 5000);
                    } else {
                        embed.url = message.content;
                        await edit(message.guild!.id, message.member!.id, embedConfig);
                        await embedSend(message.guild!.id, message.member!.id, interaction);
                        return collector.stop()
                    }
                    break;
                case 'description':
                    if (message.content.length >= 4096) {
                        embedError.setDescription(language(`ERROR_DESCRIPTION`).replace('%emoji%', client.getEmoji(EMOJIS.error)).replace('%user%', interaction.user))
                        const replyMessageError = await message.channel.send({embeds: [embedError]})
                        setTimeout(() => {
                            replyMessageError.delete()
                        }, 5000);
                    } else {
                        embed.description = message.content;
                        await edit(message.guild!.id, message.member!.id, embedConfig);
                        await embedSend(message.guild!.id, message.member!.id, interaction);
                        return collector.stop()
                    }
                    break;
                case 'thumbail':
                    if (!message.content.includes('http://') && !message.content.includes('https://')) {
                        embedError.setDescription(language(`ERROR_PICTURE`).replace('%emoji%', client.getEmoji(EMOJIS.error)).replace('%user%', interaction.user))
                        const replyMessageError = await message.channel.send({embeds: [embedError]})
                        setTimeout(() => {
                            replyMessageError.delete()
                        }, 5000);
                    } else {
                        embed.thumbail = message.content;
                        await edit(message.guild!.id, message.member!.id, embedConfig);
                        await embedSend(message.guild!.id, message.member!.id, interaction);
                        return collector.stop()
                    }
                    break;
                case 'add_field':
                    const titleField = message.content;
                    await collector.stop()
                    embedInfo.setDescription(language("ADD_FIELD_DESCRIPTION").replace('%emoji%', client.getEmoji(EMOJIS.information)).replace('%user%', interaction.user))
                    const descriptionMessage = await interaction.channel!.send({embeds: [embedInfo]});
                    const collector2 = interaction.channel!.createMessageCollector({
                        filter: (messageDescription) => messageDescription.member === interaction.member,
                        time: IDLE_BUTTON
                    });

                    collector2.on("collect", async (message2) => {
                        const descriptionField = message2.content;
                        await collector2.stop();
                        embedInfo.setDescription(language("ADD_FIELD_INLINE").replace('%emoji%', client.getEmoji(EMOJIS.information)).replace('%user%', interaction.user))

                        const buttons = new ActionRowBuilder<ButtonBuilder>()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("yesInline")
                                    .setLabel(language("YES"))
                                    .setStyle(ButtonStyle.Primary)
                            )
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("noInline")
                                    .setLabel(language("NO"))
                                    .setStyle(ButtonStyle.Danger)
                            )

                        const inlineMessage = await interaction.channel!.send({embeds: [embedInfo], components: [buttons]});

                        const collector3 = inlineMessage.createMessageComponentCollector({
                            filter: () => true,
                            time: IDLE_BUTTON
                        });

                        collector3.on("collect", async (choice: ButtonInteraction) => {
                            await embed.addField.push({
                                name: titleField,
                                value: descriptionField,
                                inline: choice.customId === "yesInline" ? true : false
                            })
                            await edit(message.guild!.id, message.member!.id, embedConfig);
                            await embedSend(message.guild!.id, message.member!.id, interaction);
                            return collector3.stop();
                        })

                        collector3.on('end', () => {
                            inlineMessage.delete();
                        })
                    });

                    collector2.on('end', () => {
                        descriptionMessage.delete();
                    })

                    break;
                case 'remove_field':
                    if (isNaN(message.content)) {
                        embedError.setDescription(language(`ERROR_FIELD`).replace('%emoji%', client.getEmoji(EMOJIS.error)).replace('%user%', interaction.user))
                        const replyMessageError = await message.channel.send({embeds: [embedError]})
                        setTimeout(() => {
                            replyMessageError.delete()
                        }, 5000);
                    } else {
                        await embed.addField.splice(parseInt(message.content) - 1, 1);
                        await edit(message.guild!.id, message.member!.id, embedConfig);
                        await embedSend(message.guild!.id, message.member!.id, interaction);
                        return collector.stop()
                    }
                    break;
                case 'picture':
                    if (!message.content.includes('http://') && !message.content.includes('https://')) {
                        embedError.setDescription(language(`ERROR_PICTURE`).replace('%emoji%', client.getEmoji(EMOJIS.error)).replace('%user%', interaction.user))
                        const replyMessageError = await message.channel.send({embeds: [embedError]})
                        setTimeout(() => {
                            replyMessageError.delete()
                        }, 5000);
                    } else {
                        embed.picture = message.content;
                        await edit(message.guild!.id, message.member!.id, embedConfig);
                        await embedSend(message.guild!.id, message.member!.id, interaction);
                        return collector.stop()
                    }
                    break;
                case 'footer':
                    embed.footer.text = message.content;
                    await edit(message.guild!.id, message.member!.id, embedConfig);
                    await embedSend(message.guild!.id, message.member!.id, interaction);
                    return collector.stop()
                    break;
                case 'picture_footer':
                    if (!message.content.includes('http://') && !message.content.includes('https://')) {
                        embedError.setDescription(language(`ERROR_PICTURE`).replace('%emoji%', client.getEmoji(EMOJIS.error)).replace('%user%', interaction.user))
                        const replyMessageError = await message.channel.send({embeds: [embedError]})
                        setTimeout(() => {
                            replyMessageError.delete()
                        }, 5000);
                    } else {
                        embed.footer.iconURL = message.content;
                        await edit(message.guild!.id, message.member!.id, embedConfig);
                        await embedSend(message.guild!.id, message.member!.id, interaction);
                        return collector.stop()
                    }
                    break;
                default:
                    return interaction.replyErrorMessage(client, language("DEFAULT"), true)
            }


        });
    })
    collector.on('end', async () => {
        await replyMessage.delete()
    })

}

export const select = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        filepath: "Interactions/Selectmenus/Embed/selectEditEmbedData",
    }
}
export async function embedSend(guild: Snowflake, member: Snowflake, inter: SelectMenuInteraction) {
    const embedConfig: any = await find(guild, member);

    const embedEnd = new EmbedBuilder()

    for (const embed of embedConfig.embeds) {
        embedEnd.setColor(embed.color ? embed.color : null)
            .setThumbnail(embed.thumbail ? embed.thumbail : null)
            .setAuthor({
                name: embed.author.name ? embed.author.name : null,
                iconURL: embed.author.iconURL ? embed.author.iconURL : null
            })
            .setTitle(embed.title ? embed.title : null)
            .setURL(embed.url ? embed.url : null)
            .setDescription(embed.description ? embed.description : "\u200b")
            .setImage(embed.picture ? embed.picture : null)
            .setFooter({
                text: embed.footer.text ? embed.footer.text : null,
                iconURL: embed.footer.iconURL ? embed.footer.iconURL : null
            })
        if (embed.timestamp) embedEnd.setTimestamp()

        for (const field of embed.addField) {
            if (field.length <= 0) return;

            embedEnd.addFields({name: field.name, value: field.value, inline: field.inline})
        }
    }


    return inter.editReply({embeds: [embedEnd]});
}