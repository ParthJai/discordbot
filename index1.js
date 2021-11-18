const { Client, MessageEmbed, Collection } = require('discord.js');

const fs = require('fs');
const client = new Client();
const {prefix,token} = require('./config.json');

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	if (!client.commands.has(command)){
		message.channel.send('Command does not exist');
		return;
	}
	try{
		client.commands.get(command).execute(message,args,MessageEmbed);
	}catch (error){
		console.error(error);
		message.reply('There was an error trying to execute that command.')
	}
});
client.login(token);