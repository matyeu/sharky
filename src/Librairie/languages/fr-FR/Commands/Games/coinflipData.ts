const coinflipDataFR: any = {
    NOT_FOUND: "Vous **n'avez pas** assez de pièces !",
    ERROR_BET: "**Vous pouvez** miser jusqu'à **500** pièces !",
    TITLE: "Pile ou Face",
    DESCRIPTION: "**%user%** votre parie est de **%bet%** %emoji%\nChoisissez ci-dessous quel est votre choix et bonne chance !",
    FACE: "FACE",
    TAIL: "PILE",
    CASHOUT: "CASHOUT",
    ERROR_PERMISSION: "**Vous n'avez pas l'habilitation d'utiliser cet interaction !**",
    DESCRIPTION_CASHOUUT: "**%user%** vous avez gagner **%bet%** %emoji%",
    DESCRIPTION_LOST: "**%user%** vous avez perdu **%bet%** %emoji%\nRetenter votre chance en relancant la commande </coinflip:1081973831754842152>",
    COLLECTOR_END: "Fin du temps imparti pour cet interaction.",
};


const translateCoinflipDataFR = (key: string | number, ...args: any[]) => {
    const translation = coinflipDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateCoinflipDataFR;