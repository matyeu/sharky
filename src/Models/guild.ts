import {model, Schema} from "mongoose";
import {Snowflake} from "discord.js";
import {createMissingProperties} from "../Librairie";

const Logger = require("../Librairie/logger");

let Guild = model(
    "Guild",
    new Schema({
        guildID: String,
        administrators: Array,
        maintenance: {
            state: Boolean,
            reason: String,
            commandes: Array,
            category: Array,
        },
        language: String

    })
);

export const def = {
    guildID: "",
    administrators: Array,
    maintenance: {
        state: false,
        reason: "",
        commandes: Array,
        category: Array,
    },
    language: "fr-FR"
};

export async function create(id: Snowflake) {
    let guild = new Guild(createMissingProperties(def, {guildID: id}));
    await guild.save();
    Logger.client("Creating a server in the database");
    return guild;
}

export async function find(id: Snowflake) {
    let guild = await Guild.findOne({guildID: id});
    if (!guild) guild = await create(id);
    return guild;
}

export async function edit(id: Snowflake, data: object) {
    await find(id);
    let guild = await Guild.findOneAndUpdate({guildID: id}, data, {
        new: true,
    });
    return await guild!.save();
}

export async function update(id: Snowflake) {
    let guild = await find(id);
    let data = createMissingProperties(def, guild);
    return edit(id, data);
}

export default Guild;
