const interactionDataEN: any = {
    TITLE: "Maintenance in progress",
    FOOTER: "Please try again in a few minutes. During maintenance, all %client% automated systems remain functional.",
    DESCRIPTION_BOT: "**%user%**, a maintenance operation is currently in progress on **%client%**.",
    DESCRIPTION_COMMAND: "**%user%**, a maintenance operation is currently in progress on the **%command%**.",
    DESCRIPTION_CATEGORY: "**%user%**, a maintenance operation is currently in progress on the **%category%** module.",
    REASON: "Reason"
};


const translateInteractionDataEN = (key: string | number, ...args: any[]) => {
    const translation = interactionDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateInteractionDataEN;

