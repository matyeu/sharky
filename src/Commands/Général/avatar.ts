import {SharkClient} from "../../Librairie";
import {ApplicationCommandOptionType, CommandInteraction, EmbedBuilder} from "discord.js";
import {EMBED_GENERAL, FOOTER,} from "../../config";

export default async function (client: SharkClient, interaction: CommandInteraction, language: any) {

    const memberOption: any = interaction.options.get("user", false);
    const memberReplace = memberOption ? memberOption.value.replace("<@", "").replace(">", "") : interaction.user
    const member = await interaction.guild!.members.fetch(memberReplace);

    const embed = new EmbedBuilder()
        .setColor(EMBED_GENERAL)
        .setDescription(language("DESCRIPTION").replace('%user%', `${member.displayName} (${member.id})`))
        .setImage(member.displayAvatarURL({size: 512}))
        .setTimestamp()
        .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL()})


    return interaction.reply({embeds: [embed]})


}

export const slash = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        description: "Display the avatar of a member",
        category: "Général",
        permissions: ["SendMessages"],
        options: [
            {
                name: "user",
                type: ApplicationCommandOptionType.String,
                description: "Mention ou ID de l'utilisateur.",
                required: false,
            }

        ],
    }
}