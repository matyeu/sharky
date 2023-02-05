const selectEditEmbedDataFR: any = {
    EMBED_DB_NOTFOUND: "**Aucun embed a été détecté dans la base de donnée.**",
    ERROR_PERMISSION: "**Vous n'avez pas l'habilitation d'utiliser cet interaction !**",
    COLOR: "**%emoji% %user% quelle couleur souhaitez ajouter à votre embed ?**",
    ERROR_COLOR: "**%emoji% %user% la couleur indiquée n'est pas valide** : https://flatuicolors.com/",
    AUTHOR: "**%emoji% %user% quel nom d'auteur souhaitez ajouter à votre embed ?**",
    PICTURE_AUTHOR: "**%emoji% %user% quelle image d'auteur souhaitez ajouter à votre embed ?**",
    TITLE: "**%emoji% %user% quel titre souhaitez ajouter à votre embed ?**",
    URL: "**%emoji% %user% quelle URL souhaitez ajouter à votre embed ?**",
    ERROR_URL: "**%emoji% %user% votre URL n'est pas valide, veuillez réessayer**",
    DESCRIPTION: "**%emoji% %user% quelle description souhaitez ajouter à votre embed ?**",
    ERROR_DESCRIPTION: "**%emoji% %user% vous venez de dépasser la limite de caractère, veuillez réessayer**",
    THUMBAIL: "**%emoji% %user% quelle thumbail souhaitez ajouter à votre embed ?**",
    ADD_FIELD: "**%emoji% %user% veuillez envoyer le titre de votre field**",
    ADD_FIELD_DESCRIPTION: "**%emoji% %user% veuillez envoyer la description de votre field**",
    ADD_FIELD_INLINE: "**%emoji% %user% souhaitez-vous aligner votre field ?**",
    YES: "Oui",
    NO: "Non",
    REMOVE_FIELD: "**%emoji% %user% Veuillez entrer le chiffre du field à supprimer !**",
    ERROR_FIELD: "**%emoji% %user% veuillez entrer un chiffre valide**",
    FIELD_NOTFOUND: "**%emoji% %user% le field n'a pas été trouver, veuillez réessayer**",
    PICTURE: "**%emoji% %user% quelle image souhaitez ajouter à votre embed ?**",
    FOOTER: "**%emoji% %user% quel footer souhaitez ajouter à votre embed ?**",
    PICTURE_FOOTER: "**%emoji% %user% quelle image du footer souhaitez ajouter à votre embed ?**",
    ERROR_PICTURE: "**%emoji% %user% veuillez héberger votre image : https://www.zupimages.net/**",
    DEFAULT: "**Le select-menu sélectionné n'a pas été trouver**",
    DESCRIPTION_INFO: "***%emoji% Expiration de l'intéraction %time%***",

};

const translateSelectEditEmbedDataFR = (key: string | number, ...args: any[]) => {
    const translation = selectEditEmbedDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateSelectEditEmbedDataFR;