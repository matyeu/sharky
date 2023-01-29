import {
    ButtonInteraction,
    Client,
    ClientOptions,
    Collection,
    CommandInteraction,
    Guild, EmbedBuilder,
    BaseMessageOptions, ModalSubmitInteraction, SelectMenuInteraction,
    Snowflake,
    TextChannel
} from 'discord.js';
import * as fs from "fs";
import {EMOJIS} from "../config";

const Logger = require("./logger");

export class SharkClient extends Client {
    public config: Object;
    public slashCommands: Collection<any, any>;
    public messageCommands: Collection<any, any>;
    public cooldowns: Collection<any, any>;
    public musicPlayer: Collection<any, any>;
    public buttons: Collection<any, any>;
    public selects: Collection<any, any>;
    public modals: Collection<any, any>;
    public invite: Collection<any, any>;

    constructor(options: ClientOptions) {
        super(options);
        this.config = {};
        this.slashCommands = new Collection();
        this.messageCommands = new Collection();
        this.cooldowns = new Collection();
        this.musicPlayer = new Collection();
        this.buttons = new Collection();
        this.selects = new Collection();
        this.modals = new Collection();
        this.invite = new Collection();

    }

    getEmoji(id: Snowflake) {
        return this.emojis.cache.get(id);
    }

    getRole(guild: Guild, id: Snowflake) {
        return guild.roles.cache.get(id);
    }

    async getChannel(guild: Guild, snowflake: Snowflake, messageData: BaseMessageOptions) {
        if (snowflake) {
            let channel = <TextChannel>guild.channels.cache.get(snowflake);
            if (channel) {
                await channel.send(messageData);
            }
        }
    }

    async getClientChannel(client: SharkClient, snowflake: Snowflake, messageData: BaseMessageOptions) {
        if (snowflake) {
            let channel = <TextChannel>client.channels.cache.get(snowflake);
            if (channel) {
                await channel.send(messageData);
            }
        }
    }
}

declare module "discord.js" {
    interface CommandInteraction {
        replySuccessMessage(client: SharkClient, content: string, ephemeral: boolean): Promise<void>;

        replyErrorMessage(client: SharkClient, content: string, ephemeral: boolean): Promise<void>;

        replyInfoMessage(client: SharkClient, content: string, ephemeral: boolean): Promise<void>;

        editSuccessMessage(client: SharkClient, content: string): any;

        editErrorMessage(client: SharkClient, content: string): any;
    }

    interface ButtonInteraction {
        replySuccessMessage(client: SharkClient, content: string, ephemeral: boolean): Promise<void>;

        replyErrorMessage(client: SharkClient, content: string, ephemeral: boolean): Promise<void>;

        editSuccessMessage(client: SharkClient, content: string): any;

        editErrorMessage(client: SharkClient, content: string): any;
    }

    interface SelectMenuInteraction {
        replySuccessMessage(client: SharkClient, content: string, ephemeral: boolean): Promise<void>;

        replyErrorMessage(client: SharkClient, content: string, ephemeral: boolean): Promise<void>;

        editSuccessMessage(client: SharkClient, content: string): any;

        editErrorMessage(client: SharkClient, content: string): any;
    }

    interface ModalSubmitInteraction {
        replySuccessMessage(client: SharkClient, content: string, ephemeral: boolean): Promise<void>;

        replyErrorMessage(client: SharkClient, content: string, ephemeral: boolean): Promise<void>;

        editSuccessMessage(client: SharkClient, content: string): any;

        editErrorMessage(client: SharkClient, content: string): any;
    }
}

CommandInteraction.prototype.replySuccessMessage = async function (client: SharkClient, content: string, ephemeral: boolean) {
    await this.reply({content: `${client.getEmoji(EMOJIS.succes)} | ${content}`, ephemeral: ephemeral});
};
CommandInteraction.prototype.replyErrorMessage = async function (client: SharkClient, content: string, ephemeral: boolean) {
    await this.reply({content: `${client.getEmoji(EMOJIS.error)} | ${content}`, ephemeral: ephemeral});
};
CommandInteraction.prototype.editSuccessMessage = async function (client: SharkClient, content: string) {
    await this.reply({content: `${client.getEmoji(EMOJIS.succes)} | ${content}`});
};
CommandInteraction.prototype.editErrorMessage = function (client: SharkClient, content: string) {
    return this.reply({content: `${client.getEmoji(EMOJIS.succes)} | ${content}`});
};

