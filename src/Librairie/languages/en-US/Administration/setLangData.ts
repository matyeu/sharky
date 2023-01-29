const setLangDataEN: any = {
    CONTENT: "**Langue mise à jour !**"
};


const translateSetLangEN = (key: string | number, ...args: any[]) => {
    const translation = setLangDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateSetLangEN;
