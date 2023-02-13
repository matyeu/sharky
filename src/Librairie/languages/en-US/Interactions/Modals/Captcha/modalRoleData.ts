const modalRoleDataEN: any = {
    ERROR_CONTENT: "**You must enter a valid id, please try again**",
    ROLE_NOTFOUND: "**The indicated role was not found, please try again**",
    TITLE: "Captcha of %client%",
    CONTENT_SUCCESS: "**The %role% role has been well taken into account**"
};


const translateModalRoleEN = (key: string | number, ...args: any[]) => {
    const translation = modalRoleDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateModalRoleEN;
