const music = require('../music');

module.exports = {
	name: 'skip',
    description_en: 'Skip the next song',
	description_es: 'Salta la siguiente canción',
	execute(message, args) {
		if (message.channel.type === 'dm') return;

		const serverQueue = music._queue.get(message.guild.id);
		music.skip(message, serverQueue);
	},
};