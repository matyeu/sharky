const banDataEN: any = {
  MEMBER_NOTFOUND: "This user **does not exist** or **was not found**.",
  ERROR_HIGHEST: "**You cannot** ban this user.",
  BAN: "Ban",
  UNBAN: "Unban",
  DESCRIPTION_EMBED: "%staff% would like to ban **%user%** for the following reason: **%reason%**",
  A_USER : "A user (%userId%)",
  ADDFIELD_MEMBER: "👤 Member (ID)",
  ADDFIELD_DATE: "📅 Date",
  DESCRIPTION_MODLOG_BAN: "**Member:** \`%user%\` \n**Action:** Ban\n**Reason:** %reason%",
  DESCRIPTION_MODLOG_UNBAN: "**Member:** \`%user%\` \n**Action:** Unan\n**Reason:** %reason%\n**Reference:** %reference%",
  COMMAND_CANCEL: "Command cancel",
  CASE: "Case %number%",
  ERROR_PERMISSION: "**You do not have the authority to use this interaction!**",
  NEW_DESCRIPTION_EMBED: "%staff% a ban **%user%** for the following reason: **%reason%**",
  TITLE_EMBEDUSER: "%client% Protect - Ban",
  DESCRIPTION_EMBEDUSER: "You have been banned from the \`%server%\` for the following reason: **%reason%**",
  LABEL_BUTTON_USER: "The %user% ban information has been sent.",
  LABEL_BUTTON_SERVER: "%user% has been banned from the server.",
  LABEL_BUTTON_UNBAN: "%user% was unban from the server.",
  COLLECTOR_END: "End of the time limit for this interaction.",
};


const translateBanDataEN = (key: string | number, ...args: any[]) => {
  const translation = banDataEN[key];
  if(typeof translation === "function") return translation(args);
  else return translation;
};

module.exports = translateBanDataFR;