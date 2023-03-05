import {model, Schema} from 'mongoose';
import {Snowflake} from 'discord.js';
import {createMissingProperties} from "../Librairie";
const Logger = require("../Librairie/logger");

let Mutes = model("Mute", new Schema({
    guildID: String,
    case: Number,
    memberMute: String,
    memberStaff: String,
    reason: String,
    reference: String,
    date: Date,
}));


export const def = {
    guildID: "",
    case: Number,
    memberMute: "",
    memberStaff: "",
    reason: "",
    time: 0,
    reference: "",
    date: 0,
};

export async function create(guildID: Snowflake, id: Snowflake, memberMute: Snowflake, memberStaff: Snowflake, reason: String, date: Number, reference: String) {
    let mute = new Mutes(createMissingProperties(def,
        {guildID, case: id, memberMute, memberStaff, reason, date, reference}));
    await mute.save();
    Logger.client("Creating a mute in the database");
    return mute;
};

export async function find(id: Snowflake, memberMute: Snowflake) {
    let mute = await Mutes.findOne({guildID: id, memberMute: memberMute});
    return mute;
};

export async function findAll(id: Snowflake) {
    let mute = await Mutes.find({guildID: id});
    return mute;
}

export async function edit(id: Snowflake, memberMute: Snowflake, data: object) {
    await find(id, memberMute);
    let mute = await Mutes.findOneAndUpdate({guildID: id, memberMute: memberMute}, data, {new: true});
    return await mute!.save();
};


export default Mutes;