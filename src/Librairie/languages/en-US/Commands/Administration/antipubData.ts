const antipubDataEN: any = {
    DESCRIPTION: "If you want to make the anti-pub **%state%** retype the command"
};


const translateAntipubEN = (key: string | number, ...args: any[]) => {
    const translation = antipubDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateAntipubEN;
