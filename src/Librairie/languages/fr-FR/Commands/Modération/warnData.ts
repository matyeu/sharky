const warnDataFR: any = {
    MEMBER_ERROR: "Cet utilisateur **n'existe pas** ou **n'a pas été trouvé**.",
    ERROR_HIGHEST: "**Vous ne pouvez pas** warn cet utilisateur.",
    WARN: "Warn",
    UNWARN: "Unwarn",
    WARN_ERROR: "Vous ne pouvez pas warn cet utilisateur.",
    DESCRIPTION_EMBED: "%staff% souhaite %action% **%user%** pour la raison suivante : **%reason%**",
    MEMBER: "👤 Membre (ID)",
    DATE: "📅 Date",
    ERROR_PERMISSION: "**Vous n'avez pas l'habilitation d'utiliser cet interaction !**",
    COMMAND_CANCEL: "Commande anulée",
    DESCRIPTION_MODLOG_WARN: "**Membre:** \`%user%\` (%userId%)\n**Action:** Warn\n**Raison:** %reason%",
    DESCRIPTION_MODLOG_UNWARN: "**Membre:** \`%user%\` (%userId%)\n**Action:** Unwarn\n**Raison:** %reason%\n**Reference:** %reference%",
    CASE: "Cas %number%",
    NEW_DESCRIPTION_EMBED: "%staff% a %action% **%user%** pour la raison suivante : **%reason%**",
    TITLE_EMBEDUSER: "%client% Protect - %action%",
    DESCRIPTION_EMBEDUSER: "Vous avez été %action% du serveur \`%server%\` pour la raison suivante : **%reason%**",
    ADDFIELD_SERVER: "Server",
    ADDFIELD_DATE: "Date",
    ADDFIELD_NUMBER_WARN: "Numéro du warn",
    FOOTER_EMBEDUSER: "Le numéro du warn est à garder pour toute réclamation",
    LABEL_BUTTON_USER: "L'information du %action% de %user% a été envoyé.",
    LABEL_BUTTON_SERVER: "%user% a été %action% du serveur.",
    REASON_REQUIRED: "Une raison est **nécessaire** pour supprimer un warn.",
    NOT_WARNING: "Ce warn n'existe pas dans la base de données.",
    ADDFIELD_STAFF: "👤 Staff (ID)",
    WARN_SERVER_HAS: "%server% possède **%number%** warns.",
    NAME_VALUE_USER: "Warn n°%number% par `%staff%` le %date%:",
    OLD_STAFF: "Un ancien staff",
    WARN_USER_HAS: "%user% possède **%number%** warns.",
    COLLECTOR_END: "Fin du temps imparti pour cet interaction.",
    OLD_MEMBER: "Un ancien membre",
    NAME_VALUE_SERVER: "Warn %user% par `%staff%` le %date%:",
    DEFAULT: "La sous-commande %subcommand% **n'existe pas**."
};


const translateWarnFR = (key: string | number, ...args: any[]) => {
    const translation = warnDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateWarnFR;
