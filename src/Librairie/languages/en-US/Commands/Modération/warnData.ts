const warnDataEN: any = {
    MEMBER_ERROR: "This user **does not exist** or was **not found**.",
    ERROR_HIGHEST: "**You cannot** warn this user.",
    WARN: "Warn",
    UNWARN: "Unwarn",
    WARN_ERROR: "You cannot warn this user.",
    DESCRIPTION_EMBED: "%staff% wishes to %action% **%user%** for the following reason: **%reason%**",
    MEMBER: "👤 Member (ID)",
    DATE: "📅 Date",
    ERROR_PERMISSION: "**You are not authorized** to use this interaction!",
    COMMAND_CANCEL: "Command cancelled",
    DESCRIPTION_MODLOG_WARN: "**Member:** \`%user%\` (%userId%)\n**Action:** Warn\n**Reason:** %reason%",
    DESCRIPTION_MODLOG_UNWARN: "**Member:** \`%user%\` (%userId%)\n**Action:** Unwarn\n**Reason:** %reason%\n**Reference:** %reference%",
    CASE: "Case %number%",
    NEW_DESCRIPTION_EMBED: "%staff% %action%ed **%user%** for the following reason: **%reason%**",
    TITLE_EMBEDUSER: "%client% Protect - %action%",
    DESCRIPTION_EMBEDUSER: "You have been %action%ed from the server \`%server%\` for the following reason: **%reason%**",
    ADDFIELD_SERVER: "Server",
    ADDFIELD_DATE: "Date",
    ADDFIELD_NUMBER_WARN: "Warn number",
    FOOTER_EMBEDUSER: "The warn number must be kept for any claim.",
    LABEL_BUTTON_USER: "Information about %user%'s %action% has been sent.",
    LABEL_BUTTON_SERVER: "%user% has been %action%ed from the server.",
    REASON_REQUIRED: "A reason is **required** to remove a warn.",
    NOT_WARNING: "This warn does not exist in the database.",
    ADDFIELD_STAFF: "👤 Staff (ID)",
    WARN_SERVER_HAS: "%server% has **%number%** warns.",
    NAME_VALUE_USER: "Warn #%number% by `%staff%` on %date%:",
    OLD_STAFF: "An old staff",
    WARN_USER_HAS: "%user% has **%number%** warns.",
    COLLECTOR_END: "Time limit reached for this interaction.",
    OLD_MEMBER: "An old member",
    NAME_VALUE_SERVER: "Warn %user% by `%staff%` on %date%:",
    DEFAULT: "The sub-command %subcommand% **does not exist**."
};

const translateWarnEN = (key: string | number, ...args: any[]) => {
    const translation = warnDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateWarnEN;
