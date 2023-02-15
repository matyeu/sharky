const avatarDataFR: any = {
    MEMBER_NOTFOUND: "Cet utilisateur **n'existe pas** ou **n'a pas été trouvé**.",
    DESCRIPTION: "Avatar **Discord** de %user%",
};


const translateAvatarDataFR = (key: string | number, ...args: any[]) => {
    const translation = avatarDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateAvatarDataFR;