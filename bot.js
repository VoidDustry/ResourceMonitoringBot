const { Client, GatewayIntentBits, ActivityType, Events } = require('discord.js');
const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages ] });
require('dotenv').config();

client.login(process.env.DISCORD_TOKEN);

const { cpu } = require('node-os-utils');
const os = require('os');

const commands = {
    trigger: /%(t|trigger)/i,
    ping: /%(p|ping)/i
};

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    setInterval(update, 1000);
});

client.on(Events.MessageCreate, message => {
    const text = message.content;
    if (text.match(commands.trigger))
        message.channel.send("`Host is up.`");

    if (text.match(commands.ping)) {
        message.channel.send("Pinging...").then(msg => {
            const ping = msg.createdTimestamp - message.createdTimestamp;
            msg.edit(`Ping: ${ping}`)
        });
    }
});

const update = async () => {
    const freeMem = Math.floor(os.freemem() / 1024 / 1024);
    const totalMem = Math.floor(os.totalmem() / 1024 / 1024);
    const usedMem = Math.floor(totalMem - freeMem);
    const cpuPercentage = Math.floor(await cpu.usage());

    client.user.setPresence({
        activities: [ {
            name: `RAM: ${usedMem}MB/${totalMem}MB, CPU: ${cpuPercentage}%`,
            type: ActivityType.Watching
        } ], status: 'idle'
    });
}
