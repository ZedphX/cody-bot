const music = require('../music');

module.exports = {
	name: 'stop',
    description_en: 'Stop playing music',
	description_es: 'Detiene la música',
	execute(message, args) {
		if (message.channel.type === 'dm') return;

		const serverQueue = music._queue.get(message.guild.id);
		music.stop(message, serverQueue);
	},
};