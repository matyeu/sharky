import {SharkClient} from "../../Librairie";
import {CommandInteraction, EmbedBuilder, TextChannel} from "discord.js";
import {EMBED_INFO, EMOJIS, FOOTER} from "../../config";

export default async function (client: SharkClient, interaction: CommandInteraction, language: any) {

    const channel = <TextChannel>interaction.channel!;
    const everyone = interaction.guild!.roles.everyone;
    await channel.permissionOverwrites.edit(everyone, {SendMessages: false, AddReactions: false});

    await interaction.replySuccessMessage(client, language("SUCCESS_CONTENT"), true);

    const embedIMG = new EmbedBuilder()
        .setColor(EMBED_INFO)
        .setImage("https://i.pinimg.com/originals/98/c7/fa/98c7fa7afe6df8db59aa5ba9e69068a4.gif")
        .setTimestamp()
        .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL()});

    const embed1 = new EmbedBuilder()
        .setColor(EMBED_INFO)
        .setDescription(language("TEXT_1"));

    const embed2 = new EmbedBuilder()
        .setColor(EMBED_INFO)
        .setDescription(language("TEXT_2"));

    const embed3 = new EmbedBuilder()
        .setColor(EMBED_INFO)
        .setDescription(language("TEXT_3"));

    const embed4 = new EmbedBuilder()
        .setColor(EMBED_INFO)
        .setDescription(language("TEXT_4"));

    const embed5 = new EmbedBuilder()
        .setColor(EMBED_INFO)
        .setDescription(language("TEXT_5"));

    const embed6 = new EmbedBuilder()
        .setColor(EMBED_INFO)
        .setDescription(language("TEXT_6").replace('%emoji%', client.getEmoji(EMOJIS.heart)));

    await channel.send({embeds: [embedIMG]});
    const message = await channel.send({embeds: [embed1]});
    setTimeout(() => message.edit({embeds: [embed2]}), 10000);
    setTimeout(() => message.edit({embeds: [embed3]}), 20000);
    setTimeout(() => message.edit({embeds: [embed4]}), 30000);
    setTimeout(() => message.edit({embeds: [embed5]}), 40000);
    setTimeout(() => {
        channel.permissionOverwrites.edit(everyone, {SendMessages: null, AddReactions: null})
        message.edit({embeds: [embed6]})
    }, 60000);
}

export const slash = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        description: "Lock the channel for 1 minute",
        description_localizations: {
            fr: "Lock le channel pour 1 minute",
        },
        category: "Modération",
        permissions: ["ManageChannels"],
        cooldown: 1,
    },
};