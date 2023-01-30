const interactionDataFR: any = {
    TITLE: "Maintenance en cours",
    FOOTER: "Merci de réessayer dans quelque minutes.\nPendant la maintenance, tous les systèmes automatisés de %client% restent fonctionnels.",
    DESCRIPTION_BOT: "**%user%**, une opération de maintenance est actuelement en cours sur **%client%**.",
    DESCRIPTION_COMMAND: "**%user%**, une opération de maintenance est actuelement en cours sur la commande **%command%**.",
    DESCRIPTION_CATEGORY: "**%user%**, une opération de maintenance est actuelement en cours sur le module **%category%**.",
    REASON: "Raison"
};


const translateInteractionDataFR = (key: string | number, ...args: any[]) => {
    const translation = interactionDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateInteractionDataFR;