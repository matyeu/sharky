const borDataFR: any = {
    NOT_FOUND: "Vous **n'avez pas** assez de pièces !",
    ERROR_BET: "**Vous pouvez** miser jusqu'à **500** pièces !",
    DESCRIPTION: "**%user%** votre parie est de **%bet%** %emoji%\n\n✊│✊│✊\n⚫│\uD83D\uDD34│\uD83D\uDFE2",
    BLACK: "NOIR",
    RED: "ROUGE",
    GREEN: "VERT",
    CASHOUT: "CASHOUT",
    ERROR_PERMISSION: "**Vous n'avez pas l'habilitation d'utiliser cet interaction !**",
    DESCRIPTION_CASHOUUT: "**%user%** vous avez gagner **%bet%** %emoji%",
    DESCRIPTION_LOST: "**%user%** vous avez perdu **%bet%** %emoji%\nRetenter votre chance en relancant la commande </bor:1085622706264879215>",
    COLLECTOR_END: "Fin du temps imparti pour cet interaction.",
};


const translateBorDataFR = (key: string | number, ...args: any[]) => {
    const translation = borDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateBorDataFR;