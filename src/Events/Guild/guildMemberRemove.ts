import { GuildMember } from "discord.js";
import { SharkClient } from "../../Librairie";
import { find, edit } from "../../Models/members";

export default async function (client: SharkClient, oldMember: GuildMember) {

  if (oldMember.user.bot) return;

  const memberConfig: any = await find(oldMember.guild!.id, oldMember.id);

 if (memberConfig) memberConfig.delete();

  oldMember.guild.invites.fetch().then(async newInvite => {

    const oldInvite = client.invite.get(oldMember.guild.id);
    const invite = newInvite.find(i => i.uses! > oldInvite.get(i.code));
    const memberInvite = oldMember.guild.members.cache.get(invite!.inviter!.id)!;

    const memberConfig: any = await find(memberInvite.guild!.id, memberInvite.id);

    memberConfig.invitations.inviteLeave++;
    await edit(memberInvite.guild.id, memberInvite.id, memberConfig);
  });
}