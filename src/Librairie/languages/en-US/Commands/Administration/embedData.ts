const embedDataEN: any = {
    PLACEHOLDER_EDIT: "Edit the embed",
    LABEL_COLOR: "Color",
    LABEL_AUTHOR: "Author",
    LABEL_PICTURE_AUTHOR: "Picture author",
    LABEL_TITLE: "Title",
    LABEL_URL: "URL to title",
    LABEL_PICTURE: "Picture",
    LABEL_ADD_FIELD: "Add a field",
    LABEL_REMOVE_FIELD: "Remove a field",
    LABEL_FOOTER_PICTURE: "Picture footer",
    PLACEHOLDER_SETTING: "Settings",
    EMBED_SEND: "Send the embed",
    EMBED_CANCEL: "Cancel embed",
    EMBED_EDIT: "You are currently editing the embed %number%.",
    LABEL_ADD_EMBED: "Add a embed",
    LABEL_REMOVE_EMBED: "Remove a embed",
    LABEL_SWITCH_EMBED: "Change embed to modify",
    LABEL_COPY_EMBED: "Copy an existing embed",
    COLLECTOR_END: "End of the time limit for this interaction.",
};


const translateEmbedEN = (key: string | number, ...args: any[]) => {
    const translation = embedDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateEmbedEN;
