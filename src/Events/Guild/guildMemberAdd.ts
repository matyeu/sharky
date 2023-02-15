import { GuildMember } from "discord.js";
import { SharkClient } from "../../Librairie";
import { create, find, edit } from "../../Models/members";

export default async function (client: SharkClient, newMember: GuildMember) {

  if (newMember.user.bot) return;

  await create(newMember.guild.id, newMember.user.id);


  newMember.guild.invites.fetch().then(async newInvite => {

    const oldInvite = client.invite.get(newMember.guild.id);
    const invite = newInvite.find(i => i.uses! > oldInvite.get(i.code));
    const memberInvite = newMember.guild.members.cache.get(invite!.inviter!.id)!;

    const memberConfig: any = await find(memberInvite.guild!.id, memberInvite.id);

    memberConfig.invitations.inviteUser++;
    await edit(memberInvite.guild.id, memberInvite.id, memberConfig);


  });
}