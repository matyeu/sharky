const interactionDataFR: any = {
    COMMAND_NOTFOUND: "La commande **%command%** n'a pas été trouver",
    TITLE: "Maintenance en cours",
    FOOTER: "Merci de réessayer dans quelque minutes.\nPendant la maintenance, tous les systèmes automatisés de %client% restent fonctionnels.",
    DESCRIPTION_BOT: "**%user%**, une opération de maintenance est actuelement en cours sur **%client%**.",
    DESCRIPTION_COMMAND: "**%user%**, une opération de maintenance est actuelement en cours sur la commande **%command%**.",
    DESCRIPTION_CATEGORY: "**%user%**, une opération de maintenance est actuelement en cours sur le module **%category%**.",
    REASON: "Raison",
    ERROR_PERMISSION: "**Vous n'avez pas** la permission d'utiliser cette commande !",
    COOLDOWN: "Merci de patienter **%time% seconde(s)** pour utiliser cette commande.",
};


const translateInteractionDataFR = (key: string | number, ...args: any[]) => {
    const translation = interactionDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateInteractionDataFR;