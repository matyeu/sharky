const messageCreateDataEN: any = {
    MEMBER_TIMEOUT: "%user% has been transferred for lack of advertising",
    DESCRIPTION_TIMEOUT: "**Member:** `%user%`\n**Action:** Timeout\n**Expiration:** <t:%time%:R>\n**Reason:** PUB",
};

const translateMessageCreateDataEN = (key: string | number, ...args: any[]) => {
    const translation = messageCreateDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateMessageCreateDataEN;