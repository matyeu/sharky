const buttonChannelDataEN: any = {
    TITLE: "Indicate the channel of the embed",
    LABEL_CAPTCHA: "Enter the captcha channel ID",
    LABEL_GENERAL: "Enter the general channel ID",
    ERROR_PERMISSION: "**You do not have the authority to use this interaction!**",
};


const translateButtonChannelEN = (key: string | number, ...args: any[]) => {
    const translation = buttonChannelDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateButtonChannelEN;
