const membersDataEN: any = {
    TITLE: "Status of the server members: [%memberSize%] members",
    ADDFIELD_ONLINE: "%emoji% Online",
    ADDFIELD_DND: "%emoji% Do not disturb",
    ADDFIELD_AFK: "%emoji% Afk",
    ADDFIELD_OFFLINE: "%emoji% Offline",
    ADDFIELD_VALUE: "%memberSize% members"
};


const translateMembersDataEN = (key: string | number, ...args: any[]) => {
    const translation = membersDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateMembersDataEN;