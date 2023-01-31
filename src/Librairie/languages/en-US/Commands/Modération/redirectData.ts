const redirectDataEN: any = {
    ERROR_MESSAGE_ID: "The value **must not** contain a letter",
    ERROR_CHANNEL: "**You must** mention a **textual show**.",
    ERROR_MESSAGE: "The message with the ID **%messageId%** does not exist.",
    ERROR_MESSAGE_CHANNEL: "The message is **already** in the right channel!",
    MESSAGE_AUTHOR: "%user% your message has been redirected to %channel%.",
    MESSAGE_REDIRECT: "`Message from %user% redirected:`\n%message%",
    SUCCESS_REDIRECT: "**The message has been redirected!**"
};


const translateRedirectDataEN = (key: string | number, ...args: any[]) => {
    const translation = redirectDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateRedirectDataEN;