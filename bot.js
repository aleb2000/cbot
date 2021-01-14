const Discord = require('discord.js');
const client = new Discord.Client();

const channelName = "counting";

const countingName = "counting";
const countingDiscriminator = "5250";

const ballotBoxEmojiName = '☑️';
const whiteCheckEmojiName = '✅';

const intervalTrigger = 300;
const roleId = '799378989025198121';
const resetRoleAt = 86400000;

client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageReactionAdd', (reaction, user) => {
	if(reaction.message.channel.name == channelName && user.bot && user.username == countingName && user.discriminator == countingDiscriminator
		&& (reaction.emoji.name == ballotBoxEmojiName || reaction.emoji.name == whiteCheckEmojiName)) {

		let num = parseInt(reaction.message.content);
		console.log(`User selected number ${num}`);
		if(num % intervalTrigger == 0) {
			reaction.message.guild.roles.fetch(roleId)
			.then(role => {
				reaction.message.member.roles.add(role).catch(console.error);
				setTimeout(() => {
					reaction.message.member.roles.remove(role).catch(console.error);
				}, resetRoleAt);
			}).catch(console.error);
		}
	}
});

client.login('Nzk5MzQ1NDYzNjI2MDM5MzQ3.YACOeQ.Mm0l3W7vYO5dAUZvL-T2cF5Itmg');
