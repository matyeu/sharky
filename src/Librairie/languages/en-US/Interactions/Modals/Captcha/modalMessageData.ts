const modalMessageDataEN: any = {
    CONTENT_SUCCESS: "**Message of the captcha well updated**"
};


const translateModalMessageEN = (key: string | number, ...args: any[]) => {
    const translation = modalMessageDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateModalMessageEN;
