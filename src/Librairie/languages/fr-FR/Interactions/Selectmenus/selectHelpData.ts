const selectHelpDataFR: any = {
    TITLE: "❓ Obtenir de l'aide",
    DESCRIPTION: "Vous avez besoin d'informations ? Vous êtes au bon endroit !\nConsulte la liste des sujets pour en savoir plus sur %client%",
    PLACEHOLDER: "Sélectionner un sujet",
    LABEL_STAFF: "Commandes staff",
    DESCRIPTION_STAFF: "Avoir la liste des commandes staff",
    LABEL_GENERAL: "Commandes générales",
    DESCRIPTION_GENERAL: "Avoir la liste des commandes générales",
    TITLE_COMMAND: "La liste des commandes",
};


const translateSelectHelpDataFR = (key: string | number, ...args: any[]) => {
    const translation = selectHelpDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateSelectHelpDataFR;