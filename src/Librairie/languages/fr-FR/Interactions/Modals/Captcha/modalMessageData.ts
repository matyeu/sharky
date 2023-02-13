const modalMessageDataFR: any = {
    CONTENT_SUCCESS: "**Message du captcha bien mise à jour**"
};


const translateModalMessageFR = (key: string | number, ...args: any[]) => {
    const translation = modalMessageDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateModalMessageFR;
