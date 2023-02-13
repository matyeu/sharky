const buttonMessageDataEN: any = {
    TITLE: "Indicate the message of the captcha",
    LABEL: "Enter the message",
    ERROR_PERMISSION: "**You do not have the authority to use this interaction!**",
};


const translateButtonMessageEN = (key: string | number, ...args: any[]) => {
    const translation = buttonMessageDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateButtonMessageEN;
