const buttonEmbedCancelDataFR: any = {
    EMBED_CANCEL: "Embed annulé"

};


const translateButtonEmbedCancelDataFR = (key: string | number, ...args: any[]) => {
    const translation = buttonEmbedCancelDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateButtonEmbedCancelDataFR;