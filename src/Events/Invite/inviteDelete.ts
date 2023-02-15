import {SharkClient} from "../../Librairie";
import {Invite} from "discord.js";

export default async function (client: SharkClient, invite: Invite) {

    client.invite.get(invite.guild!.id).delete(invite.code, invite.uses);

};