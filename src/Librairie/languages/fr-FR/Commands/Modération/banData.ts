const banDataFR: any = {
  MEMBER_NOTFOUND: "Cet utilisateur **n'existe pas** ou **n'a pas été trouvé**.",
  ERROR_HIGHEST: "**Vous ne pouvez pas** ban cet utilisateur.",
  BAN: "Ban",
  UNBAN: "Unban",
  DESCRIPTION_EMBED: "%staff% souhaite %action% **%user%** pour la raison suivante : **%reason%**",
  A_USER : "Un utilisateur (%userId%)",
  ADDFIELD_MEMBER: "👤 Membre (ID)",
  ADDFIELD_DATE: "📅 Date",
  DESCRIPTION_MODLOG: "**Membre:** \`%user%\` \n**Action:** %action%\n**Raison:** %reason%",
  COMMAND_CANCEL: "Commande anulée",
  CASE: "Cas %number%",
  ERROR_PERMISSION: "**Vous n'avez pas l'habilitation d'utiliser cet interaction !**",
  NEW_DESCRIPTION_EMBED: "%staff% a %action% **%user%** pour la raison suivante : **%reason%**",
  TITLE_EMBEDUSER: "%client% Protect - Ban",
  DESCRIPTION_EMBEDUSER: "Vous avez été ban du serveur \`%server%\` pour la raison suivante : **%reason%**",
  LABEL_BUTTON_USER: "L'information du ban de %user% a été envoyé.",
  LABEL_BUTTON_SERVER: "%user% a été ban du serveur.",
  LABEL_BUTTON_UNBAN: "%user% a été unban du serveur.",
  COLLECTOR_END: "Fin du temps imparti pour cet interaction.",
};


const translateBanDataFR = (key: string | number, ...args: any[]) => {
  const translation = banDataFR[key];
  if(typeof translation === "function") return translation(args);
  else return translation;
};

module.exports = translateBanDataFR;