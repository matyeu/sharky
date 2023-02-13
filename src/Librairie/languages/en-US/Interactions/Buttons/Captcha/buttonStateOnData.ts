const buttonStateGeneralOnDataEN: any = {
    TITLE: "Panel captcha of %client%",
    ADDFIELD_STATE: "State",
    ADDFIELD_CHANNEL: "Channel",
    ADDFIELD_STATE_GENERAL: "Message general",
    ADDFIELD_CHANNEL_GENERAL: "Channel general",
    ADDFIELD_ROLE: "Role",
    ADDFIELD_MESSAGE: "Message",
    STATE_ON: "On",
    STATE_OFF: "Off",
    ERROR_PERMISSION: "**You do not have the authority to use this interaction!**",
};


const translateButtonStateGeneralOnEN = (key: string | number, ...args: any[]) => {
    const translation = buttonStateGeneralOnDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateButtonStateGeneralOnEN;
