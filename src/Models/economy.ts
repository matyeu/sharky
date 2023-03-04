import {model, Schema} from 'mongoose';
import {Snowflake} from "discord.js";
import {createMissingProperties} from "../Librairie";

const Logger = require("../Librairie/logger");

let Economy = model("Economy", new Schema({
    guildID: String,
    userID: String,
    money: Number,
    bank: Number,
    cooldowns: {
        daily: Date,
        crime: Date,
        work: Date,
        rob: Date,
        lastRob: Date,
    }
}));

export const def = {
    guildID: "",
    userID: "",
    money: 0,
    bank: 0,
    cooldowns: {
        daily: 0,
        crime: 0,
        work: 0,
        rob: 0,
        lastRob: 0,
    }
};

export async function create(guildID: Snowflake, userID: Snowflake) {
    let member = new Economy(createMissingProperties(def, {guildID, userID}));
    await member.save();
    Logger.client("Creating a user in economy in the database");
    return member;
};

export async function find(guildID: Snowflake, userID: Snowflake) {
    let member = await Economy.findOne({guildID, userID});
    if(!member) {
        member = await create(guildID, userID);
    }
    return member;
};

export async function findServer(guildID: Snowflake) {
    if (!guildID) return null;
    const members = await Economy.find({ guildID: guildID });
    if (members) return members;
    return null;
};

export async function edit(guildID: Snowflake, userID: Snowflake, data: object) {
    await find(guildID, userID);
    let member = await Economy.findOneAndUpdate({guildID, userID}, data, {new:true});
    return await member!.save();
};

export async function update(guildID: Snowflake, userID: Snowflake) {
    let member = await find(guildID, userID);
    let data = createMissingProperties(def, member)
    return edit(guildID, userID, data);
};

export default Economy;