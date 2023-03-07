import {model, Schema} from 'mongoose';
import {Message, Snowflake} from "discord.js";
import {createMissingProperties} from "../Librairie";
import {EMOJIS} from "../config";
import {find as findGuild} from "./guild";

const Logger = require("../Librairie/logger");

let Levels = model("Levels", new Schema({
    guildID: String,
    userID: String,
    rank: Number,
    card: {
        background: String,
        color: String,
    },
    community: {
        level: Number,
        experience: Number,
    }
}));

export const def = {
    guildID: "",
    userID: "",
    rank: 0,
    card: {
        background: "",
        color: "",
    },
    community: {
        level: 0,
        experience: 0
    }
};

export async function create(guildID: Snowflake, userID: Snowflake) {
    const level = new Levels(createMissingProperties(def, {guildID, userID}));
    await level.save();
    Logger.client("Creating a user level in the database");
    return level;
};

export async function find(guildID: Snowflake, userID: Snowflake) {
    let level = await Levels.findOne({guildID, userID});
    if (!level) {
        level = await create(guildID, userID);
    }
    return level;
};

export async function findServer(guildID: Snowflake) {
    if (!guildID) return null;
    const members = await Levels.find({guildID: guildID});
    if (members) return members;
    return null;
}

export async function edit(guildID: Snowflake, userID: Snowflake, data: object) {
    await find(guildID, userID);
    let level = await Levels.findOneAndUpdate({guildID, userID}, data, {new: true});
    return await level!.save();
};

export async function update(guildID: Snowflake, userID: Snowflake) {
    let level = await find(guildID, userID);
    let data = createMissingProperties(def, level)
    return edit(guildID, userID, data);
};

export function level(exp: number) {
    return Math.floor(Math.sqrt(exp) * 0.1) + 1;
};

export function experience(level: number) {
    const e = Math.pow((level - 1) / 0.1, 2);
    return e;
};

export function progression(exp: number): number {
    const actualLevel = level(exp);
    const actualLevelExp = experience(actualLevel);
    const nextLevelExp = experience(actualLevel + 1);
    const diff = nextLevelExp - actualLevelExp;
    const progressExp = exp - actualLevelExp;
    return Math.floor((progressExp / diff) * 100);
};

export async function addExperience(message: Message, userID: Snowflake, exp: number) {

    const guildConfig: any = await findGuild(message.guild!.id);
    const member = await message.guild!.members.fetch(userID);
    const memberConfig: any = await find(member.guild!.id, member.id);

    memberConfig.community.experience += exp;

    const lvl = level(memberConfig.community.experience);

    if (memberConfig.community.level !== lvl) {
        memberConfig.community.level = lvl;
        await message.react(EMOJIS.levelup);

        for (const role in guildConfig.levels.roles) {
            if (lvl === parseInt(role.substring(5, 8)))
                await member.roles.add(guildConfig.levels.roles[role]);
        }
    }

    await edit(member.guild!.id, member.id, memberConfig);
    return memberConfig.community.experience
};


export async function removeExperience(message: Message, member: Snowflake, exp: number) {

    const memberConfig: any = await find(message.guild!.id, member);

    memberConfig.community.experience -= exp;
    const lvl = level(memberConfig.community.experience)

    if (memberConfig.community.level !== lvl) memberConfig.community.level = lvl;

    await edit(message.guild!.id, member, memberConfig);
    return memberConfig.community.experience
};

export default Levels;