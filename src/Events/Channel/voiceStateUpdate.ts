import { VoiceState } from "discord.js";
import { giveCoihs, SharkClient } from "../../Librairie";

export default async function (client: SharkClient, oldMember: VoiceState, newMember: VoiceState) {
    
    setInterval(() => {
        if (!newMember.selfVideo && !newMember.streaming) giveCoihs(client, newMember.guild.id, newMember.id, 300);
        if (newMember.streaming) giveCoihs(client, newMember.guild.id, newMember.id, 400);
        if (newMember.selfVideo) giveCoihs(client, newMember.guild.id, newMember.id, 500);
    }, 900000);

}