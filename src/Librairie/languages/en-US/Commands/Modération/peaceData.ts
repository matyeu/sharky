const peaceDataEN = {
    SUCCESS_CONTENT: "The peace order will be launched.",
    TEXT_1: "**Tempers flare, it happens, but let's try to stay calm...**",
    TEXT_2: "**This exchange is unpleasant for everyone, so we breathe and relax...**",
    TEXT_3: "**It's time to continue the discussion in private...**",
    TEXT_4: "**Because you create a bad atmosphere that disturbs everyone... **",
    TEXT_5: "**Please respect the peace that usually prevails on this channel... Merci :pray: **",
    TEXT_6: "**You can speak again, in calmness and joy-attitude !** %emoji%",
};


const translatePeaceEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = peaceDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translatePeaceEN;
