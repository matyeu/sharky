import {SharkClient} from "../../Librairie";
import {ApplicationCommandOptionType, CommandInteraction, EmbedBuilder} from "discord.js";
import {EMBED_GENERAL, FOOTER,} from "../../config";

export default async function (client: SharkClient, interaction: CommandInteraction, language: any) {

    const memberOption: any = interaction.options.get("user", false);
    const memberReplace = memberOption ? memberOption.value.replace("<@", "").replace(">", "") : interaction.user.id
    const member = await interaction.guild!.members.cache.get(memberReplace);

    if (!member) return interaction.replyErrorMessage(client, language("MEMBER_NOTFOUND"), true);

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
        description_localizations: {
            fr: "Affiche l'avatar d'un membre",
        },
        category: "Général",
        permissions: ["SendMessages"],
        options: [
            {
                name: "user",
                name_localizations: {
                    fr: "utilisateur"
                },
                type: ApplicationCommandOptionType.String,
                description: "Mention or ID of the user.",
                description_localizations: {
                    fr: "Mention ou ID de l'utilisateur.",
                },
                required: false,
            }

        ],
    }
}