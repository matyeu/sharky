import {model, Schema} from 'mongoose';
import {Snowflake} from "discord.js";
import {createMissingProperties} from "../Librairie";

const Logger = require("../Librairie/logger");

const Members = model("Members", new Schema({
    guildID: String,
    userID: String,
    invitations: {
      inviteUser: Number,
      inviteBonus: Number,
      inviteLeave: Number
    }
}));

export const def = {
    guildID: "",
    userID: "",
    afk: {
        statut: false,
        reason: ""
    },
    invitations: {
      inviteUser: 0,
      inviteBonus: 0,
      inviteLeave: 0
    }

};

export async function create(guildID: Snowflake, userID: Snowflake) {
    let member = new Members(createMissingProperties(def, {guildID, userID}));
    await member.save();
    Logger.client("Creating a user in the database");
    return member;
};

export async function find(guildID: Snowflake, userID: Snowflake) {
    let member = await Members.findOne({guildID, userID});
    if(!member) {
        member = await create(guildID, userID);
    }
    return member;
};

export async function edit(guildID: Snowflake, userID: Snowflake, data: object) {
    await find(guildID, userID);
    let member = await Members.findOneAndUpdate({guildID, userID}, data, {new:true});
    return await member!.save();
};

export async function update(guildID: Snowflake, userID: Snowflake) {
    let member = await find(guildID, userID);
    let data = createMissingProperties(def, member)
    return edit(guildID, userID, data);
};

export default Members;