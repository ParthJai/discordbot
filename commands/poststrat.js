const discord = require('discord.js');
const Comp = require("../models/comp.js");
const mongoose = require('mongoose');
const client = new discord.Client();
const {prefix,token} = require('../config.json');

module.exports = {
	name: 'poststrat',
	description: 'Save army comps in mongodb',
	async execute(message, args){
		if (args.length != 0){
			message.reply("This command does not need arguments. Just use **"+prefix+"poststrat**.")
			return;
		}
		var roles = [];
		const notAllowedRoles = ['Server Booster','@everyone','WichitA member','Shot N Pot Member', 'Warborn Member','Cah Mbener Member','Flatline 2.0 Member','IR Juanda Member','MY Clan Member'];
		message.guild.roles.cache.forEach((role) => {
			roles.push(role.name);
		}); 

//https://stackoverflow.com/a/46017060/8338799
		for (var i in notAllowedRoles){
			let index = roles.indexOf(notAllowedRoles[i]);
			if (index != -1){
				roles.splice([index],1);
			}
		}
			
		if (!message.member.roles.cache.some(r=>roles.includes(r.name))){
			message.reply("You dont have the write permission");
			return;
		}
		let strat;
		let th;
		let imageurl;
		let cctroops;
		let user; 
		let clashurl;
		const dbURI = "mongodb+srv://rebel:1234@cluster0.0lyb0.mongodb.net/Cluster0?retryWrites=true&w=majority";
		mongoose.connect(dbURI);		
		user = message.author.id;
		const filter = m => m.author.id == message.author.id;
//https://stackoverflow.com/a/62747273/8338799
		message.channel.send("Enter the strat name. Type cancel to stop.");
		try{
			var collectedMessages = await message.channel.awaitMessages(filter, {time: 30000, max: 1});
			strat = collectedMessages.first().content;
			if (strat.toLowerCase() == 'cancel'){
				return message.reply("Bailing out!");
			}
			} catch(e){
				return message.reply("Timeout");
			}
		message.channel.send("Next, Upload the strat image. Type cancel to stop.");
		collectedMessages = await message.channel.awaitMessages(filter, {time: 30000, max: 1 });

		try{
			imageurl = collectedMessages.first().attachments.first().url;
			message.channel.send("Image uploaded successfully");
		}catch{
			message.channel.send("No image found. Exiting");
			return;
		}
		message.channel.send("Next, enter TH level. Type cancel to stop.");
		try{

			collectedMessages = await message.channel.awaitMessages(filter, {time: 30000, max: 1});
			th = collectedMessages.first().content;
			if (th.toLowerCase() == 'cancel'){
				return message.reply("Bailing out!");
			}
		}catch(e){
			return message.reply("timeout");
		}
		message.channel.send("Next, enter the clash url");
		try{
			collectedMessages = await message.channel.awaitMessages(filter, {time: 30000, max: 1});
			clashurl = collectedMessages.first().content;
			if (clashurl.toLowerCase() == 'cancel'){
				return message.reply("Bailing out!");
			}

		}catch(e){
			return message.reply("timeout");
		}
		message.channel.send("Finally, enter additional info. Type cancel to stop.");
		try{
			collectedMessages = await message.channel.awaitMessages(filter, {time: 30000, max: 1});
			cctroops = collectedMessages.first().content;
			if (cctroops.toLowerCase() == 'cancel'){
				return message.reply("Bailing out!");
			}
		}catch (e){
			return message.reply("timeout");
		}

		const comp = new Comp({
			strat: strat.toLowerCase(),
			image: imageurl,
			th: th.toLowerCase(),
			user: user,
			cc: cctroops,
			clashurl: clashurl
		});

		comp.save(function(err,result){
			if (err){
				message.reply("Failed :(");
			}else{
				message.reply('Done!');
			}		
		})
	}
};