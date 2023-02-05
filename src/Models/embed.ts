import {model, Schema} from "mongoose";
import {Snowflake} from "discord.js";
import {createMissingProperties} from "../Librairie";

const Logger = require("../Librairie/logger");

let Embed = model("Embed", new Schema({
    guildID: String,
    userID: String,
    embeds: Array,
    embedEdit: Number
}));

export const def = {
    guildID: "",
    userID: "",
    embeds: Array,
    embedEdit: 1
};

export async function create(id: Snowflake, member: Snowflake, firstEmbed: Array<object>) {
    let guild = new Embed(createMissingProperties(def, {guildID: id, userID: member, embeds: firstEmbed}));
    await guild.save();
    Logger.client("Creating a embed in the database");
    return guild;
}

export async function find(id: Snowflake, member: Snowflake) {
    return Embed.findOne({guildID: id, userID: member});
}

export async function edit(id: Snowflake, member: Snowflake, data: object) {
    await find(id, member);
    let embed = await Embed.findOneAndUpdate({guildID: id, userID: member}, data, {
        new: true,
    });
    return await embed!.save();
}

export default Embed;
