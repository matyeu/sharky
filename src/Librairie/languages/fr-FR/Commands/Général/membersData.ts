const membersDataFR: any = {
    TITLE: "Statut des membres du serveur: [%memberSize%] membres",
    ADDFIELD_ONLINE: "%emoji% En ligne",
    ADDFIELD_DND: "%emoji% Ne pas déranger",
    ADDFIELD_AFK: "%emoji% Absent",
    ADDFIELD_OFFLINE: "%emoji% Hors ligne",
    ADDFIELD_VALUE: "%memberSize% membres"
};


const translateMembersDataFR = (key: string | number, ...args: any[]) => {
    const translation = membersDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateMembersDataFR;