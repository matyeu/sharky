const workDataEN: any = {
    WORK_COOLDOWN: "**You have : \`%timeH%\` heures \`%timeM%\` minutes \`%timeS%\` seconde(s) left before you can work again!*",
    TEXT_1: "You mowed the lawn of Poseidon, he gave you **%number%** %emoji%",
    TEXT_2: "You painted Margaret's wall, she gave you **%number%** %emoji%",
    TEXT_3: "You have just received your monthly salary, which is **%number%** %emoji%",
    TEXT_4: "Your Youtube video on cetaceans was a great success. It brought you **%number%** %emoji%",
    TEXT_5: "You have caught a sardine and a kraken. This represents an amount of **%number%** %emoji%",
    TEXT_6: "You have worked as a clerk and earned **%number%** %emoji%",
    TEXT_7: "You hacked into a vending machine to resell the drinks yourself. **%number%** %emoji%",
    TEXT_8: "You helped a youngster with his homework. Your karma got a decent raise and the next day a unicorn, a kebab and **%number%** %emoji% was in your mailbox",
    TEXT_9: "You are unemployed and have earned **%number%** %emoji%"
};

const translateWorkDataEN = (key: string | number, ...args: any[]) => {
    const translation = workDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateWorkDataEN;