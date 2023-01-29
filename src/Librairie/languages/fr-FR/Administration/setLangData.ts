const setLangDataFR: any = {
    CONTENT: "**Language updated!**"
};


const translateSetLangFR = (key: string | number, ...args: any[]) => {
    const translation = setLangDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateSetLangFR;
