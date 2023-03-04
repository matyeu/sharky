const robDataEN: any = {
    MEMBER_NOTFOUND: "This user **does not exist** or **was not found**.",
    USER_TOO_POOR: "**%user% is too poor to be stolen from!**",
    ROB_COOLDOWN: "**You have to wait for \`%timeH%\` hours \`%timeM%\` minutes and \`%timeS%\` seconds before you can steal again!**",
    ROB_USER_COOLDOWN: "**%user% has already been stolen from. Wait for \`%timeH%\` hours \`%timeM%\` minutes and \`%timeS%\` seconds before stealing again.**",
    TEXT_WIN_1: "%user% successfully stole **%amount%** %emoji% from %target%.",
    TEXT_WIN_2: "%user% managed to steal **%amount%** %emoji% from %target% without being noticed.",
    TEXT_WIN_3: "%user% fled with **%amount%** %emoji% stolen from %target%.",
    TEXT_WIN_4: "%user% successfully robbed **%amount%** %emoji% from %target%!",
    TEXT_WIN_5: "%user% managed to steal **%amount%** %emoji% from %target% despite strong resistance.",
    TEXT_WIN_6: "%user% skillfully and discreetly took **%amount%** %emoji% from %target%.",
    TEXT_LOST_1: "%user% failed to steal **%amount%** %emoji% from %target%.",
    TEXT_LOST_2: "%user% was caught red-handed by %target% while trying to steal.",
    TEXT_LOST_3: "%user% couldn't steal **%amount%** %emoji% from %target% this time.",
    TEXT_LOST_4: "%target% repelled %user% who was trying to steal **%amount%** %emoji%.",
    TEXT_LOST_5: "%target% foiled %user%'s attempt to steal **%amount%** %emoji%.",
    TEXT_LOST_6: "%user% tried to steal **%amount%** %emoji% from %target% but failed despite their best efforts.",
};

const translateRobDataEN = (key: string | number, ...args: any[]) => {
    const translation = robDataEN[key];
    if (typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateRobDataEN;  