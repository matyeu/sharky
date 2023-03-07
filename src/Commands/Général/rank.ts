import { ApplicationCommandOptionType, AttachmentBuilder, CommandInteraction } from "discord.js";
import { SharkClient } from "../../Librairie";
import { find as findGuild } from "../../Models/guild";
import { find as findLevel, progression } from "../../Models/level";
import canvacord from "canvacord";

export default async function (client: SharkClient, interaction: CommandInteraction, language: any) {

    const memberOption: any = interaction.options.get("user", false);
    const memberReplace = memberOption ? memberOption.value.replace("<@", "").replace(">", "") : interaction.user.id
    const member = await interaction.guild!.members.cache.get(memberReplace);

    if (!member) return interaction.replyErrorMessage(client, language("MEMBER_NOTFOUND"), true);

    const serverConfig: any = await findGuild(interaction.guild!.id);
    const levelConfig: any = await findLevel(interaction.guild!.id, interaction.user.id);

    const background = levelConfig.card.background || serverConfig.levels.card;
    const color = levelConfig.card.color || serverConfig.levels.cardColor;

    const progress = progression(levelConfig.community.experience);

    const rankCard = new canvacord.Rank()
        .setAvatar(member.displayAvatarURL())
        .setCurrentXP(progress)
        .setRequiredXP(levelConfig.community.level === 0 ? 50 : 50 * levelConfig.community.level)
        .setStatus(member.presence?.status ? member.presence?.status as any : "offline")
        .setProgressBar(color, "COLOR")
        .setProgressBarTrack("#36393E")
        .setUsername(member.displayName)
        .setDiscriminator(member.user.discriminator)
        .setBackground("IMAGE", background)
        .setLevel(levelConfig.community.level, language("LEVEL"), true)
        .setRank(levelConfig.rank, language("RANK"), true)

        rankCard.build()
        .then(async data => {
            const attachment = new AttachmentBuilder(data, {name: "rankCard.png"});
            await interaction.deferReply()
            return interaction.editReply({files: [attachment]});
        });
}

export const slash = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        description: "Get a user's rank.",
        description_localizations: {
            fr: "Obtenir le rank d'un utilisateur."
        },
        category: "Général",
        permissions: ["SendMessages"],
        options: [
            {
                name: "user",
                name_localizations: {
                    fr: "utilisateur"
                },
                type: ApplicationCommandOptionType.String,
                description: "Mention or ID of the user.",
                description_localizations: {
                    fr: "Mention ou ID de l'utilisateur.",
                },
            }

        ],
    }
}