const avatarDataEN: any = {
    DESCRIPTION: "Avatar **Discord** from %user%",
};


const translateAvatarDataEN = (key: string | number, ...args: any[]) => {
    const translation = avatarDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateAvatarDataEN;