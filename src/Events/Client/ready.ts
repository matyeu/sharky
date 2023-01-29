import {SharkClient} from "../../Librairie";
import mongoose from "mongoose";
import {update as updateGuild} from "../../Models/guild";
import chalk from "chalk";

const Logger = require("../../Librairie/logger");
const synchronizeSlashCommands = require('discord-sync-commands-v2');

export default async function (client: SharkClient) {
    console.log(chalk.grey('--------------------------------'));
    Logger.client(`Connected as "${client.user!.tag}"`);
    Logger.client(`For ${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} users, for ${client.channels.cache.size} channels, for ${client.guilds.cache.size} servers discord !`);

    client.user!.setPresence({status: "idle", activities: [{name: `${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} membres`, type: 3}]});

    const connectDB = await mongoose.connect(process.env.DBCONNECTION!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        autoIndex: false,
        poolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4
    }).then(() => {
        Logger.client(`Connected to the database`);
    }).catch(err => {
        Logger.error("Connection failed. Try reconnecting in 5 seconds...");
        setTimeout(() => connectDB, 5000);
        Logger.error(`${err}`)
    })

    mongoose.Promise = global.Promise;
    console.log(chalk.grey('--------------------------------'));


    for (let guild of client.guilds.cache.map(guild => guild)) {
        await updateGuild(guild.id);

        await synchronizeSlashCommands(client, client.slashCommands.map(command => command.slash.data), {
            debug: false,
            guildId: guild.id // remove this property to use global commands
        });

        for (const command of client.slashCommands.map(command => command)) {

            await guild.commands.create(command.slash.data);
        }
    }


}