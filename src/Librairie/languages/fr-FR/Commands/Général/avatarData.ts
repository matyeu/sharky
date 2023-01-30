const avatarDataFR: any = {
    DESCRIPTION: "Avatar **Discord** de %user%",
};


const translateAvatarDataFR = (key: string | number, ...args: any[]) => {
    const translation = avatarDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateAvatarDataFR;