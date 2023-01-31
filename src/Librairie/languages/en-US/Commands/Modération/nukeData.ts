const nukeDataEN: any = {
    DESCRIPTION: "Do you really want to delete all messages from the %channel% lounge?",
    LABEL_CHANGE: "Apply",
    LABEL_CANCEL: "Cancel",
    ERROR_PERMISSION: "**You do not have the authority to use this interaction!",
    COMMAND_CANCEL: "%emoji% Cancelled command"
};


const translateNukeDataEN = (key: string | number, ...args: any[]) => {
    const translation = nukeDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateNukeDataEN;