const { Client } = require('clashofclans.js');
const {__, None, COC_API_TOKEN} = require("../config.json");
const coc_client = new Client({ token: COC_API_TOKEN, timeout: 5000 });

const snp = '#8RGPYRLO';
const cah = '#Y88VYY8R';
const warborn = '#998OCP8G';
const mc = '#2OCGPQYQV';


async function buildprofile(message, MessageEmbed,args){
	try {
	const clanInfo = await coc_client.clan(args);
	console.log(clanInfo);
	const embed = new MessageEmbed()
	.setColor('#EFFF00')
	.setTitle(clanInfo.name)
	.setURL('https://link.clashofclans.com/en?action=OpenClanProfile&tag='+args.slice(1))
	.addFields(
		{name:'Description', value: clanInfo.description},
		{name: "Level", value: clanInfo.clanLevel, inline: true},
		{name: "Members", value: clanInfo.members, inline: true},
		{name: "League", value: clanInfo.warLeague.name, inline: true},
		)
		.setImage(clanInfo.badgeUrls.medium)
		.setTimestamp();
		message.channel.send(embed);
	} catch (error){
		console.error(error);
	}
}

module.exports = {
	name: 'profile',
	description: 'To display profile of clans- cah, warborn, snp, mc',
	snp:'#8RGPYRLO',
	cah:'#Y88VYY8R',
	mc:'#2OCGPQYQV',
	warborn:'#998OCP8G',	
	execute(message, args, MessageEmbed){
		if (args[0] === 'cah'){
			buildprofile(message, MessageEmbed, cah);
		}
		else if (args[0] === 'snp'){
			buildprofile(message, MessageEmbed, snp);
		}
		else if (args[0] === 'mc'){
			buildprofile(message, MessageEmbed, mc);
		}
		else if (args[0] === 'warborn'){
			buildprofile(message, MessageEmbed, warborn);
		} else{
			message.channel.send('There was either a typo in the command argument or the clan is not in the record!');
		}		
	}

};