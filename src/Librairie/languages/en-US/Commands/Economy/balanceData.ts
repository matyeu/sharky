const balanceDataEN: any = {
    DEFAULT: "**The selected subcommand has not been found**",
    AUTHOR: "Member scale : %user%",
    MONEY: "Liquid",
    BANK: "Bank",
    ERROR_YOURSELF: "You **cannot** mention yourself for this action",
    ERROR_AMOUNT: "**You don't have** enough money to transfer this amount",
    TRANSFER_SUCCESS: "You just sent **%amount% %emoji%** to %user%",
    TRANSFER_ADD: "You just **added %amount% %emoji%** à votre banque.",
    TRANSFER_REMOVE: "You just **withdrew %amount% %emoji%** à votre banque.",
};


const translateBalanceDataEN = (key: string | number, ...args: any[]) => {
    const translation = balanceDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateBalanceDataEN;