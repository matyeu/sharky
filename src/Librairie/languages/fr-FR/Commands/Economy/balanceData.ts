const balanceDataFR: any = {
    MEMBER_NOTFOUND: "Cet utilisateur **n'existe pas** ou **n'a pas été trouvé**.",
    DEFAULT: "**La sous-commande sélectionnée n'a pas été trouver**",
    AUTHOR: "Balance du membre : %user%",
    MONEY: "Liquide",
    BANK: "Banque",
    ERROR_YOURSELF: "Vous ne **pouvez pas** vous mentionez pour cette action",
    ERROR_AMOUNT: "**Vous n'avez pas** assez d'argent pour transféré ce montant",
    TRANSFER_SUCCESS: "Vous venez d'envoyer **%amount% %emoji%** à %user%",
    TRANSFER_ADD: "Vous venez **d'ajouter %amount% %emoji%** à votre banque.",
    TRANSFER_REMOVE: "Vous venez de **retirer %amount% %emoji%** à votre banque.",
};


const translateBalanceDataFR = (key: string | number, ...args: any[]) => {
    const translation = balanceDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateBalanceDataFR;