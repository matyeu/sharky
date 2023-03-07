const dailyDataFR: any = {
    DAILY_COOLDOWN: "**Il vous reste : \`%timeH%\` heures \`%timeM%\` minutes \`%timeS%\` seconde(s) avant de pouvoir de nouveau voler un utilisateur !**",
    TEXT: "%user%, voici vos récompenses quotidiennes:\n> + **%amountM%** %emojiM% coins.\n> + **%amountX%** %emojiX% points d'expérience.",
};

const translateDailyDataFR = (key: string | number, ...args: any[]) => {
    const translation = dailyDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateDailyDataFR;