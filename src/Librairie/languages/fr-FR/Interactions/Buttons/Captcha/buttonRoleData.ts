const buttonRoleDataFR: any = {
    TITLE: "Indiquer le rôle à donner",
    LABEL: "Entrer l'ID du rôle",
    ERROR_PERMISSION: "**Vous n'avez pas l'habilitation d'utiliser cet interaction !**",
};


const translateButtonRoleFR = (key: string | number, ...args: any[]) => {
    const translation = buttonRoleDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateButtonRoleFR;
