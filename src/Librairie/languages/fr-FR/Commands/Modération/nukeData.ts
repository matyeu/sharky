const nukeDataFR: any = {
    DESCRIPTION: "Voulez-vous vraiment supprime tous les messages du salon %channel% ?",
    LABEL_CHANGE: "Appliquer",
    LABEL_CANCEL: "Annuler",
    ERROR_PERMISSION: "**Vous n'avez pas l'habilitation d'utiliser cet interaction !**",
    COMMAND_CANCEL: "%emoji% Commande annulée"
};


const translateNukeDataFR = (key: string | number, ...args: any[]) => {
    const translation = nukeDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateNukeDataFR;