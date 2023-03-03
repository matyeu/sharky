import {model, Schema} from 'mongoose';
import {Snowflake} from 'discord.js';
import {createMissingProperties} from "../Librairie";
const Logger = require("../Librairie/logger");

let Bans = model("Bans", new Schema({
    guildID: String,
    memberBan: String,
    memberStaff: String,
    reason: String,
    reference: String,
    case: Number,
    date: Date,
}));


export const def = {
    guildID: "",
    memberBan: "",
    memberStaff: "",
    reason: "",
    reference: "",
    date: 0,
};

export async function create(id: Snowflake, memberBan: Snowflake, memberStaff: Snowflake, reason: string, date: Number, reference: string, sanctionCase: Number) {
    let ban = new Bans(createMissingProperties(def,
        {guildID: id, memberBan, memberStaff, reason, date, reference, case: sanctionCase}));
    await ban.save();
    Logger.client("Creating a ban in the database");
    return ban;
};

export async function find(id: Snowflake, memberBan: Snowflake) {
    let ban = await Bans.findOne({guildID: id, memberBan: memberBan});
    return ban;
};

export async function findAll(id: Snowflake) {
    let ban = await Bans.find({guildID: id});
    return ban;
}

export async function edit(id: Snowflake, memberBan: Snowflake, data: object) {
    await find(id, memberBan);
    let guild = await Bans.findOneAndUpdate({guildID: id, memberBan: memberBan}, data, {new: true});
    Logger.client("Updating a ban in the database");
    return await guild!.save();
};


export default Bans;