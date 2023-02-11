import {model, Schema} from 'mongoose';
import {Snowflake} from "discord.js";
import {createMissingProperties} from "../Librairie";

const Logger = require("../Librairie/logger");

let Client = model("Client", new Schema({
    administrators: Array,
    support: String,
}));

export const def = {
    administrators: Array,
    support: "1071891755911368806"
};

export async function create(id: Snowflake) {
    let client = new Client(createMissingProperties(def, {support: id}));
    await client.save();
    Logger.client("Creating a client in the database");
    return client;
};

export async function find(id: Snowflake) {
    let client = await Client.findOne({support: id});
    if(!client) client = await create(id);
    return client;
};

export default Client;