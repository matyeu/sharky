const captchaDataFR: any = {
    TITLE: "Panel captcha de %client%",
    ADDFIELD_STATE: "Etat",
    ADDFIELD_STATE_GENERAL: "Message général",
    ADDFIELD_CHANNEL: "Channel",
    ADDFIELD_CHANNEL_GENERAL: "Channel général",
    ADDFIELD_ROLE: "Rôle",
    ADDFIELD_MESSAGE: "Message",
    STATE_ON: "Activé",
    STATE_OFF: "Désactivé",
};


const translateCaptchaFR = (key: string | number, ...args: any[]) => {
    const translation = captchaDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateCaptchaFR;
