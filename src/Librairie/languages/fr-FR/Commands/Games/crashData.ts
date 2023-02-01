const crashDataFR: any = {
    NOT_FOUND: "Vous **n'avez pas** assez de pièces !",
    ERROR_BET: "**Vous pouvez** miser jusqu'à **500** pièces !",
    DESCRIPTION: "**%user%** votre parie est de **%bet%** %emoji%",
    MULTIPLY: "Multiplier",
    HOW_TO_PLAY: "Comment jouer %emoji%",
    HOW_TO_PLAY_VALUE: "Cliquer sur stop avant de crash",
    DESCRIPTION_LOST: "**%user%** vous venez de perdre **%bet%** %emoji%",
    ERROR_PERMISSION: "**Vous n'avez pas l'habilitation d'utiliser cet interaction !**",
    SUCCESS: "**%user%** vous venez de gagner **%newProfit%** %emoji%"
};


const translateCrashDataFR = (key: string | number, ...args: any[]) => {
    const translation = crashDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateCrashDataFR;