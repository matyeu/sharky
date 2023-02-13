const modalRoleDataFR: any = {
    ERROR_CONTENT: "**Vous devez indiquer un id valide, veuillez réessayer**",
    ROLE_NOTFOUND: "**Le rôle indiqué n'a pas été trouver, veuillez réessayer**",
    TITLE: "Captcha de %client%",
    CONTENT_SUCCESS: "**Le rôle %role% a bien été pris en compte**"
};


const translateModalRoleFR = (key: string | number, ...args: any[]) => {
    const translation = modalRoleDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateModalRoleFR;
