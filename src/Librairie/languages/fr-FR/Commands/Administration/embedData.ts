const embedDataFR: any = {
    PLACEHOLDER_EDIT: "Modifier l'embed",
    LABEL_COLOR: "Couleur",
    LABEL_AUTHOR: "Auteur",
    LABEL_PICTURE_AUTHOR: "Image auteur",
    LABEL_TITLE: "Titre",
    LABEL_URL: "URL au titre",
    LABEL_PICTURE: "Image",
    LABEL_ADD_FIELD: "Ajouter un field",
    LABEL_REMOVE_FIELD: "Supprimer un field",
    LABEL_FOOTER_PICTURE: "Image footer",
    PLACEHOLDER_SETTING: "Paramètres",
    EMBED_SEND: "Envoyer l'embed",
    EMBED_CANCEL: "Annuler l'embed",
    EMBED_EDIT: "Vous modifiez actuellement l'embed %number%.",
    LABEL_ADD_EMBED: "Ajouter un embed",
    LABEL_REMOVE_EMBED: "Supprimer un embed",
    LABEL_SWITCH_EMBED: "Changer d'embed à modifier",
    LABEL_COPY_EMBED: "Copier un embed déjà existant",
    COLLECTOR_END: "Fin du temps imparti pour cet interaction.",
};


const translateEmbedFR = (key: string | number, ...args: any[]) => {
    const translation = embedDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateEmbedFR;
