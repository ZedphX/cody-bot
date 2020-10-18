const config = require('../config');
const Discord = require('discord.js');
const { messages } = require('../config');

module.exports = {
	name: 'avatar',
    description_en: 'Shows avatar of the user you mention',
	description_es: 'Muestra el avatar del usuario mencionado',
	avatar_en: "'s Avatar",
	execute(message, args) {

		let target = message.mentions.users.first() || message.author

		embed = new Discord.MessageEmbed()
			.setTitle((target.displayName || target.username) + this.avatar_en)
			.setImage(target.user ? target.user.displayAvatarURL() : target.displayAvatarURL())
			.setColor(config.main_color)
			.setTimestamp()
            .setFooter('Cody', config.images.sunglasses);
		
 		message.channel.send(embed);
	},
};