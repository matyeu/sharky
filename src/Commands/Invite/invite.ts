import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder } from "discord.js";
import { EMBED_GENERAL, FOOTER } from "../../config";
import { SharkClient } from "../../Librairie";
import { find } from "../../Models/members";

export default async function (client: SharkClient, interaction: CommandInteraction, language: any) {

    const memberOption: any = interaction.options.get("user", false);
    const memberReplace = memberOption ? memberOption.value.replace("<@", "").replace(">", "") : interaction.user.id
    const member = await interaction.guild!.members.cache.get(memberReplace);

    if (!member) return interaction.replyErrorMessage(client, language("MEMBER_NOTFOUND"), true);

    const memberConfig: any = await find(member.guild.id, member.id);
    const memberInvite = memberConfig.invitations

    const embed = new EmbedBuilder()
    .setColor(EMBED_GENERAL)
    .setAuthor({
        name: `${member.displayName}#${member.user.discriminator}`,
        iconURL: member.displayAvatarURL()
    })
    .setDescription(language(member.id === interaction.user.id ? "DESCRIPTION_USER" : "DESCRIPTUON_MEMBER")
    .replace('%user%', `${member.displayName}#${member.user.discriminator}`).replace('%inviteUser%', memberInvite.inviteUser).replace('%inviteBonus%', memberInvite.inviteBonus)
    .replace('%inviteLeave%', memberInvite.inviteLeave) )
    .setTimestamp()
    .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL()});

    return interaction.reply({embeds: [embed]});
}

export const slash = {
  data: {
      name: __filename.slice(__dirname.length + 1, __filename.length - 3),
      description: "Allows you to display the number of prompts for a user.",
      description_localizations: {
        fr: "Permet d'afficher le nombre d'invite d'un utilisateur."
      },
      category: "Invite",
      permissions: ["SendMessages"],
      options: [
          {
            name: "user",
            name_localizations: {
                fr: "utilisateur",
            },
            description: "Mention or ID of the user.",
            description_localizations: {
              fr: "Mention ou ID de l'utilisateur.",
            },
            type: ApplicationCommandOptionType.String,
          },
      ]
  }
};