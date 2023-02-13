const modalChannelDataEN: any = {
    ERROR_CONTENT: "**You must enter a valid id, please try again**",
    CHANNEL_NOTFOUND: "**The indicated channel was not found, please try again**",
    TITLE: "Captcha of %client%",
    BUTTON_LABEL: "Get access to the server",
    CONTENT_SUCCESS: "**Captcha well sent in the %channel% channel**"
};


const translateModalChannelEN = (key: string | number, ...args: any[]) => {
    const translation = modalChannelDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateModalChannelEN;
