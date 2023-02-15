const inviteDataEN: any = {
  MEMBER_NOTFOUND: "This user **does not exist** or **was not found**.",
  DESCRIPTUON_MEMBER: "**%user%** currently owns:\n\n> **%inviteUser%** normal invitations\n> **%inviteBonus%** bonus invitations\n> **%inviteLeave%** leave invitations",
  DESCRIPTION_USER: "You currently own:\n\n> **%inviteUser%** normal invitations\n> **%inviteBonus%** bonus invitations\n>**%inviteLeave%** leave invitations"
};


const translateInviteDataEN = (key: string | number, ...args: any[]) => {
  const translation = inviteDataEN[key];
  if(typeof translation === "function") return translation(args);
  else return translation;
};

module.exports = translateInviteDataEN;