const avatarDataEN: any = {
    MEMBER_NOTFOUND: "This user **does not exist** or **was not found**.",
    DESCRIPTION: "Avatar **Discord** from %user%",
};


const translateAvatarDataEN = (key: string | number, ...args: any[]) => {
    const translation = avatarDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateAvatarDataEN;