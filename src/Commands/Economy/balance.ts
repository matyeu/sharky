import {SharkClient} from "../../Librairie";
import {CommandInteraction, EmbedBuilder, ApplicationCommandOptionType} from "discord.js";
import {find, edit} from "../../Models/economy";
import {EMBED_GENERAL, EMOJIS, FOOTER} from "../../config";

export default async function (client: SharkClient, interaction: CommandInteraction, language: any) {

    const money = client.getEmoji(EMOJIS.money);
    const authorConfig: any = await find(interaction.guild!.id, interaction.user.id);

    //@ts-ignore
    switch (interaction.options.getSubcommand(false)) {
        case 'user':
            const memberOption: any = interaction.options.get("user", false)!;
            const memberReplace = memberOption ? memberOption.value.replace("<@", "").replace(">", "") : interaction.user.id
            const member = await interaction.guild!.members.cache.get(memberReplace);

            if (!member) return interaction.replyErrorMessage(client, language("MEMBER_NOTFOUND"), true);

            const memberConfig: any = await find(member.guild!.id, member.user.id);
            const transfer: any = interaction.options.get("transfer", false);

            if (!transfer) {
                const bank = client.getEmoji(EMOJIS.bank);
                const salary = client.getEmoji(EMOJIS.salary);

                const embed = new EmbedBuilder()
                .setColor(EMBED_GENERAL)
                .setAuthor({
                    name: language("AUTHOR").replace('%user%',`${member.displayName}#${member.user.discriminator}`),
                    iconURL: member.displayAvatarURL()
                })
                .addFields(
                        {name: language("MONEY"), value: `${money} ${memberConfig.money}`, inline: true},
                        {name: language("BANK"), value: `${bank} ${memberConfig.bank}`, inline: true},
                        {name: "Total", value: `${salary} ${memberConfig.money + memberConfig.bank}`, inline: true})
                .setTimestamp()
                .setFooter({text: FOOTER, iconURL: client.user!.displayAvatarURL()})
                return interaction.reply({embeds: [embed]})

            } else {
                if (member.id === interaction.user!.id) return interaction.replyErrorMessage(client, language("ERROR_YOURSELF"), true);
                if (transfer.value > authorConfig.money + authorConfig.bank) return interaction.replyErrorMessage(client, language("ERROR_AMOUNT"), true);

                transfer.value > authorConfig.money ? authorConfig.bank -= transfer.value : authorConfig.money -= transfer.value;
                memberConfig.money += transfer.value;
                await edit(interaction.guild!.id, interaction.user.id, authorConfig);
                await edit(member.guild!.id, member.user.id, memberConfig);

                return interaction.replySuccessMessage(client, language("TRANSFER_SUCCESS")
                .replace('%amount%', transfer.value).replace('%emoji%', money).replace('%user%', member), false);
            }
            break;
        case 'add':
            const montantAdd = interaction.options.get("montant", true).value as number;

            if (montantAdd > authorConfig.money) return interaction.replyErrorMessage(client, language("ERROR_AMOUNT"), true);

            authorConfig.bank += montantAdd;
            authorConfig.money -= montantAdd;
            await edit(interaction.guild!.id, interaction.user.id, authorConfig);

            return interaction.replySuccessMessage(client, language("TRANSFER_ADD").replace('%amount%', montantAdd).replace('%emoji%', money), false);
            break;
        case 'remove':
            const montantRemove = interaction.options.get("amount", true).value as number;

            if (montantRemove > authorConfig.bank) return interaction.replyErrorMessage(client, language("ERROR_AMOUNT"), true);

            authorConfig.bank -= montantRemove;
            authorConfig.money += montantRemove;
            await edit(interaction.guild!.id, interaction.user.id, authorConfig);

            return interaction.replySuccessMessage(client, language("TRANSFER_REMOVE").replace('%amount%', montantRemove).replace('%emoji%', money), false);
            break;
        default:
            return interaction.replyErrorMessage(client, language("DEFAULT"), true);
    }

}

export const slash = {
    data: {
        name: __filename.slice(__dirname.length + 1, __filename.length - 3),
        description: "Display the balance of a user.",
        description_localizations: {
            fr: "Afficher la balance d'un utilisateur."
        },
        category: "Economy",
        permissions: ["SendMessages"],
        options: [
            {
                name: "add",
                description: "Add money to the account.",
                description_localizations: {
                    fr: "Ajouter de l'argent sur le compte."
                },
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "montant",
                        description: "Amount to be added.",
                        description_localizations: {
                            fr: "Montant à ajouter."
                        },
                        type: ApplicationCommandOptionType.Number,
                        required: true,
                    }
                ]
            },
            {
                name: "remove",
                description: "Remove money to the account.",
                description_localizations: {
                    fr: "Retirer de l'argent sur le compte."
                },
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "amount",
                        name_localizations: {
                            fr: "montant"
                        },
                        description: "Amount to be added.",
                        description_localizations: {
                            fr: "Montant à ajouter."
                        },
                        type: ApplicationCommandOptionType.Number,
                        required: true
                    }
                ]
            },
            {
                name: "user",
                name_localizations: {
                    fr: "utilisateur",
                },
                description: "Displays the balance of a user.",
                description_localizations: {
                    fr: "Affiche la balance d'un utilisateur."
                },
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "user",
                        name_localizations: {
                            fr: "utilisateur",
                        },
                        type: ApplicationCommandOptionType.String,
                        description: "Displays the balance of a user.",
                        description_localizations: {
                            fr: "Affiche la balance d'un utilisateur."
                        }
                    },
                    {
                        name: "transfer",
                        name_localizations: {
                            fr: "virement",
                        },
                        type: ApplicationCommandOptionType.Number,
                        description: "Allows you to send money to a user.",
                        description_localizations: {
                            fr: "Permet d'envoyer de l'argent à un utilisateur."
                        },
                    }
                ]
            },
        ]
    },
}