const kickDataFR: any = {
  MEMBER_NOTFOUND: "Cet utilisateur **n'existe pas** ou **n'a pas été trouvé**.",
  ERROR_HIGHEST: "**Vous ne pouvez pas** kick cet utilisateur.",
  DESCRIPTION_EMBED: "%staff% souhaite kick **%user%** pour la raison suivante : **%reason%**",
  ADDFIELD_MEMBER: "👤 Membre (ID)",
  ADDFIELD_DATE: "📅 Date",
  ERROR_PERMISSION: "**Vous n'avez pas l'habilitation d'utiliser cet interaction !**",
  DESCRIPTION_MODLOG: "**Membre:** \`%user%\` (%userId%)\n**Action:** Kick\n**Raison:** %reason%",
  CASE: "Cas %number%",
  NEW_DESCRIPTION_EMBED: "%staff% a kick **%user%** pour la raison suivante : **%reason%**",
  TITLE_EMBEDUSER: "%client% Protect - Kick",
  DESCRIPTION_EMBEDUSER: "Vous avez été kick du serveur \`%server%\` pour la raison suivante : **%reason%**",
  LABEL_BUTTON_USER: "L'information du kick de %user% a été envoyé.",
  LABEL_BUTTON_SERVER: "%user% a été kick du serveur.",
  COLLECTOR_END: "Fin du temps imparti pour cet interaction.",
};


const translateKickDataFR = (key: string | number, ...args: any[]) => {
  const translation = kickDataFR[key];
  if(typeof translation === "function") return translation(args);
  else return translation;
};

module.exports = translateKickDataFR;