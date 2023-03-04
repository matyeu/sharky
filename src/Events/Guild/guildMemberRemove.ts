import { GuildMember } from "discord.js";
import { SharkClient } from "../../Librairie";
import { find as findMember, edit as editMember } from "../../Models/members";
import { find as findEconomy } from "../../Models/economy";

export default async function (client: SharkClient, oldMember: GuildMember) {

  if (oldMember.user.bot) return;

  const memberConfig: any = await findMember(oldMember.guild!.id, oldMember.id);
  const economyConfig: any = await findEconomy(oldMember.guild!.id, oldMember.id);

  if (memberConfig) memberConfig.delete();
  if (economyConfig) economyConfig.delete();

  oldMember.guild.invites.fetch().then(async newInvite => {

    const oldInvite = client.invite.get(oldMember.guild.id);
    const invite = newInvite.find(i => i.uses! > oldInvite.get(i.code));
    const memberInvite = oldMember.guild.members.cache.get(invite!.inviter!.id)!;

    const memberConfig: any = await findMember(memberInvite.guild!.id, memberInvite.id);

    memberConfig.invitations.inviteLeave++;
    await editMember(memberInvite.guild.id, memberInvite.id, memberConfig);
  });
}