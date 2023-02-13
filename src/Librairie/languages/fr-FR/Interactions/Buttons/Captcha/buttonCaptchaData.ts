const buttonCapcthaDataFR: any = {
    ROLE_NOTFOUND: "**Aucun rôle a été indiquer pour le système de captcha**",
    CAPTCHA_OFF: "**Le système de captcha est désactivé**",
    CAPTCHA_SUCCESS: "**Validation prise en compte !**",
    TEXT_1: "**Un %user% sauvage tape l'incruste dans le serveur !**",
    TEXT_2: "**Oh non, de la concurrence ! Nan, je rigole ! Bienvenue à toi %user%**",
    TEXT_3 : "**Bienvenue %user% tu as ramené de la pizza, j'espère !**",
    TEXT_4 : "**%user% a bondit dans le serveur**",
    TEXT_5: "**Bienvenue %user%, dit bonjour !**",
    TEXT_6: "**Youhou, tu as réussi %user%**",
    TEXT_7: "**%user% vient de se glisser dans le serveur**",
    TEXT_8: "**%user% vient juste d'arriver !**",
    TEXT_9: "**Être %user%, c'est comme être Dieu mais en mieux !**",
    TEXT_10: "**J'apprécie %user%, dans des contextes inadaptés**",
    TEXT_11: "**Poussez-vous !! Me voici ! %user%**",
    TEXT_12: "**Bravo %user% ! Tu as été séléctionné pour gagner ~~un iPhone 12~~ une place sur le serveur !**",
    TEXT_13: "**Tout le monde devrait avoir un %user% dans sa vie.**",
    TEXT_14: "**%user% COMMENT TU VAS TOI ? MOI CA VA SUPER EN TOUT CAS !**"
};


const translateButtonCaptchaFR = (key: string | number, ...args: any[]) => {
    const translation = buttonCapcthaDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateButtonCaptchaFR;
