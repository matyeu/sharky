const buttonChannelDataFR: any = {
    TITLE: "Indiquer le channel du embed",
    LABEL_CAPTCHA: "Entrer l'ID du channel captcha",
    LABEL_GENERAL: "Entrer l'ID du channel général",
    ERROR_PERMISSION: "**Vous n'avez pas l'habilitation d'utiliser cet interaction !**",
};


const translateButtonChannelFR = (key: string | number, ...args: any[]) => {
    const translation = buttonChannelDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateButtonChannelFR;
