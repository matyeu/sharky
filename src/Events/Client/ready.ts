import {SharkClient} from "../../Librairie";
import mongoose from "mongoose";
import {find as findClient} from "../../Models/client";
import {update as updateGuild, find as findGuild, edit as editGuild} from "../../Models/guild";
import {update as updateEconomy} from "../../Models/economy";
import chalk from "chalk";
import {readdirSync} from "fs";
import {SERVER_EMOJI, SERVER_SUPPORT} from "../../config";

const Logger = require("../../Librairie/logger");
const synchronizeSlashCommands = require('discord-sync-commands-v2');

export default async function (client: SharkClient) {
    console.log(chalk.grey('--------------------------------'));
    Logger.client(`Connected as "${client.user!.tag}"`);
    Logger.client(`For ${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} users, for ${client.channels.cache.size} channels, for ${client.guilds.cache.size} servers discord !`);

    client.user!.setPresence({status: "idle", activities: [{name: `${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} membres`, type: 3}]});

    const startTime = Date.now();

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
        const finishTime = Date.now();
        Logger.client(`Connected to the database (${finishTime - startTime} ms)`);
    }).catch(err => {
        Logger.error("Connection failed. Try reconnecting in 5 seconds...");
        setTimeout(() => connectDB, 5000);
        Logger.error(`${err}`)
    })

    mongoose.Promise = global.Promise;
    console.log(chalk.grey('--------------------------------'));

    await findClient(SERVER_SUPPORT)


    for (let guild of client.guilds.cache.map(guild => guild)) {
        if (guild.id === SERVER_EMOJI) continue;
        const serverConfig: any = await findGuild(guild.id);

        await updateGuild(guild.id);

        for (const member of guild.members.cache.map(member => member)) {
            if (member.user.bot) continue;
            if (member.guild.id === SERVER_EMOJI) continue;

            await updateEconomy(guild.id, member.user.id);

        }

        const categoryFolder = readdirSync('./src/Commands');
        for (const categoryName of categoryFolder) {
            let modulesDatabase =  serverConfig.maintenance.category;
            const moduleAlready = modulesDatabase.find((e: any) => e.categoryName == categoryName);

            if (!moduleAlready) {
                modulesDatabase.push({categoryName, state: false, reason: ""});
                await editGuild(guild.id, serverConfig);
            }
        }

        await synchronizeSlashCommands(client, client.slashCommands.map(command => command.slash.data), {
            debug: false,
            guildId: guild.id // remove this property to use global commands
        });

        for (const command of client.slashCommands.map(command => command)) {
            const cmdDatabase =  serverConfig.maintenance.commandes;
            const cmdName = command.slash.data.name;

            await guild.commands.create(command.slash.data);

            const commandAlready = cmdDatabase.find((e: any) => e.cmdName == cmdName);

            if (!commandAlready) {
                cmdDatabase.push({cmdName, state: false, reason: ""});
                await editGuild(guild.id, serverConfig);
            }
        }
    }


}