const peaceDataFR: any = {
    SUCCESS_CONTENT: "La commande peace est **en cours** de lancement.",
    TEXT_1: "**Les esprits s'échauffent, ça arrive, mais tâchons de retrouver notre calme...**",
    TEXT_2: "**Cet échange est désagréable pour tout le monde, alors on respire et on se détend...**",
    TEXT_3: "**Si vous souhaitez vraiment continuer à débattre, continuez en privé... **",
    TEXT_4: "**Car vous instaurez une mauvaise ambiance qui dérange tout le monde... **",
    TEXT_5: "**Soyez aimables de respecter la paix qui règne habituellement sur ce channel... Merci :pray: **",
    TEXT_6: "**Vous pouvez à nouveau parler, dans le calme et la joie de vivre !** %emoji%",
};


const translatePeaceDataFR = (key: string | number, ...args: any[]) => {
    const translation = peaceDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translatePeaceDataFR;