const selectEditEmbedDataEN: any = {
    EMBED_DB_NOTFOUND: "**No embed was detected in the database.**",
    ERROR_PERMISSION: "**You do not have the authority to use this interaction!**",
    COLOR: "**%emoji% %user% what color would you like to add to your embed?**",
    ERROR_COLOR: "**%emoji% %user% the indicated color is not valid** : https://flatuicolors.com/",
    AUTHOR: "**%emoji% %user% which author's name would you like to add to your embed?**",
    PICTURE_AUTHOR: "**%emoji% %user% what author image would you like to add to your embed?**",
    TITLE: "**%emoji% %user% wwat title would you like to add to your embed?**",
    URL: "**%emoji% %user% which URL would you like to add to your embed?**",
    ERROR_URL: "**%emoji% %user% your URL is not valid, please try again**",
    DESCRIPTION: "**%emoji% %user% what description would you like to add to your embed?**",
    ERROR_DESCRIPTION: "**%emoji% %user% you have exceeded the character limit, please try again**",
    THUMBAIL: "**%emoji% %user% which thumbail would you like to add to your embed?**",
    ADD_FIELD: "**%emoji% %user% please send the title of your field**",
    ADD_FIELD_DESCRIPTION: "**%emoji% %user% please send the description of your field**",
    ADD_FIELD_INLINE: "**%emoji% %user% do you want to align your field?**",
    YES: "Yes",
    NO: "No",
    REMOVE_FIELD: "**%emoji% %user% please enter the number of the field to be deleted!**",
    ERROR_FIELD: "**%emoji% %user% please enter a valid number**",
    FIELD_NOTFOUND: "**%emoji% %user% the field was not found, please try again**",
    PICTURE: "**%emoji% %user% what image would you like to add to your embed?**",
    FOOTER: "**%emoji% %user% which footer would you like to add to your embed?**",
    PICTURE_FOOTER: "**%emoji% %user% which footer image would you like to add to your embed?**",
    ERROR_PICTURE: "**%emoji% %user% please host your image : https://www.zupimages.net/**",
    DEFAULT: "**The selected select-menu has not been found**",
    DESCRIPTION_INFO: "***%emoji% Expiration of the interaction %time%***",

};

const translateSelectEditEmbedDataEN = (key: string | number, ...args: any[]) => {
    const translation = selectEditEmbedDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateSelectEditEmbedDataEN;