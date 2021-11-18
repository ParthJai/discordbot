const tags = require('./profile.js');
module.exports = {
	name : 'tag',
	description: 'Get family clan tag',
	async execute (message, args, MessageEmbed){
		if (args[0] === 'cah'){
			await message.channel.send(tags.cah);
		}
		else if (args[0] === 'snp'){
			await message.channel.send(tags.snp);
		}
		else if (args[0] === 'mc'){
			await message.channel.send(tags.mc);
		}
		else if (args[0] === 'warborn'){
			await message.channel.send(tags.warborn);		
		}else {
			await message.channel.send("Clan not in family");
		}
	}
}