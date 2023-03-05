const muteDataFR: any = {
    MEMBER_NOTFOUND: "Cet utilisateur **n'existe pas** ou **n'a pas été trouvé**.",
    ERROR_HIGHEST: "**Vous ne pouvez pas** mute cet utilisateur.",
    MUTE: "Mute",
    UNMUTE: "Unmute",
    DESCRIPTION_EMBED: "%staff% souhaite %action% **%user%** pour la raison suivante : **%reason%**",
    ADDFIELD_MEMBER: "👤 Membre (ID)",
    ADDFIELD_DATE: "📅 Date",
    ERROR_PERMISSION: "**Vous n'avez pas l'habilitation d'utiliser cet interaction !**",
    COMMAND_CANCEL: "Commande anulée",
    CASE: "Case %number%",
    DESCRIPTION_MODLOG_MUTE: "**Membre:** \`%user%\` \n**Action:** Mute\n**Expiration:** <t:%time%:R>\n**Raison:** %reason%",
    DESCRIPTION_MODLOG_UNMUTE: "**Membre:** \`%user%\` \n**Action:** Unmute\n**Raison:** %reason%\n**Référence:** %reference%",
    NEW_DESCRIPTION_EMBED: "%staff% a %action% **%user%** pour la raison suivante : **%reason%**",
    TITLE_EMBEDUSER: "%client% Protect - %action%",
    DESCRIPTION_EMBEDUSER: "Vous avez été mute du serveur \`%server%\` pour la raison suivante : **%reason%**",
    LABEL_BUTTON_USER: "L'information du %action% de %user% a été envoyé.",
    LABEL_BUTTON_SERVER: "%user% a été %action% du serveur.",
    COLLECTOR_END: "Fin du temps imparti pour cet interaction.",
};


const translateMuteDataFR = (key: string | number, ...args: any[]) => {
    const translation = muteDataFR[key];
    if (typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateMuteDataFR;