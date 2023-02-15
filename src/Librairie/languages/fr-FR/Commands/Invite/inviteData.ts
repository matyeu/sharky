const inviteDataFR: any = {
  MEMBER_NOTFOUND: "Cet utilisateur **n'existe pas** ou **n'a pas été trouvé**.",
  DESCRIPTUON_MEMBER: "**%user%** possède actuellement :\n\n> **%inviteUser%** invitations normales\n> **%inviteBonus%** invitations bonus\n> **%inviteLeave%** invitations leave",
  DESCRIPTION_USER: "Vous possédez actuellement :\n\n> **%inviteUser%** invitations normales\n> **%inviteBonus%** invitations bonus\n> **%inviteLeave%** invitations leave"
};


const translateInviteDataFR = (key: string | number, ...args: any[]) => {
  const translation = inviteDataFR[key];
  if(typeof translation === "function") return translation(args);
  else return translation;
};

module.exports = translateInviteDataFR;