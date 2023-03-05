const coinflipDataEN: any = {
    NOT_FOUND: "You **don't have** enough coins!",
    ERROR_BET: "**You can** bet up to **500** coins!",
    TITLE: "FACE or Tails",
    DESCRIPTION: "**%user%**, your bet is **%bet%** %emoji%\nChoose below which side you think will land and good luck!",
    FACE: "FACE",
    TAIL: "TAILS",
    CASHOUT: "CASHOUT",
    ERROR_PERMISSION: "**You are not authorized to use this interaction!**",
    DESCRIPTION_CASHOUT: "**%user%**, you won **%bet%** %emoji%",
    DESCRIPTION_LOST: "**%user%**, you lost **%bet%** %emoji%\nTry your luck again by relaunching the command </coinflip:1081973831754842152>",
    COLLECTOR_END: "Time limit for this interaction has ended.",
};

const translateCoinflipDataEN = (key: string | number, ...args: any[]) => {
    const translation = coinflipDataEN[key];
    if (typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateCoinflipDataEN;
