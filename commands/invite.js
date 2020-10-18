const config = require('../config');
const Discord = require('discord.js');

module.exports = {
	name: 'invite',
    description_en: 'Gives you the invite link',
	description_es: 'Te da el enlace de invitación',
	title_en: 'Invite Link',
	title_es: 'Enlace de invitación',
	execute(message, args) {
		const inviteEmbed = new Discord.MessageEmbed()
            .setColor(config.main_color)
			.setTitle(this.title_en)
			.setURL(config.invite)
            .setTimestamp()
            .setFooter('Cody', config.images.sunglasses);
		message.channel.send(inviteEmbed);
	},
};