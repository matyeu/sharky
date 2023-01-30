const helpDataEN: any = {
    TITLE: "❓ Getting help",
    DESCRIPTION: "Do you need information? You've come to the right place!\nCheck out the list of topics to learn more about %client%",
    PLACEHOLDER: "Select a topic",
    LABEL_STAFF: "Command staff",
    DESCRIPTION_STAFF: "Have the list of staff orders",
    LABEL_GENERAL: "Command generales",
    DESCRIPTION_GENERAL: "Have the list of general command",
    TITLE_COMMAND: "The list of command",
};


const translateHelpDataEN = (key: string | number, ...args: any[]) => {
    const translation = helpDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateHelpDataEN;