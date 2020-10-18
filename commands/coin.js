module.exports = {
	name: 'coin',
    description_en: 'Throw a coin to your witcher!',
	description_es: 'Tira una moneda',
	execute(message, args) {
        var options = ['Heads!','Tails!'];
        var random = Math.floor(Math.random() * Math.floor(max)); //0 or 1
        
        message.channel.send(options[random]);
	},
};