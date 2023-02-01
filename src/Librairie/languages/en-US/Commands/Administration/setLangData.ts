const setLangDataEN: any = {
    CONTENT: "**Langue mise à jour !**",
    LANGUAGE_ALREADY: "**The language is already in %language%**"
};


const translateSetLangEN = (key: string | number, ...args: any[]) => {
    const translation = setLangDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateSetLangEN;
