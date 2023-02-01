const setLangDataFR: any = {
    CONTENT: "**Language updated!**",
    LANGUAGE_ALREADY: "**La langue est déjà en %language%**"
};


const translateSetLangFR = (key: string | number, ...args: any[]) => {
    const translation = setLangDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateSetLangFR;
