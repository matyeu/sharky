const selectHelpDataEN: any = {
    TITLE: "❓ Getting help",
    DESCRIPTION: "Do you need information? You've come to the right place!\nCheck out the list of topics to learn more about %client%",
    TITLE_COMMAND: "The list of command",
    TITLE_COIN: "%emoji% Corner management & commande %emoji%",
    DESCRIPTION_COIN: "> 🗨️ You earn `5 coins` for every message sent\n> 🔊 You earn `300 coins` every 15 minutes when you are in voice\n> 🎥 You earn `400 coins` when you are in stream\n> 📹 You earn `500 coins` when you activate your camera!",

};


const translateSelectHelpDataEN = (key: string | number, ...args: any[]) => {
    const translation = selectHelpDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateSelectHelpDataEN;