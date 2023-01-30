const redirectDataFR: any = {
    ERROR_MESSAGE_ID: "La valeur **ne dois pas** contenir de lettre",
    ERROR_CHANNEL: "**Vous devez** mentionner un **salon textuel**.",
    ERROR_MESSAGE: "Le message avec l'ID **%messageId%** n'existe pas.",
    ERROR_MESSAGE_CHANNEL: "Le message est **déjà** dans le bon channel !",
    MESSAGE_AUTHOR: "%user% votre message a été redirigé vers le salon %channel%.",
    MESSAGE_REDIRECT: "`Message de %user% redirigé:`\n%message%",
    SUCCESS_REDIRECT: "**Le message a bien été redirigé !**"
};


const translateRedirectDataFR = (key: string | number, ...args: any[]) => {
    const translation = redirectDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateRedirectDataFR;