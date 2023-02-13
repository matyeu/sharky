const buttonMessageDataFR: any = {
    TITLE: "Indiquer le message du captcha",
    LABEL: "Entrer le message",
    ERROR_PERMISSION: "**Vous n'avez pas l'habilitation d'utiliser cet interaction !**",
};


const translateButtonMessageFR = (key: string | number, ...args: any[]) => {
    const translation = buttonMessageDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateButtonMessageFR;
