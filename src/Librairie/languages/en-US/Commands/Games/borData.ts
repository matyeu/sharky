const borDataEN: any = {
    NOT_FOUND: "You **don't have** enough coins!",
    ERROR_BET: "**You can** bet up to **500** coins!",
    DESCRIPTION: "**%user%** your bet is **%bet%** %emoji%\n\n✊│✊│✊\n⚫│\uD83D\uDD34│\uD83D\uDFE2",
    BLACK: "BLACK",
    RED: "RED",
    GREEN: "GREEN",
    CASHOUT: "CASHOUT",
    ERROR_PERMISSION: "**You are not authorized to use this interaction!**",
    DESCRIPTION_CASHOUUT: "**%user%** you won **%bet%** %emoji%",
    DESCRIPTION_LOST: "**%user%** you lost **%bet%** %emoji%\nTry again by relaunching the command </bor:1085622706264879215>",
    COLLECTOR_END: "End of the time allotted for this interaction.",
};

const translateBorDataEN = (key: string | number, ...args: any[]) => {
    const translation = borDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateBorDataEN;
