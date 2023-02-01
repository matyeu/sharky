import {getFilesRecursive, SharkClient} from "./index";
import path from "path";
import chalk from 'chalk';

const Logger = require("./logger");

console.clear();

console.log(chalk.blue(",|"))
console.log(chalk.blue("/ ;"))
console.log(chalk.blue("/  \\"))
console.log(chalk.blue(": ,'("))
console.log(chalk.blue("|( `.\\"))
console.log(chalk.blue(": \\  `\\       \\."))
console.log(chalk.blue("\\ `.         | `."))
console.log(chalk.blue("\\  `-._     ;   \\"))
console.log(chalk.blue(" \\     ``-.'.. _ `._"))
console.log(chalk.blue("  `. `-.            ```-...__"))
console.log(chalk.blue("   .'`.        --..          ``-..____"))
console.log(chalk.blue(" ,'.-'`,_-._            ((((   <o.   ,'"))
console.log(chalk.blue("      `' `-.)``-._-...__````  ____.-'"))
console.log(chalk.blue("          ,'    _,'.--,---------'"))
console.log(chalk.blue("      _.-' _..-'   ),'"))
console.log(chalk.blue("     ``--''        `"))
console.log("")
console.log(chalk.bgGreen("                                                         "));
console.log(chalk.bgGreen(" © 2023 SHARKY Server - Discord BOT developed by matyeu. "));
console.log(chalk.bgGreen("                                                         "));
console.log("");

export function loadCommands(client: SharkClient) {
    let commandFiles = getFilesRecursive(path.resolve(__dirname, "../Commands"));
    for (const commandFile of commandFiles) {
        import(commandFile).then(exports => {
            let matches = commandFile.match(/([^\\\/:*?"<>|\r\n]+)\.\w*$/) ?? [];
            let commandName = matches[1];
            if (!commandName) return;
            Logger.command(`${commandName}`)
            if (exports.slash) client.slashCommands.set(exports.slash.data.name, exports);
            else client.messageCommands.set(commandName, exports);
        });
    }

};

export function loadEvents(client: SharkClient) {
    let eventFiles = getFilesRecursive(path.resolve(__dirname, "../Events"));
    for (const eventFile of eventFiles) {
        let matches = eventFile.match(/([^\\\/:*?"<>|\r\n]+)\.\w*$/) ?? [];
        let eventName = matches[1];
        if (!eventName) continue;
        Logger.event(`${eventName}`)
        client.on(eventName, (...args) => import(eventFile).then(async listener => await listener.default(client, ...args)));
    }
};

export function loadButtons(client: SharkClient) {
    let buttonFiles = getFilesRecursive(path.resolve(__dirname, "../Interactions/Buttons"));
    for (const buttonFile of buttonFiles) {
        import(buttonFile).then(exports => {
            let matches = buttonFile.match(/([^\\\/:*?"<>|\r\n]+)\.\w*$/) ?? [];
            let buttonName = matches[1];
            if (!buttonName) return;
            if (exports.button) client.buttons.set(exports.button.data.name, exports);
            else client.buttons.set(buttonName, exports);
        });
    }
};

export function loadSelectMenus(client: SharkClient) {
    let selectFiles = getFilesRecursive(path.resolve(__dirname, "../Interactions/Selectmenus"));
    for (const selectFile of selectFiles) {
        import(selectFile).then(exports => {
            let matches = selectFile.match(/([^\\\/:*?"<>|\r\n]+)\.\w*$/) ?? [];
            let selectName = matches[1];
            if (!selectName) return;
            if (exports.select) client.selects.set(exports.select.data.name, exports);
            else client.selects.set(selectName, exports);
        });
    }
};

export function loadModals(client: SharkClient) {
    let modalFiles = getFilesRecursive(path.resolve(__dirname, "../Interactions/Modals"));
    for (const modalFile of modalFiles) {
        import(modalFile).then(exports => {
            let matches = modalFile.match(/([^\\\/:*?"<>|\r\n]+)\.\w*$/) ?? [];
            let modalName = matches[1];
            if (!modalName) return;
            if (exports.modal) client.modals.set(exports.modal.data.name, exports);
            else client.modals.set(modalName, exports);
        });
    }
};