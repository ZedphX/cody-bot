const config = require('../config');

module.exports = {
	name: 'kick',
    description_en: 'Kick the user that you mention',
	description_es: 'Expulsa al usuario mencionado',
	userKicked_en: 'The user has been kicked',
	userKicked_es: 'El usuario fue expulsado',
	execute(message, args) {
		const {member, mentions} = message
		if (!member.hasPermission('KICK_MEMBERS') && !member.hasPermission('ADMINISTRATOR')) 
			message.channel.send(config.messages.en.notAllowed);
		else {
			let target = mentions.members.first()

			if(target) {
				target.kick('Only they know')
				message.channel.send(this.userKicked_en)
			} else message.channel.send(config.messages.en.pleaseMentionUser)
		}
	},
};