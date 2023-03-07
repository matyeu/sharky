const someoneDataEN: any = {
    STAFF: "Discord Staff",
    PARTNER: "Discord Partner",
    BUGHUNTERLEVEL_1: "Bug Hunter (Level 1)",
    BUGHUNTERLEVEL_2: "Bug Hunter (Level 2)",
    HYPESQUAD: "HypeSquad Events",
    HYPESQUADONLINEHOUSE_1: "House of Bravery",
    HYPESQUADONLINEHOUSE_2: "House of Brilliance",
    HYPESQUADONLINEHOUSE_3: "House of Balance",
    PREMIUMEARLYSUPPORTER: "Early Supporter",
    TEAMPSEUDOUSER: "Team User",
    VERIFIEDBOT: "Verified Bot",
    VERIFIEDDEVELOPER: "Verified Bot Developer",
    USER: "Username:",
    DISCRIMINATOR: "Discriminator:",
    ID: "ID:",
    CREATED: "Created:",
    JOIN: "Joined:",
    BADGES: "Discord Badges:",
    BUTTON_LABEL: "New search",
    ERROR_PERMISSION: "**You are not authorized to use this interaction!**",
    COLLECTOR_END: "End of time limit for this interaction.",
};

const translateSomeoneDataEN = (key: string | number, ...args: any[]) => {
    const translation = someoneDataEN[key];
    if (typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateSomeoneDataEN;
