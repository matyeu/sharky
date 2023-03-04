import { ActionRowBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonInteraction, ButtonStyle, CommandInteraction, EmbedBuilder, Message, TextChannel } from "discord.js";
import { dateDay, SharkClient } from "../../Librairie";
import { find as findGuild } from "../../Models/guild";
import { create as createBan, find as findBan } from "../../Models/ban";
import { EMBED_CLOSE, EMBED_ERROR, EMBED_INFO, EMBED_SUCCESS, FOOTER_MODERATION, IDLE_BUTTON } from "../../config";

const Logger = require("../../Librairie/logger");

export default async function ( client: SharkClient, interaction: CommandInteraction, language: any) {

  const serverConfig: any = await findGuild(interaction.guild!.id);

  const userOption = interaction.options.get("user", true).value as string;
  const userReplace = userOption!.replace("<@", "").replace(">", "");
  const reason = interaction.options.get("reason", true).value as string;

  const memberClient = await client.users.fetch(userReplace.replace(/ /g, "")).catch((err: any) => {
    if (!err.message.match("Invalid Form Body")) return Logger.error(err);
   });

  const memberGuild = await interaction.guild?.members.cache.get(userReplace.replace(/ /g, ""))!;

  const bans = await interaction.guild!.bans.fetch();
  const memberUnban = bans.get(userReplace.replace(/ /g, ""))!;

  let memberStaff = interaction.guild?.members.cache.get(interaction.user.id)!;

  if (!memberClient && !memberGuild && !memberUnban) return interaction.replyErrorMessage(client, language("MEMBER_NOTFOUND"), true);

 if (memberGuild && memberStaff.roles.highest.comparePositionTo(memberGuild.roles.highest) <= 0) 
  return interaction.replyErrorMessage(client,language("ERROR_HIGHEST"), true);

  const embed = new EmbedBuilder()
  .setColor(!memberUnban ? EMBED_ERROR : EMBED_SUCCESS)
  .setAuthor({
      name: `${memberStaff.displayName}#${memberStaff.user.discriminator}`,
      iconURL: memberStaff.user.displayAvatarURL()
  })
  .setTitle(`${!memberUnban ? language("BAN") : language("UNBAN")}`)
  .setDescription(language("DESCRIPTION_EMBED").replace('%staff%', interaction.user).replace('%action%',!memberUnban ? language("BAN").toLowerCase() : language("UNBAN").toLowerCase()).replace('%reason%', reason)
  .replace('%user%', !memberUnban ? `${memberGuild ? `${memberGuild.displayName}#${memberGuild.user.discriminator}` : language("A_USER").replace('%userId%', userOption)}` : memberUnban.user.tag))
  .addFields(
      {
          name: language("ADDFIELD_MEMBER"),
          value: !memberUnban ? `${memberGuild ? `${memberGuild.displayName}#${memberGuild.user.discriminator} (${memberGuild.user.id})`
          : language("A_USER").replace('%userId%', userOption)}` : `${memberUnban.user.tag} (${memberUnban.user.id})`,
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
                .setCustomId(!memberUnban ? language("BAN").toLowerCase() : language("UNBAN").toLowerCase())
                .setEmoji(!memberUnban ? "⚡" : "✅")
                .setLabel(!memberUnban ? language("BAN") : language("UNBAN"))
                .setStyle(!memberUnban ? ButtonStyle.Danger : ButtonStyle.Success))

        .addComponents(
            new ButtonBuilder()
            .setCustomId(`cancelBan`)
            .setLabel("Cancel")
            .setStyle(!memberUnban ? ButtonStyle.Primary : ButtonStyle.Danger)
        );

      const replyMessage = await interaction.reply({embeds: [embed], components: [buttons], fetchReply: true});
      const collector = replyMessage.createMessageComponentCollector({filter: () => true, idle: IDLE_BUTTON});

      collector.on("collect", async (inter: ButtonInteraction) => {
        memberStaff = await inter.guild!.members.fetch(inter.user.id);

        if (!memberStaff.permissions.has(["BanMembers"]))
        return inter.replyErrorMessage(client, language("ERROR_PERMISSION"), true);

        if (inter.customId === "cancelBan") {
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

        const embedMod = new EmbedBuilder()

        if (serverConfig.modules.sanctions) {
              embedMod.setColor(EMBED_CLOSE)
              .setAuthor({
                      name: `${memberStaff.displayName}#${memberStaff.user.discriminator}`,
                      iconURL: memberStaff.displayAvatarURL()
                  })
                .setDescription(language("DESCRIPTION_MODLOG")
                .replace('%user%', !memberUnban ? `${memberGuild ? `${memberGuild.displayName}#${memberGuild.user.discriminator}` : language("A_USER").replace('%userId%', userOption)}` : memberUnban.user.tag)
                .replace('%action%', !memberUnban ? language("BAN") : language("UNBAN")).replace('%userId%', userReplace).replace('%reason%', reason))
               .setFooter({text: language("CASE").replace('%number%', serverConfig.sanctionsCase)})
        }

        if (inter.customId.split(':')[0] === "ban") {
          const channelPublic = <TextChannel>interaction.guild!.channels.cache.find(channelPublic => channelPublic.id === serverConfig.channels.logs.modLog);
          let reference: string = "";

          if (channelPublic && serverConfig.modules.sanctions) 
          await channelPublic.send({embeds: [embedMod]}).then(async (message: Message) => {reference = message.id});
          await createBan(interaction.guild!.id, userReplace, interaction.user.id, reason, Date.now(), reference, serverConfig.sanctionsCase);

          if (memberGuild) {
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
                    .setLabel(language("LABEL_BUTTON_USER").replace('%user%', !memberUnban ? `${memberGuild ? `${memberGuild.displayName}#${memberGuild.user.discriminator}` : language("A_USER").replace('%userId%', userOption)}` : memberUnban.user.tag))
                    .setStyle(ButtonStyle.Secondary))

            await memberGuild.send({embeds: [embedUser]});
            await interaction.guild!.bans.create(memberGuild ? memberGuild.id : userReplace, {reason, deleteMessageSeconds: 604800});    
            return inter.update({embeds: [embed], components: [buttonInfo]});

          }
          catch(err: any) {
            if (err.message.match("Cannot send messages to this user")) {
              const buttonInfo = new ActionRowBuilder<ButtonBuilder>()
              .addComponents(
                  new ButtonBuilder()
                      .setCustomId(`buttonInfo`)
                      .setDisabled(true)
                      .setLabel(language("LABEL_BUTTON_USER").replace('%user%', !memberUnban ? `${memberGuild ? `${memberGuild.displayName}#${memberGuild.user.discriminator}` : language("A_USER").replace('%userId%', userOption)}` : memberUnban.user.tag))
                      .setStyle(ButtonStyle.Secondary))

              await Logger.warn(`${memberGuild ? memberGuild.user.tag : "User"} blocks his private messages, so he did not receive the reason for his warn.`);
              await interaction.guild!.bans.create(userReplace, {reason, deleteMessageSeconds: 604800});
              return inter.update({embeds: [embed], components: [buttonInfo]});
          }

          return Logger.error(err);
          }
        } else {
          const buttonInfo = new ActionRowBuilder<ButtonBuilder>()
          .addComponents(
              new ButtonBuilder()
                  .setCustomId(`buttonInfo`)
                  .setDisabled(true)
                  .setLabel(language("LABEL_BUTTON_UNBAN").replace('%user%', language("A_USER").replace('%userId%', userReplace)))
                  .setStyle(ButtonStyle.Secondary))

          await interaction.guild!.bans.create(userReplace, {reason, deleteMessageSeconds: 604800});    
          return inter.update({embeds: [embed], components: [buttonInfo]});
        }

        }
        else {
          const buttonInfo = new ActionRowBuilder<ButtonBuilder>()
          .addComponents(
              new ButtonBuilder()
                  .setCustomId(`buttonInfo`)
                  .setDisabled(true)
                  .setLabel(language("LABEL_BUTTON_UNBAN").replace('%user%', memberUnban.user.tag))
                  .setStyle(ButtonStyle.Secondary))

          await client.getChannel(inter.guild!, serverConfig.channels.logs.modLog, {embeds: [embedMod]});
          await interaction.guild!.bans.remove(memberUnban.user.id, reason).then(async () => {
            const banConfig: any = await findBan(inter.guild!.id, memberUnban.user.id);
            if (banConfig) await banConfig.delete();
        });
         return inter.update({embeds: [embed], components: [buttonInfo]});

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
    description: "Ban a server user.",
    description_localizations: {
      fr: "Ban un utilisateur du serveur.",
    },
    category: "Modération",
    cooldown: 1,
    permissions: ["BanMembers"],
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
        required: true,
      },
      {
        name: "reason",
        name_localizations: {
          fr: "raison",
        },
        description: "Reason of ban.",
        description_localizations: {
          fr: "Raison du ban.",
        },
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
};
