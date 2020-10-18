const config = require('../config');

module.exports = {
	name: 'role',
    description_en: 'Manage your servers roles!: role {add, remove} {role name} {user}',
	description_es: 'Administra los roles de tu servidor!: role {add, remove} {nombre de rol} {user}',
	role_add_en: 'Role added to the user',
	role_remove_en: 'Role removed from the user',
	plsValidRole_en: 'Please name a valid role',
	execute(message, args) {
		const {member, mentions} = message
		if (!member.hasPermission('MANAGE_ROLES') && !member.hasPermission('ADMINISTRATOR')) 
			message.channel.send(config.messages.en.notAllowed)
		else {
			let target = mentions.members.first()

			if(target) {
				let role = message.guild.roles.cache.find(r => r.name === args[1]) || null;
				console.log(role);
				if(role == null) return message.channel.send(this.plsValidRole_en);

				if(args[0] === 'add') {
					target.roles.add(role)
					message.channel.send(this.role_add_en)
				} else if(args[0] === 'remove') {
					target.roles.remove(role)
					message.channel.send(this.role_remove_en)
				}
			} else message.channel.send(config.messages.en.pleaseMentionUser)
		}
	},
};