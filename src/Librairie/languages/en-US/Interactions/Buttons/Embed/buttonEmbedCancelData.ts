const buttonEmbedCancelDataEN: any = {
    EMBED_CANCEL: "Embed cancelled"

};


const translateButtonEmbedCancelDataEN = (key: string | number, ...args: any[]) => {
    const translation = buttonEmbedCancelDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateButtonEmbedCancelDataEN;