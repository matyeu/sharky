const selectHelpDataFR: any = {
    TITLE: "❓ Obtenir de l'aide",
    DESCRIPTION: "Vous avez besoin d'informations ? Vous êtes au bon endroit !\nConsulte la liste des sujets pour en savoir plus sur %client%",
    TITLE_COMMAND: "La liste des commandes",
    TITLE_COIN: "%emoji% Gestion & commandes des coins %emoji%",
    DESCRIPTION_COIN: "> 🗨️ Vous gagnez `5 coins` à tous les messages envoyés\n> 🔊 Vous gagnez `300 coins` toutes les 15 minutes lorsque vous êtes en vocal\n> 🎥 Vous gagnez `400 coins` lorsque vous êtes en stream\n> 📹 Vous gagnez `500 coins` lorqque vous activez votre caméra !",
};


const translateSelectHelpDataFR = (key: string | number, ...args: any[]) => {
    const translation = selectHelpDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateSelectHelpDataFR;