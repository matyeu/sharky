const buttonRoleDataEN: any = {
    TITLE: "Indicate the role to be given",
    LABEL: "Enter the role ID",
    ERROR_PERMISSION: "**You do not have the authority to use this interaction!**",
};


const translateButtonRoleEN = (key: string | number, ...args: any[]) => {
    const translation = buttonRoleDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateButtonRoleEN;
