const messageCreateDataFR: any = {
    MEMBER_TIMEOUT: "%user% a été mute pour faute de pub",
    DESCRIPTION_TIMEOUT: "**Membre:** `%user%`\n**Action:** Timeout\n**Expiration:** <t:%time%:R>\n**Raison:** PUB",
};

const translateMessageCreateDataFR = (key: string | number, ...args: any[]) => {
    const translation = messageCreateDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateMessageCreateDataFR;