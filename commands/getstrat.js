const discord = require('discord.js');
const Comp = require("../models/comp.js");
const mongoose = require('mongoose');
const client = new discord.Client();
const {prefix,token} = require('../config.json');

module.exports = {
	name: 'getstrat',
	description: 'get army comps from mongodb',
	async execute(message, args, MessageEmbed){
		
		if (args.length != 0){
			message.reply("This command does not need arguments. Just use **"+prefix+"getstrat**.")
			return;
		}
		const dbURI = "mongodb+srv://rebel:1234@cluster0.0lyb0.mongodb.net/Cluster0?retryWrites=true&w=majority";
		mongoose.connect(dbURI);
		const result = await Comp.find({});
		var embed = new MessageEmbed();
		for (i=0;i<result.length;i++){
			var User = message.guild.members.cache.get(result[i]['user']).user.username;
			embed
			.setColor ('#EFFF00')
			.setTitle('Saved strats overview')
			.addFields(
			{name: "Strat name", value: result[i]['strat']+"\n", inline: true},
			{name:'Th level', value: result[i]['th']+"\n", inline: true},
			{name: "Strat by", value: User+"\n", inline: true},
			);
		
		}
		message.channel.send(embed);
		let search;
		let detailedSearch;
		var ifExists = 0;
		const filter = m => m.author.id == message.author.id;
		message.channel.send("Now choose the search parameter- strat/th. Type cancel to stop.")
		try{
			var collectedMessages = await message.channel.awaitMessages(filter, {time: 30000, max: 1});
			search = collectedMessages.first().content.toLowerCase();
			if(search.toLowerCase() == 'cancel'){
				message.reply('Bailing out!')
				return;
			}
		}catch(e){
			message.reply("Timeout");
		}
		message.channel.send("Now enter the "+search+". Type cancel to stop.");
		try{
			collectedMessages = await message.channel.awaitMessages(filter, {time: 30000, max: 1});
			detailedSearch = collectedMessages.first().content.toLowerCase();
			if(detailedSearch.toLowerCase() == 'cancel'){
				message.reply('Bailing out!')
				return;
			}
		}catch(e){
			message.reply("Timeout");
		}
		for (var i = 0; i < result.length; i++){
			if (result[i][search] != detailedSearch){ 
				continue;
			}
			ifExists++;

			embed = new MessageEmbed()
				.setColor("#EFFF00")
				.setTitle(result[i]['strat'])
				.setURL(result[i]['clashurl'])
				.addFields(
					{name: "Th level", value: result[i]['th']},
					{name: "Strat by", value: User, inline: false},
					{name: "Description", value: result[i]['cc'], inline: false},
				)
				.setImage(result[i]['image']);
				message.channel.send(embed);
		}
		if (!ifExists){
			message.reply("No strat with that query exists in db");
			return;
		}

	}

};