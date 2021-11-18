const clashApi = require('clash-of-clans-api');
const Discord = require('discord.js');
const {prefix,token} = require('./config.json');
const client = new Discord.Client();
const COC_API_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjI3ZGI2OTNmLWI2NjQtNGQxZi1hYjRlLTU3ZjVjODI1NzNiYSIsImlhdCI6MTYyMDI4OTI5OSwic3ViIjoiZGV2ZWxvcGVyL2ExZWFkYjg5LTljYTUtOGRhMS1lNWJhLWY5ZWQ2MThhOTAzOCIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjE1Ny40Ny4yMDcuMjAiXSwidHlwZSI6ImNsaWVudCJ9XX0.tDlr26Sga-5v3pMmFWc_x08jULmhK5BPxGfGb2do3zKyVgvsGyJ_rgvcV9iOAa4grCmPC7uCQfkyMmBtHICrig";
let coc_client = clashApi({
	token: COC_API_TOKEN
});

var name;
var tag;
var des;
var badge;
var lvl;
var members;
var name;
var league;
var join_link;
var snp = '#8RGPYRLO';
var cah = '#Y88VYY8R';
var warborn = '#998OCP8G';
var mc = '#2OCGPQYQV';

async function showClanInfo (tag) {
	try{
		const clanInfo = await coc_client.clanByTag(tag);
		name = clanInfo.name;
		tag = clanInfo.tag;
		des = clanInfo.description;
		badge = clanInfo.badgeUrls.medium;
		lvl = clanInfo.clanLevel;
		members = clanInfo.members;
		league = clanInfo.warLeague.name;
		join_link = 'https://link.clashofclans.com/en?action=OpenClanProfile&tag=' + tag;
		console.log(tag);
		console.log(des);
		console.log(badge);
		console.log(lvl);
		console.log(members);
		console.log(name);
		console.log(league);
	} catch (error) {
		console.error(error);
	}
}
client.on('message', async message => {
	const exampleEmbed = {
		color: 0x0099ff,
		title: name,
		description: des,
		fields: [
			{
				name: '\u200b',
				value: '\u200b',
				inline: false,
			},
			{
				name: 'League',
				value: league,
				inline: true,
			},
			{
				name: 'Members',
				value: members,
				inline: true,
			},
			{
				name: 'Clan Level',
				value: lvl,
				inline: true,
			},
			{
				name: 'Link',
				value: join_link,
				inline: false,
			},
		],
		image: {
			url: badge,
		},
		timestamp: new Date(),
	};
	if (message.content === `${prefix}cah-profile`) {
		await showClanInfo(cah);
		message.channel.send({ embed: exampleEmbed });
	}else if (message.content === `${prefix}snp-profile`){
		await showClanInfo(snp);
		message.channel.send({ embed: exampleEmbed });
	}else if (message.content === `${prefix}warborn-profile`){
		await showClanInfo(warborn);
		message.channel.send({ embed: exampleEmbed });
	}else if (message.content === `${prefix}mc-profile`){
		await showClanInfo(mc);
		message.channel.send({ embed: exampleEmbed });
	}
});
client.login(token);
