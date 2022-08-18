const Discord = require('discord.js');
const client = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGES]});
const token = require('./data/token.json');
client.login(token.token);
const osu = require('node-os-utils');const cpu = osu.cpu;      
const count = cpu.count();var os = require('os');
const commands = {
    trigger: /%(t|trigger)/i,
    ping: /%(p|ping)/i
};
client.on('ready', () => console.log(`Logged in as ${client.user.tag}`));
client.on('messageCreate', message => {
    var freemem = os.freemem();
    var totalmem = os.totalmem();
    var mem_total = Math.floor((totalmem/1024)/1024);
    var mem_total_output = `${mem_total+" mb "}`;
    var mem_use = `${Math.floor(mem_total-((freemem/1024)/1024))+" / "}`;
    cpu.usage().then(cpuPercentage => { var cpuPercentageOutput = Math.floor(cpuPercentage);client.user.setActivity(`${mem_use} ${mem_total_output}, CPU:${cpuPercentageOutput}%`, {type: "STREAMING", url: "https://www.twitch.tv/tomoko_4"});});
    const text = message.content;
    if(text.match(commands.trigger)){message.channel.send("`Host is up.`")};
    if(text.match(commands.ping)){message.channel.send("Pinging...").then(msg => {var ping = msg.createdTimestamp - message.createdTimestamp;msg.edit(`Ping: ${ping}`)})};
});
