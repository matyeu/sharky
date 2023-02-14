const kickDataEN: any = {
  MEMBER_NOTFOUND: "This user **does not exist** or **was not found**.",
  ERROR_HIGHEST: "**You cannot** kick this user.",
  DESCRIPTION_EMBED: "%staff% would like to kick **%user%** for the following reason: **%reason%**",
  ADDFIELD_MEMBER: "👤 Member (ID)",
  ADDFIELD_DATE: "📅 Date",
  ERROR_PERMISSION: "**You do not have the authority to use this interaction!**",
  DESCRIPTION_MODLOG: "**Member:** \`%user%\` (%userId%)\n**Action:** Kick\n**Reason:** %reason%",
  CASE: "Case %number%",
  NEW_DESCRIPTION_EMBED: "%staff% a kick **%user%** for the following reason: **%reason%**",
  TITLE_EMBEDUSER: "%client% Protect - Kick",
  DESCRIPTION_EMBEDUSER: "You have been kicked from the \`%server%\` for the following reason: **%reason%**",
  LABEL_BUTTON_USER: "The %user% kick information has been sent.",
  LABEL_BUTTON_SERVER: "%user% has been kicked from the server.",
  COLLECTOR_END: "End of the time limit for this interaction.",
};


const translateKickDataEN = (key: string | number, ...args: any[]) => {
  const translation = kickDataEN[key];
  if(typeof translation === "function") return translation(args);
  else return translation;
};

module.exports = translateKickDataEN;