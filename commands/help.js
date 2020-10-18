const fs = require('fs');
const config = require('../config');
const Discord = require('discord.js');

module.exports = {
	name: 'help',
    description_en: 'Cody Commands',
    description_es: 'Comandos de Cody',
	execute(message, args) {
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        var commandsInfo = []; 
        for (const file of commandFiles) {
            const command = require(`./${file}`);
            commandsInfo.push({"name": command.name, "value": command.description_en});
        }
        const helpEmbed = new Discord.MessageEmbed()
            .setColor(config.main_color)
            .setTitle(this.description_en)
            .addFields(commandsInfo)
            .setTimestamp()
            .setFooter('Cody', config.images.sunglasses);
        
		message.channel.send(helpEmbed);
	},
};