const rankDataEN: any = {
    MEMBER_NOTFOUND: "**This user does not exist or was not found.**",
    RANK: "Rank: #",
    LEVEL: "Level"
};

const translateRankDataEN = (key: string | number, ...args: any[]) => {
    const translation = rankDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateRankDataEN;
