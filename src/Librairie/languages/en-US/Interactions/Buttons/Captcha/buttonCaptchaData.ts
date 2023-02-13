const buttonCapcthaDataEN: any = {
    ROLE_NOTFOUND: "**No role has been specified for the captcha system**",
    CAPTCHA_OFF: "**The captcha system is disabled**",
    CAPTCHA_SUCCESS: "**Validation taken into account!**",
    TEXT_1: "**A wild %user% is crashing the server!**",
    TEXT_2: "**Oh no, competition! Nah, I'm just kidding! Welcome to you %user%**",
    TEXT_3 : "**Welcome %user% you brought back pizza, I hope!**",
    TEXT_4 : "**%user% has jumped into the server**",
    TEXT_5: "**Welcome %user%, say hello!**",
    TEXT_6: "**Youhou, you made it %user%**",
    TEXT_7: "**%user% has just slipped into the server**",
    TEXT_8: "**%user% has just arrived!**",
    TEXT_9: "**Being %user% is like being God but better!**",
    TEXT_10: "**I appreciate %user%, in unsuitable contexts**",
    TEXT_11: "**Poussez-vous !! Me voici ! %user%**",
    TEXT_12: "**Congratulations %user% ! You have been selected to win ~~an iPhone 12~~ a place on the server!**",
    TEXT_13: "**Everyone should have a %user% in their life.**",
    TEXT_14: "**%user% COMMENT TU VAS TOI ? MOI CA VA SUPER EN TOUT CAS !**"
};


const translateButtonCaptchaEN = (key: string | number, ...args: any[]) => {
    const translation = buttonCapcthaDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateButtonCaptchaEN;
