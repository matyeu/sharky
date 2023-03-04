import { ActionRowBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle, ButtonInteraction, CommandInteraction, EmbedBuilder } from "discord.js";
import { EMBED_CLOSE, EMBED_ERROR, EMBED_INFO, FOOTER_MODERATION, IDLE_BUTTON } from "../../config";
import { SharkClient, dateDay } from "../../Librairie";
import { find } from "../../Models/guild";

const Logger = require("../../Librairie/logger");

export default async function (client: SharkClient, interaction: CommandInteraction, language: any) {

    const serverConfig: any = await find(interaction.guild!.id);

    const userOption = interaction.options.get("user", true).value as string;
    const userReplace = userOption!.replace("<@", "").replace(">", "");
    const memberKick = await interaction.guild?.members.cache.get(userReplace.replace(/ /g, ""));
    let memberStaff = await interaction.guild?.members.fetch(interaction.user.id)!;
    const reason = interaction.options.get("reason", true).value as string;

    if (!memberKick) return interaction.replyErrorMessage(client, language("MEMBER_NOTFOUND"), true);

    if (memberStaff.roles.highest.comparePositionTo(memberKick.roles.highest) <= 0) 
    return interaction.replyErrorMessage(client, language("ERROR_HIGHEST"), true);


    const embed = new EmbedBuilder()
    .setColor(EMBED_ERROR)
    .setAuthor({
        name: `${memberStaff.displayName}#${memberStaff.user.discriminator}`,
        iconURL: memberStaff.user.displayAvatarURL()
    })
    .setTitle(`Kick`)
    .setDescription(language("DESCRIPTION_EMBED").replace('%staff%', interaction.user).replace('%user%', memberKick).replace('%reason%', reason))
    .addFields(
        {
            name: language("ADDFIELD_MEMBER"),
            value: `${memberKick} (${memberKick.user.id})`,
            inline: true
        },
        {
            name: language("ADDFIELD_DATE"),
            value: dateDay(),
            inline: true
        })
    .setTimestamp()
    .setFooter({text: FOOTER_MODERATION, iconURL: interaction.guild!.iconURL()!});

    const buttons = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`kick`)
                .setEmoji("⚡")
                .setLabel("Kick")
                .setStyle(ButtonStyle.Danger))
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`cancelKick`)
                .setLabel("Cancel")
                .setStyle(ButtonStyle.Primary)
        );

    const replyMessage = await interaction.reply({embeds: [embed], components: [buttons], fetchReply: true});
    const collector = replyMessage.createMessageComponentCollector({filter: () => true, idle: IDLE_BUTTON});

    collector.on("collect", async (inter: ButtonInteraction) => {
      memberStaff = await inter.guild!.members.fetch(inter.user.id);

      if (!memberStaff.permissions.has(["KickMembers"]))
      return inter.replyErrorMessage(client, language("ERROR_PERMISSION"), true);

      if (inter.customId === "cancelKick") {
        const buttonEnd = new ActionRowBuilder<ButtonBuilder>()
          .addComponents(
              new ButtonBuilder()
                  .setCustomId(`buttonCancel`)
                  .setDisabled(true)
                  .setLabel(language("COMMAND_CANCEL"))
                  .setStyle(ButtonStyle.Secondary))

      return inter.update({components: [buttonEnd]});
      }

      serverConfig.sanctionsCase++
      await serverConfig.save();

      if (serverConfig.modules.sanctions) {
        const embedMod = new EmbedBuilder()
                .setColor(EMBED_CLOSE)
                .setAuthor({
                    name: `${memberStaff.displayName}#${memberStaff.user.discriminator}`,
                    iconURL: memberStaff.displayAvatarURL()
                })
               .setDescription(language("DESCRIPTION_MODLOG").replace('%user%', `${memberKick.displayName}#${memberKick.user.discriminator}`).replace('%userId%', memberKick.id).replace('%reason%', reason))
                .setTimestamp()
                .setFooter({text: language("CASE").replace('%number%', serverConfig.sanctionsCase)})
                await client.getChannel(inter.guild!, serverConfig.channels.logs.modLog, {embeds: [embedMod]});
      }

      await embed.setDescription(language("NEW_DESCRIPTION_EMBED").replace('%staff%', interaction.user).replace('%user%', memberKick).replace('%reason%', reason))

      try {
        const embedUser = new EmbedBuilder()
        .setColor(EMBED_INFO)
        .setTitle(language("TITLE_EMBEDUSER").replace('%client%', client.user!.username))
        .setDescription(language("DESCRIPTION_EMBEDUSER").replace('%server%', interaction.guild!.name).replace('%reason%', reason))
        .setTimestamp()
        .setFooter({text: FOOTER_MODERATION, iconURL: interaction.client.user?.displayAvatarURL()});

        const buttonInfo = new ActionRowBuilder<ButtonBuilder>()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`buttonInfo`)
                            .setDisabled(true)
                            .setLabel(language("LABEL_BUTTON_USER").replace('%user%',`${memberKick.displayName}#${memberKick.user.discriminator}`))
                            .setStyle(ButtonStyle.Secondary))

        await memberKick.send({embeds: [embedUser]});
        await memberKick.kick(`${reason}`);
        await inter.update({embeds: [embed], components: [buttonInfo]});

      }
      catch (err: any) {
        if (err.message.match("Cannot send messages to this user")) {
          const buttonInfo = new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`buttonInfo`)
                                .setDisabled(true)
                                .setLabel(language("LABEL_BUTTON_SERVER").replace('%user%', `${memberKick.displayName}#${memberKick.user.discriminator}`))
                                .setStyle(ButtonStyle.Secondary));

          await Logger.warn(`${memberKick.user.tag} blocks his private messages, so he did not receive the reason for his kick.`);
          await memberKick.kick(`${reason}`);
          return inter.update({embeds: [embed], components: [buttonInfo]})
        };

        return Logger.error(err);
      }

    
    });

    collector.on('end', _ => {
      const buttonEnd = new ActionRowBuilder<ButtonBuilder>()
          .addComponents(
              new ButtonBuilder()
                  .setCustomId(`buttonEnd`)
                  .setDisabled(true)
                  .setLabel(language("COLLECTOR_END"))
                  .setStyle(ButtonStyle.Secondary))

      replyMessage.edit({components: [buttonEnd]});
  });


}

export const slash = {
  data: {
      name: __filename.slice(__dirname.length + 1, __filename.length - 3),
      description: "Kick a server user.",
      description_localizations: {
          fr: "Kick un utilisateur du serveur."
      },
      category: "Modération",
      cooldown: 1,
      permissions: ["KickMembers"],
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
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "reason",
            name_localizations: {
              fr: "raison"
            },
            description: "Reason of kick.",
            description_localizations: {
              fr: "Raison du kick."
            },
            type: ApplicationCommandOptionType.String,
            required: true
        },

    ],
  }
}