const rankingDataFR: any = {
    TITLE: "TOP 5 des meilleurs membres",
    ERROR_RANKING: "Le classement choisi est **introuvable** ou **n'existe pas**.",
    DESCRIPTION_LEVEL: "*Les levels s'actualisent toutes les 30 minutes*" ,
    ADDFIELD_LEVEL: "**Level communautaire : `%level%` (`%experience%` %emoji%)**",
    ADDFIELD_WALTH: "**Argent : \`%money%\` %emojiM% (\`%bank%\`%emojiB%)**",
};


const translateRankingDataFR = (key: string | number, ...args: any[]) => {
    const translation = rankingDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateRankingDataFR;