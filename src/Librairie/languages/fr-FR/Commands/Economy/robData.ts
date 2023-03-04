const robDataFR: any = {
    MEMBER_NOTFOUND: "Cet utilisateur **n'existe pas** ou **n'a pas été trouvé**.",
    USER_TOO_POOR: "**%user% est trop pauvre pour être voler !**",
    ROB_COOLDOWN: "**Il vous reste : \`%timeH%\` heures \`%timeM%\` minutes \`%timeS%\` seconde(s) avant de pouvoir de nouveau voler un utilisateur !**",
    ROB_USER_COOLDOWN: "**%user% a déjà été voler. Attender \`%timeH%\` heures \`%timeM%\` minutes \`%timeS%\` seconde(s) avant de pouvoir le re voler**",
    TEXT_WIN_1: "%user% a réussi à voler **%amount%** %emoji% à %target%",
    TEXT_WIN_2: "%user% a subtilisé **%amount%** %emoji% à %target% sans se faire remarquer.",
    TEXT_WIN_3: "%user% s'enfuit avec **%amount%** %emoji% volés à %target%.",
    TEXT_WIN_4: "%user% a dérobé **%amount%** %emoji% à %target% avec succès !",
    TEXT_WIN_5: "%user% a réussi à voler **%amount%** %emoji% à %target% malgré une forte résistance.",
    TEXT_WIN_6: "%user% a ravi **%amount%** %emoji% à %target% avec habileté et discrétion.",
    TEXT_LOST_1: "%user% a échoué à voler **%amount%** %emoji% à %target%.",
    TEXT_LOST_2: "%user% a été pris en flagrant délit de vol par %target%.",
    TEXT_LOST_3: "%user% n'a pas réussi à voler **%amount%** %emoji% à %target% cette fois-ci.",
    TEXT_LOST_4: "%target% a repoussé %user% qui tentait de voler **amount%** %emoji%.",
    TEXT_LOST_5: "%target% a déjoué la tentative de vol de %user% qui visait **%amount%** %emoji%.",
    TEXT_LOST_6: "%user% a tenté de voler **%amount%** %emoji% à %target%, mais a échoué malgré ses efforts.",
};

const translateRobDataFR = (key: string | number, ...args: any[]) => {
    const translation = robDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateRobDataFR;