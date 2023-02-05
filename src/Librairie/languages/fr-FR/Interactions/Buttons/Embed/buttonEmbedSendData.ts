const buttonEmbedSendDataFR: any = {
    EMBED_DB_NOTFOUND: "**Aucun embed a été détecté dans la base de donnée.**",
    ERROR_PERMISSION: "**Vous n'avez pas l'habilitation d'utiliser cet interaction !**",
    MESSAGE_SEND: "**%emoji% %user% vous avez 60 secondes pour envoyer l'ID du channel**",
    ERROR_CHANNEL: "**%emoji% %user% ce channel n'est pas valide, veuillez réessayer**",
    COLLECTOR_END: "Embed envoyé dans le salon %channel%"

};


const translateButtonEmbedSendDataFR = (key: string | number, ...args: any[]) => {
    const translation = buttonEmbedSendDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateButtonEmbedSendDataFR;