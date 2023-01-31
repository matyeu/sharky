import {SharkClient} from "../../Librairie";
import {
    ActionRowBuilder,
    ApplicationCommandOptionType,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    CommandInteraction, EmbedBuilder,
    TextChannel
} from "discord.js";
import {EMBED_INFO, EMOJIS, IDLE_BUTTON} from "../../config";

export default async function (client: SharkClient, interaction: CommandInteraction, language: any) {

    const member = await interaction.guild!.members.fetch(interaction.user.id);
    const channel: any = await interaction.guild!.channels.fetch(interaction.channel!.id)!;
    const position = channel.position;
    const topic = channel.topic;

    const embed = new EmbedBuilder()
    .setColor(EMBED_INFO)
    .setDescription(language("DESCRIPTION").replace('%channel%', interaction.channel))

    const buttons = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                    new ButtonBuilder()
                    .setCustomId("change")
                    .setLabel(language("LABEL_CHANGE"))
                    .setStyle(ButtonStyle.Primary)
                    )
            .addComponents(
                    new ButtonBuilder()
                    .setCustomId("cancelNuke")
                    .setLabel(language("LABEL_CANCEL"))
                    .setStyle(ButtonStyle.Danger)
                    )

    const replyMessage = await interaction.reply({embeds: [embed], components: [buttons]});

    const collector = replyMessage.createMessageComponentCollector({filter: () => true, idle: IDLE_BUTTON});
    collector.on('collect', async (inter: ButtonInteraction) => {
        if (!member.permissions.has(["ManageChannels"]))
            return inter.replyErrorMessage(client, language("ERROR_PERMISSION"), true);

        if (inter.customId === "change") {
            const channelNew = await channel.clone();

            await channelNew.setPosition(position);
            await channelNew.setTopic(topic);
            await channel.delete();
        } else {
            await inter.update({content: language("COMMAND_CANCEL").replace('%emoji%', client.getEmoji(EMOJIS.succes)), embeds: [], components: []});
        }
    });
}

export const slash = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        description: "Delete all messages from a channel",
        category: "Modération",
        permissions: ["ManageChannels"],
        cooldown: 1,
    },
};