ButtonInteraction.prototype.replySuccessMessage = async function (client: SharkClient, content: string, ephemeral: boolean) {
    await this.reply({content: `${client.getEmoji(EMOJIS.succes)} | ${content}`, ephemeral: ephemeral});
};
ButtonInteraction.prototype.replyErrorMessage = async function (client: SharkClient, content: string, ephemeral: boolean) {
    await this.reply({content: `${client.getEmoji(EMOJIS.succes)} | ${content}`, ephemeral: ephemeral});
};
ButtonInteraction.prototype.editSuccessMessage = async function (client: SharkClient, content: string) {
    await this.reply({content: `${client.getEmoji(EMOJIS.succes)} | ${content}`});
};
ButtonInteraction.prototype.editErrorMessage = async function (client: SharkClient, content: string) {
    await this.reply({content: `${client.getEmoji(EMOJIS.succes)} | ${content}`});
};

SelectMenuInteraction.prototype.replySuccessMessage = async function (client: SharkClient, content: string, ephemeral: boolean) {
    await this.reply({content: `${client.getEmoji(EMOJIS.succes)} | ${content}`, ephemeral: ephemeral});
};
SelectMenuInteraction.prototype.replyErrorMessage = async function (client: SharkClient, content: string, ephemeral: boolean) {
    await this.reply({content: `${client.getEmoji(EMOJIS.succes)} | ${content}`, ephemeral: ephemeral});
};
SelectMenuInteraction.prototype.editSuccessMessage = async function (client: SharkClient, content: string) {
    await this.reply({content: `${client.getEmoji(EMOJIS.succes)} | ${content}`});
};
SelectMenuInteraction.prototype.editErrorMessage = async function (client: SharkClient, content: string) {
    await this.reply({content: `${client.getEmoji(EMOJIS.succes)} | ${content}`});
};

ModalSubmitInteraction.prototype.replySuccessMessage = async function (client: SharkClient, content: string, ephemeral: boolean) {
    await this.reply({content: `${client.getEmoji(EMOJIS.succes)} | ${content}`, ephemeral: ephemeral});
};
ModalSubmitInteraction.prototype.replyErrorMessage = async function (client: SharkClient, content: string, ephemeral: boolean) {
    await this.reply({content: `${client.getEmoji(EMOJIS.error)} | ${content}`, ephemeral: ephemeral});
};
ModalSubmitInteraction.prototype.editSuccessMessage = async function (client: SharkClient, content: string) {
    await this.reply({content: `${client.getEmoji(EMOJIS.succes)} | ${content}`});
};
ModalSubmitInteraction.prototype.editErrorMessage = async function (client: SharkClient, content: string) {
    await this.reply({content: `${client.getEmoji(EMOJIS.error)} | ${content}`});
};

export function getFilesRecursive(directory: string, aFiles?: string[]) {
    const files = fs.readdirSync(directory);
    aFiles = aFiles ?? [];
    files.forEach((file) => {
        const path = `${directory}/${file}`;
        if (fs.statSync(path).isDirectory()) {
            aFiles = getFilesRecursive(path, aFiles);
        } else {
            aFiles!.push(path);
        }
    })
    return aFiles;
}

export function date() {
    return new Date().toLocaleString('fr-FR', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });
}

export function dateDay() {
    return new Date().toLocaleString('fr-FR', {
        year: "numeric",
        month: "numeric",
        day: "numeric"
    });
}

export function createMissingProperties(def: object, obj: object) {
    for (let key of Object.keys(def) as Array<keyof object>) {
        if (typeof def[key] === "object" && !(<any>def[key] instanceof Date)) {
            if (obj[key] === undefined || obj[key] === null) {
                (obj[key] as object) = {};
            }
            createMissingProperties(def[key], obj[key]);
        } else if (obj[key] === undefined || obj[key] === null) {
            obj[key] = def[key];
        }
    }
    return obj;
}

export function capitalize(firstLetter: string) {
    return firstLetter.charAt(0).toUpperCase() + firstLetter.slice(1)
};

export function diffArr(A: any, B: any) {
    return A.filter(function (a: any) {
        return B.indexOf(a) == -1
    })
};

export function msToTime(ms: any) {
    let seconds = (ms / 1000).toFixed(1);
    let minutes = (ms / (1000 * 60)).toFixed(1);
    let hours = (ms / (1000 * 60 * 60)).toFixed(1);
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);

    if (parseInt(seconds) < 60) return seconds + " Sec";
    else if (parseInt(minutes) < 60) return minutes + " Min";
    else if (parseInt(hours) < 24) return hours + " Hrs";
    else return days + " Days"

};