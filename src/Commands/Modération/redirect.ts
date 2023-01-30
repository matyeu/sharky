import {SharkClient} from "../../Librairie";
import {ApplicationCommandOptionType, CommandInteraction} from "discord.js";

export default async function (client: SharkClient, interaction: CommandInteraction, language: any) {

    const messageId = interaction.options.get("message_id", true).value as any;
    let channelId = interaction.options.get("channel", true).value as any;
    const channel = interaction.guild!.channels.cache.find((channel) => channel.id === channelId)!;

    if (isNaN(messageId)) return interaction.replyErrorMessage(client, language("ERROR_MESSAGE_ID"), true);
    if (channel.type !== 0 && channel.type !== 5) return interaction.replyErrorMessage(client, language("ERROR_CHANNEL"), true);

    const message = await interaction.channel!.messages.cache.get(messageId);
    if (!message) return interaction.replyErrorMessage(client, language("ERROR_MESSAGE").replace('%messageId%', messageId), true);
    if (channel.id === message.channel.id) return interaction.replyErrorMessage(client, language("ERROR_MESSAGE_CHANNEL"), true);

    const files: any = [];

    if (message.attachments.size > 0) {
        const attachments = Array.from(message.attachments.values());
        if (attachments.length > 0) {
            for (const attachment of attachments) {
                files.push(attachment.url);
            }
        }
    }

    message.channel.send(language("MESSAGE_AUTHOR").replace('%user%', message.author).replace('%channel%', channel));
    message.delete().then(() => {
        client.getChannel(message.guild!, channel.id, {
            content: language("MESSAGE_REDIRECT").replace('%user%', `${message.member!.displayName}#${message.author.discriminator}`).replace('%message%', message.content),
            files: files.length > 0 ? files : undefined,
        });
    });

    return interaction.replySuccessMessage(client, language("SUCCESS_REDIRECT"), true);

}

export const slash = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        description: "Redirects a message to another channel",
        category: "Modération",
        permissions: ["ManageMessages"],
        cooldown: 1,
        options: [
            {
                name: "message_id",
                description: "The ID of the message to redirect",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: "channel",
                description: "The lounge where to send the message",
                type: ApplicationCommandOptionType.Channel,
                required: true,
            },
        ],
    },
};