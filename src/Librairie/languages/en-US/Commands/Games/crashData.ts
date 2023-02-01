const crashDataEN: any = {
    NOT_FOUND: "You **don't** have enough coins!",
    ERROR_BET: "**You can** bet up to **500** coins!",
    DESCRIPTION: "**%user%** your bet is **%bet%** %emoji%",
    MULTIPLY: "Multiply",
    HOW_TO_PLAY: "How to play %emoji%",
    HOW_TO_PLAY_VALUE: "Click on stop before crashing",
    DESCRIPTION_LOST: "**%user%** you just lost **%bet%** %emoji%",
    ERROR_PERMISSION: "**You do not have the authority to use this interaction!",
    SUCCESS: "**%user%** you just won **%newProfit%** %emoji%"
};


const translateCrashDataEN = (key: string | number, ...args: any[]) => {
    const translation = crashDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateCrashDataEN;