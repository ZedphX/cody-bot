var config = {};

config.prefix = '_';
config.main_color = '#c4ff0e';
config.invite = 'https://discord.com/oauth2/authorize?client_id=767093789298393119&permissions=271861830&scope=bot';

config.beta = {};
config.beta.invite = 'https://discord.com/api/oauth2/authorize?client_id=767244993064468511&permissions=271861830&scope=bot';

config.images = {};
config.images.logo = 'https://i.imgur.com/PBSEn32.png';
config.images.sunglasses = 'https://i.imgur.com/OKh8882.png';

config.status = {};
config.status.activity = '-help Really Work In Progress';
config.status.status = 'online';

config.messages = {};
config.messages.en = {};
config.messages.es = {};
config.messages.start = 'Cody BOT starts!';

//English Messages
config.messages.en.command_error = 'There was an error trying to execute that command!';
config.messages.en.notAllowed = 'You are not allowed to use this command';
config.messages.en.invalidUser = 'Invalid user';
config.messages.en.pleaseMentionUser = 'Please mention a valid user';
config.messages.en.lackPermission = 'Cody is not allowed to do this';
//Spanish Messages
config.messages.es.command_error = 'Hubo un error al intentar ejecutar el comando!';
config.messages.es.notAllowed = 'No tienes permitido usar este comando';

module.exports = config;