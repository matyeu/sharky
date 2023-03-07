import { GuildMember } from "discord.js";
import { SharkClient } from "../../Librairie";
import { create as createMember, find as findMember, edit as editMember } from "../../Models/members";
import { create as createEconomy } from "../../Models/economy";
import { create as createLevel } from "../../Models/level";

export default async function (client: SharkClient, newMember: GuildMember) {

  if (newMember.user.bot) return;

  await createMember(newMember.guild.id, newMember.user.id);
  await createEconomy(newMember.guild.id, newMember.user.id);
  await createLevel(newMember.guild.id, newMember.user.id);

  newMember.guild.invites.fetch().then(async newInvite => {

    const oldInvite = client.invite.get(newMember.guild.id);
    const invite = newInvite.find(i => i.uses! > oldInvite.get(i.code));
    const memberInvite = newMember.guild.members.cache.get(invite!.inviter!.id)!;

    const memberConfig: any = await findMember(memberInvite.guild!.id, memberInvite.id);

    memberConfig.invitations.inviteUser++;
    await editMember(memberInvite.guild.id, memberInvite.id, memberConfig);


  });
}