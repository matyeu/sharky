const pingDataEN: any = {
    TITLE: "🏓 | Response times",
    BOT_LATENCY: "Bot latency",
    API_LATENCY: "Latency of the api",
};


const translatePingEN = (key: string | number, ...args: any[]) => {
    const translation = pingDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translatePingEN;
