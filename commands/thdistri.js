const { Client } = require('clashofclans.js');
const {_, none, COC_API_TOKEN} = require("../config.json");
const coc_client = new Client({ token: COC_API_TOKEN, timeout: 5000 });


module.exports = {
	name: 'thdistri',
	description: 'To display TH distribution of any clan',
	async execute(message, args, MessageEmbed){
		var filtered = [];
		var result = { };
		var th = [];
		if (args[0].charAt(0) != '#'){
			args[0] = '#'+args[0];
		}
		const data = await coc_client.clan(args[0]);
		if (data.reason == 'notFound'){
			message.channel.send("No clan exists with that tag. Make sure there wasnt any typo or it isnt a profile tag.");
			return;
		}
		const members = await coc_client.detailedClanMembers(data.memberList);
		for (let player = 0; player < members.length; player++ ){
			filtered.push(members[player]['townHallLevel']);
		}
		th = Array.from(new Set(filtered));
		th.map(String);
		const embed = new MessageEmbed()
			.setColor('#EFFF00')
			.setTitle('Town Hall Distribution of '+data['name']);
		for(var i = 0; i < filtered.length; ++i) {
	    	if(!result[filtered[i]])
	       		result[filtered[i]] = 0;
	    		++result[filtered[i]];
		}
		for (var i=0;i<th.length;i++){
			embed.addField("TH" + th[i], result[th[i]].toString());
		}
		message.channel.send(embed);						
		}

};
