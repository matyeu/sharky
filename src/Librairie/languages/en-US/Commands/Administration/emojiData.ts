const emojiDataEN: any = {
    ERROR_EMOJI: "The emoji **indicated was not found** by the bot",
    EMOJI_ALREADY: "**The emoji %emoji% is already present on the server**.",
    DESCRIPTION_CREATE: "**Added emoji : %emoji%**",
    DESCRIPTION_INFO: "**Information about the emoji : %emoji%**",
    EMOJI_NOTFOUND: "**The indicated emoji was not found**",
    EMOJI_DELETE: "**The emoji has been removed**",
    REASON: "Command emoji used by %user%",
    ADDFIELD_NAME: "Name",
    ADDFIELD_ANIME: "Animated",
    ADDFIELD_LINK: "Link",
    DEFAULT: "**The selected subcommand has not been found**",
};

const translateEmojiEN = (key: string | number, ...args: any[]) => {
    const translation = emojiDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateEmojiEN;
