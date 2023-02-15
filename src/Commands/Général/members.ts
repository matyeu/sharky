import {EmbedBuilder, CommandInteraction} from "discord.js";
import {EMOJIS, FOOTER, EMBED_GENERAL} from "../../config";
import {SharkClient} from "../../Librairie";

export default async function (client: SharkClient, interaction: CommandInteraction, language: any) {

    let onlineMembers: number = 0;
    let offlineMembers: number = 0;
    let dndMembers: number = 0;
    let afkMembers: number = 0;

    const online = client.getEmoji(EMOJIS.online);
    const dnd = client.getEmoji(EMOJIS.dnd);
    const afk = client.getEmoji(EMOJIS.afk);
    const offline = client.getEmoji(EMOJIS.offline);


    interaction.guild?.members.cache.forEach(member => {
        if (member.presence?.status === "online") {
            onlineMembers++;
        } else if (member.presence?.status === "offline") {
            offlineMembers++;
        } else if (member.presence?.status === "dnd") {
            dndMembers++;
        } else if (member.presence?.status === "idle") {
            afkMembers++;
        }
    }
    );
    const embed = new EmbedBuilder()
        .setColor(EMBED_GENERAL)
        .setTitle(language("TITLE").replace('%memberSize%', interaction.guild?.members.cache.size))
        .setThumbnail(<string>interaction.guild?.iconURL())
        .addFields(
                {
                    name: language("ADDFIELD_ONLINE").replace('%emoji%', online),
                    value: language("ADDFIELD_VALUE").replace('%memberSize%', onlineMembers),
                    inline: true
                },

                {
                    name: language("ADDFIELD_DND").replace('%emoji%', dnd),
                    value: language("ADDFIELD_VALUE").replace('%memberSize%', dndMembers),
                    inline: true
                },
                {
                    name: language("ADDFIELD_AFK").replace('%emoji%', afk),
                    value: language("ADDFIELD_VALUE").replace('%memberSize%', afkMembers),
                    inline: true
                },
                {
                    name: language("ADDFIELD_OFFLINE").replace('%emoji%', offline),
                    value: language("ADDFIELD_VALUE").replace('%memberSize%', offlineMembers),
                    inline: true
                },
                )
        .setFooter({
            text: FOOTER, iconURL: interaction.client?.user?.displayAvatarURL()
        })
        .setTimestamp();

    await interaction.reply({embeds: [embed]});
}

export const slash = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        name_localizations: {
          fr: "membres"
        },
        description: "Displays the number of members.",
        description_localizations:{
          fr: "Permet d'afficher le nombre de membres sur le serveur.",
        },
        category: "Général",
        permissions: ["SendMessages"],
    }
}