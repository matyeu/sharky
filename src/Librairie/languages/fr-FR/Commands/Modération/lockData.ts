const lockDataFR: any = {
    CHANNEL_LOCK: "Le channel est entrain d'être **verrouillé**.",
    MESSAGE_LOCK: "%emoji% Le channel est **verrouillé**.",
    CHANNEL_UNLOCK: "Le channel est entrain d'être **déverrouillé**.",
    MESSAGE_UNLOCK: "%emoji% Le channel est **déverrouillé**.",
};


const translateLockDataFR = (key: string | number, ...args: any[]) => {
    const translation = lockDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateLockDataFR;