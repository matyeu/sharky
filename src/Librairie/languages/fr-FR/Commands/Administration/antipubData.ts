const antipubDataFR: any = {
    DESCRIPTION: "Si vous voulez rendre l'anti-pub **%state%** retapez la commande"
};


const translateAntipubFR = (key: string | number, ...args: any[]) => {
    const translation = antipubDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateAntipubFR;
