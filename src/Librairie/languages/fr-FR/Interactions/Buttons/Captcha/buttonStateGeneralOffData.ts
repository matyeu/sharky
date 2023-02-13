const buttonStateOffDataFR: any = {
    TITLE: "Panel captcha de %client%",
    ADDFIELD_STATE: "Etat",
    ADDFIELD_CHANNEL: "Channel",
    ADDFIELD_STATE_GENERAL: "Message général",
    ADDFIELD_CHANNEL_GENERAL: "Channel général",
    ADDFIELD_ROLE: "Rôle",
    ADDFIELD_MESSAGE: "Message",
    STATE_ON: "Activé",
    STATE_OFF: "Désactivé",
    ERROR_PERMISSION: "**Vous n'avez pas l'habilitation d'utiliser cet interaction !**",
};


const translateButtonStateOffFR = (key: string | number, ...args: any[]) => {
    const translation = buttonStateOffDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateButtonStateOffFR;
