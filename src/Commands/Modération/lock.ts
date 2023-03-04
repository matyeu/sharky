import {ApplicationCommandOptionType, CommandInteraction, TextChannel} from "discord.js";
import { EMOJIS } from "../../config";
import {SharkClient} from "../../Librairie";

export default async function (client: SharkClient, interaction: CommandInteraction, language: any) {

    const channelLock = client.getEmoji(EMOJIS.channelLock),
    channelUnlock = client.getEmoji(EMOJIS.channel);

    let channel = <TextChannel>interaction.channel!;
    let state = interaction.options.get("state", true).value;
    let everyone = channel.guild.roles.everyone;

    if (state === 1) {
        await channel.permissionOverwrites.edit(everyone.id, {SendMessages: false})

        await interaction.replySuccessMessage(client,language("CHANNEL_LOCK"), true);
        return interaction.channel?.send({content: language("MESSAGE_LOCK").replace('%emoji%', channelLock)});

    } else {
        await channel.permissionOverwrites.edit(everyone.id, {SendMessages: null})

       await interaction.replySuccessMessage(client,language("CHANNEL_UNLOCK"), true);
        return interaction.channel?.send({content: language("MESSAGE_UNLOCK").replace('%emoji%', channelUnlock)});
    }
}

export const slash = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        description: "Lock or unlock a channel.",
        description_localizations: {
            fr: "Lock ou unlock un channel."
        },
        category: "Modération",
        cooldown: 1,
        permissions: ["ManageMessages"],
        options: [
            {
                name: "state",
                name_localizations: {
                    fr: "état"
                },
                type: ApplicationCommandOptionType.Number,
                description: "Indiquer le nouveau état du channel.",
                required: true,
                choices: [
                    {name: "Verrouiller", value: 1},
                    {name: "Déverrouiller", value: 0}
                ],
            }],
    }
}