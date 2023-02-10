const workDataFR: any = {
    WORK_COOLDOWN: "**Il vous reste : \`%timeH%\` heures \`%timeM%\` minutes \`%timeS%\` seconde(s) avant de pouvoir de nouveau travailler !**",
    TEXT_1: "Vous avez tondu la pelouse de Poséidon, il vous a donné **%number%** %emoji%",
    TEXT_2: "Vous avez peint le mur de Margaret, elle vous à donné **%number%** %emoji%",
    TEXT_3: "Vous venez de recevoir votre salaire du mois, qui est de **%number%** %emoji%",
    TEXT_4: "Votre vidéo Youtube sur les cétacés a eu un franc succès. Elle vous a rapporté **%number%** %emoji%",
    TEXT_5: "Vous avez pêché une sardine et un kraken. Cela représente un montant de **%number%** %emoji%",
    TEXT_6: "Vous avez travaillé en tant qu'employé de bureau et gagné **%number%** %emoji%",
    TEXT_7: "Vous avez piraté un distributeur de boissons pour les revendre vous-même. **%number%** %emoji%",
    TEXT_8: "Vous avez aidé un jeune à faire ses devoirs. Votre karma en a reçu une augmentation digne de ce nom et dès le lendemain, une licorne, un kebab et **%number%** %emoji% était dans votre boîte aux lettres",
    TEXT_9: "Vous êtes au chômage et avez gagné **%number%** %emoji%"
};

const translateWorkDataFR = (key: string | number, ...args: any[]) => {
    const translation = workDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateWorkDataFR;