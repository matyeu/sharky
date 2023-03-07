const rankingDataEN: any = {
    TITLE: "TOP 5 best members",
    ERROR_RANKING: "The selected ranking is **not found** or **does not exist**.",
    DESCRIPTION_LEVEL: "*Levels update every 30 minutes*" ,
    ADDFIELD_LEVEL: "**Community level: `%level%` (`%experience%` %emoji%)**",
    ADDFIELD_WALTH: "**Money: \`%money%\` %emojiM% (\`%bank%\`%emojiB%)**",
};

const translateRankingDataEN = (key: string | number, ...args: any[]) => {
    const translation = rankingDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateRankingDataEN;
