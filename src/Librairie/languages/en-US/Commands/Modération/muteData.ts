const muteDataEN: any = {
    MEMBER_NOTFOUND: "This user **does not exist** or **has not been found**.",
    ERROR_HIGHEST: "**You cannot** mute this user.",
    MUTE: "Mute",
    UNMUTE: "Unmute",
    DESCRIPTION_EMBED: "%staff% wants to %action% **%user%** for the following reason: **%reason%**",
    ADDFIELD_MEMBER: "👤 Member (ID)",
    ADDFIELD_DATE: "📅 Date",
    ERROR_PERMISSION: "**You do not have permission to use this interaction!**",
    COMMAND_CANCEL: "Command cancelled",
    CASE: "Case %number%",
    DESCRIPTION_MODLOG_MUTE: "**Member:** \`%user%\` \n**Action:** Mute\n**Expiration:** <t:%time%:R>\n**Reason:** %reason%",
    DESCRIPTION_MODLOG_UNMUTE: "**Member:** \`%user%\` \n**Action:** Unmute\n**Reason:** %reason%\n**Reference:** %reference%",
    NEW_DESCRIPTION_EMBED: "%staff% has %action% **%user%** for the following reason: **%reason%**",
    TITLE_EMBEDUSER: "%client% Protect - %action%",
    DESCRIPTION_EMBEDUSER: "You have been muted from the server \`%server%\` for the following reason: **%reason%**",
    LABEL_BUTTON_USER: "The %action% information of %user% has been sent.",
    LABEL_BUTTON_SERVER: "%user% has been %action% from the server.",
    COLLECTOR_END: "Time limit for this interaction has ended.",
};

const translateMuteDataEN = (key: string | number, ...args: any[]) => {
    const translation = muteDataEN[key];
    if (typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateMuteDataEN;
