const dailyDataEN: any = {
    DAILY_COOLDOWN: "**You have \`%timeH%\` hour(s) \`%timeM%\` minute(s) \`%timeS%\` second(s) left before you can fly another user!**",
    TEXT: "%user%, here are your daily rewards:\n> + **%amountM%** %emojiM% coins.\n> + **%amountX%** %emojiX% experience points.",
};

const translateDailyDataEN = (key: string | number, ...args: any[]) => {
    const translation = dailyDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateDailyDataEN;
