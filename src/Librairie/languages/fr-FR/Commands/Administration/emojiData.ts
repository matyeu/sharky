const emojiDataFR: any = {
    ERROR_EMOJI: "L'emoji **indiqué n'a pas été trouvé** par le bot",
    EMOJI_ALREADY: "**L'emoji %emoji% est déjà présent sur le serveur**",
    DESCRIPTION_CREATE: "**Ajout de l'emoji : %emoji%**",
    DESCRIPTION_INFO: "**Information sur l'emoji : %emoji%**",
    EMOJI_NOTFOUND: "**L'emoji indiqué n'a pas été trouver**",
    EMOJI_DELETE: "**L'emoji a bien été supprimer**",
    REASON: "Command emoji utilisé par %user%",
    ADDFIELD_NAME: "Nom",
    ADDFIELD_ANIME: "Animé",
    ADDFIELD_LINK: "Lien",
    DEFAULT: "**La sous-commande sélectionnée n'a pas été trouver**",
};

const translateEmojiFR = (key: string | number, ...args: any[]) => {
    const translation = emojiDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateEmojiFR;
