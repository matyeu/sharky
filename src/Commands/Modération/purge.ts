import { ApplicationCommandOptionType, CommandInteraction, TextChannel } from "discord.js";
import { SharkClient } from "../../Librairie";

export default async function (client: SharkClient, interaction: CommandInteraction, language: any) {

    //@ts-ignore
    switch (interaction.options.getSubcommand()) {
        case 'messages':
            const channelTextMessages = interaction.channel! as TextChannel;
            const argsNumberMessages = interaction.options.get("number", true).value as number;

            if (isNaN(argsNumberMessages) || argsNumberMessages < 1 || argsNumberMessages > 100)
                return interaction.replyErrorMessage(client, language("NUMBER_BETWEEN"), true);

            const messagesToDelete = await channelTextMessages.messages.fetch({
                limit: Math.min(argsNumberMessages, 100), before: interaction.id
            });

            channelTextMessages.bulkDelete(messagesToDelete)
                .then(async () => {
                    await interaction.replySuccessMessage(client, language("MESSAGE_DELETE_SIZE").replace('%messageDelete%', messagesToDelete.size), true);
                }).catch((err: Error) => {
                    if (err.message.match("You can only bulk delete messages that are under 14 days old")) {
                        interaction.replyErrorMessage(client, language("BULK_DELETE"), true)
                    } else {
                        console.error(err);
                        interaction.replyErrorMessage(client, language("ERROR_DELETE"), true);
                    }
                });

            break;
        case 'user':
            const argNumber = interaction.options.get("number", true).value as number;
            const channelTextUser = interaction.channel as TextChannel;
            const user = interaction.options.getUser("user", true);
            const member = await interaction.guild!.members.cache.get(user.id);

            if (isNaN(argNumber) || argNumber < 1 || argNumber > 100)
                return interaction.replyErrorMessage(client, language("NUMBER_BETWEEN"), true);

            const messagesOfUser: any = (
                // @ts-ignore
                await interaction.channel!.messages.fetch({ limit: 100, before: interaction.id })).filter((a) => a.author.id === user.id);

            messagesOfUser.length = Math.min(argNumber, messagesOfUser.length);
            if (messagesOfUser.length === 0 || !user)
                return interaction.replyInfoMessage(client, language("NO_MESSAGE_DELETE"), true);

            if (messagesOfUser.length === 1) await messagesOfUser[1].delete();
            else await channelTextUser.bulkDelete(messagesOfUser).then(async () => {
                await interaction.replySuccessMessage(client, language("MESSAGE_DELETE_USER")
                    .replace('%user%', `${member?.displayName}#${member?.user.discriminator}`), true);
            }).catch((err: Error) => {
                if (err.message.match("You can only bulk delete messages that are under 14 days old")) {
                    interaction.replyErrorMessage(client, language("BULK_DELETE"), true)
                } else {
                    console.error(err);
                    interaction.replyErrorMessage(client, language("ERROR_DELETE"), true);
                }
            });

            break;
        default:
            //@ts-ignore
            return interaction.replyErrorMessage(client, language("DEFAULT").replace('%subcommand%', interaction.options.getSubcommand()), true);
    };
}

export const slash = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        description: "Purge messages.",
        category: "Modération",
        permissions: ["ManageMessages"],
        cooldown: 1,
        options: [
            {
                name: "messages",
                description: "Delete messages from a channel",
                description_localizations: {
                    fr: "Supprimer les messages d'un salon."
                },
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "number",
                        name_localizations: {
                            fr: "nombre"
                        },
                        description: "Number of messages.",
                        description_localizations: {
                            fr: "Nombre de messages."
                        },
                        type: ApplicationCommandOptionType.Number,
                        required: true,
                    },
                ],
            },
            {
                name: "utilisateur",
                description: "Purge les messages d'un seul utilisateur.",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "user",
                        name_localizations: {
                            fr: "utilisateur"
                        },
                        description: "Mention or ID of the user.",
                        description_localizations: {
                            fr: "Mention ou ID de l'utilisateur.",
                        },
                        type: ApplicationCommandOptionType.User,
                        required: true,
                    },
                    {
                        name: "number",
                        name_localizations: {
                            fr: "nombre"
                        },
                        description: "Number of messages.",
                        description_localizations: {
                            fr: "Nombre de messages."
                        },
                        type: ApplicationCommandOptionType.Number,
                        required: true,
                    },
                ],
            },
        ],
    },
};