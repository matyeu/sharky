const modalChannelDataFR: any = {
    ERROR_CONTENT: "**Vous devez indiquer un id valide, veuillez réessayer**",
    CHANNEL_NOTFOUND: "**Le channel indiqué n'a pas été trouver, veuillez réessayer**",
    TITLE: "Captcha de %client%",
    BUTTON_LABEL: "Obtenir l'accès au serveur",
    CONTENT_SUCCESS: "**Captcha bien envoyé dans le salon %channel%**"
};


const translateModalChannelFR = (key: string | number, ...args: any[]) => {
    const translation = modalChannelDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateModalChannelFR;
