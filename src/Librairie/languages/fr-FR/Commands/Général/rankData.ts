const rankDataFR: any = {
    MEMBER_NOTFOUND: "Cet utilisateur **n'existe pas** ou **n'a pas été trouvé**.",
    RANK: "Rank : #",
    LEVEL: "Level"
};


const translateRankDataFR = (key: string | number, ...args: any[]) => {
    const translation = rankDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateRankDataFR;