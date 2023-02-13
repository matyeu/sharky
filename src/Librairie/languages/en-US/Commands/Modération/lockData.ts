const lockDataEN: any = {
    CHANNEL_LOCK: "The channel is being **locked**.",
    MESSAGE_LOCK: "%emoji% The channel is **locked**.",
    CHANNEL_UNLOCK: "The channel is being **unlocked**.",
    MESSAGE_UNLOCK: "%emoji% The channel is **unlocked**.",
};


const translateLockDataEN = (key: string | number, ...args: any[]) => {
    const translation = lockDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateLockDataEN;