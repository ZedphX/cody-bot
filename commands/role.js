const config = require('../config');

module.exports = {
	name: 'role',
    description_en: 'Manage your servers roles!: role {add, remove} {role name} {user}',
    description_es: 'Administra los roles de tu servidor!: role {add, remove} {nombre de rol} {user}',
	execute(message, args) {
		const {member, mentions} = message
		if (!member.hasPermission('MANAGE_ROLES') && !member.hasPermission('ADMINISTRATOR')) 
			message.channel.send(config.messages.en.notAllowed)
		else {
			let target = mentions.members.first()

			if(target) {
				let role = message.guild.roles.find(r => r.name === args[2])
				switch (args[1]) {
					case 'add':
						target.roles.add(role)
						break;
					
					case 'remove':
						target.roles.remove(role)
						break;
				
					default:
						break;
				}
			} else message.channel.send(config.messages.en.pleaseMentionUser)
		}
	},
};