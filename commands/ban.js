const config = require('../config');

module.exports = {
	name: 'ban',
    description_en: 'Ban the user that you mention',
	description_es: 'Banea al usuario mencionado',
	userBanned_en: 'The user has been banned',
	userBanned_es: 'El usuario fue baneado',
	execute(message, args) {
		const {member, mentions} = message

		if (!member.hasPermission('BAN_MEMBERS') && !member.hasPermission('ADMINISTRATOR')) 
			return message.channel.send(config.messages.en.notAllowed);

		let target = mentions.members.first()

		if(target) {
			target.ban({days: 0, reason: 'Only they know'})
			message.channel.send(this.userBanned_en)
		} else message.channel.send(config.messages.en.pleaseMentionUser)
	},
};