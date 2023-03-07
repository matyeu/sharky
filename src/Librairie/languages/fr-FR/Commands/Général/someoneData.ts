const someoneataFR: any = {
    STAFF: "Staff Discord",
    PARTNER: "Partenaire Discord",
    BUGHUNTERLEVEL_1: "Chasseur de bugs (Level 1)",
    BUGHUNTERLEVEL_2: "Chasseur de bugs (Level 2)",
    HYPESQUAD: "Événements HypeSquad",
    HYPESQUADONLINEHOUSE_1: "Maison de la bravoure",
    HYPESQUADONLINEHOUSE_2: "Maison de la brillance",
    HYPESQUADONLINEHOUSE_3: "Maison de l'équilibre",
    PREMIUMEARLYSUPPORTER: "Soutien de la première heure",
    TEAMPSEUDOUSER: "'Utilisateur d'équipe",
    VERIFIEDBOT: "Bot certifié",
    VERIFIEDDEVELOPER: "Développeur de bot certifié",
    USER: "Nom d'utilisateur :", 
    DISCRIMINATOR: "Discriminateu r",
    ID: "ID : ",
    CREATED: "Créé : ",
    JOIN: "Rejoins :"
};


const translateSomeoneDataFR = (key: string | number, ...args: any[]) => {
    const translation = someoneataFR[key];
    if (typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateRankDataFR;