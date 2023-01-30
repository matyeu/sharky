const helpDataFR: any = {
    TITLE: "❓ Obtenir de l'aide",
    DESCRIPTION: "Vous avez besoin d'informations ? Vous êtes au bon endroit !\nConsulte la liste des sujets pour en savoir plus sur %client%",
    PLACEHOLDER: "Sélectionner un sujet",
    LABEL_STAFF: "Commandes staff",
    DESCRIPTION_STAFF: "Avoir la liste des commandes staff",
    LABEL_GENERAL: "Commandes générales",
    DESCRIPTION_GENERAL: "Avoir la liste des commandes générales",
};


const translateHelpDataFR = (key: string | number, ...args: any[]) => {
    const translation = helpDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateHelpDataFR;