const buttonEmbedSendDataEN: any = {
    EMBED_DB_NOTFOUND: "**No embed was detected in the database.**",
    ERROR_PERMISSION: "**You do not have the authority to use this interaction!**",
    MESSAGE_SEND: "**%emoji% %user% you have 60 seconds to send the channel ID**",
    ERROR_CHANNEL: "**%emoji% %user% this channel is not valid, please try again**",
    COLLECTOR_END: "Embed sent to the living channel %channel%"

};


const translatebuttonEmbedSendDataEN = (key: string | number, ...args: any[]) => {
    const translation = buttonEmbedSendDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translatebuttonEmbedSendDataEN;