const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
    client.user.setPresence({ activity: { name: config.status.activity }, status: config.status.status });
    console.log(config.messages.start);
});

process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    console.log(args);
    const command = args.shift().toLowerCase();
    
    if (!client.commands.has(command)) return;

	try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
		console.error(error);
		message.reply(config.command_error);
	}
});

client.login(process.env.TOKEN);