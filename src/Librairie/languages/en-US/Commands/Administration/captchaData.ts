const captchaDataEN: any = {
    TITLE: "Panel captcha of %client%",
    ADDFIELD_STATE: "State",
    ADDFIELD_STATE_GENERAL: "Message general",
    ADDFIELD_CHANNEL: "Channel",
    ADDFIELD_CHANNEL_GENERAL: "Channel general",
    ADDFIELD_ROLE: "Role",
    ADDFIELD_MESSAGE: "Message",
    STATE_ON: "On",
    STATE_OFF: "Off",
};


const translateCaptchaEN = (key: string | number, ...args: any[]) => {
    const translation = captchaDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateCaptchaEN;
