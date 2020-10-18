const config = require('./config');
const ytdl = require("ytdl-core");

module.exports = {
    _queue: new Map(),
    executeQueue: async function (message, serverQueue) {
        const args = message.content.split(" ");
    
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.channel.send(config.messages.en.voiceChannel);

        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) 
            return message.channel.send(config.messages.en.lackPermission);
    
        const songInfo = await ytdl.getInfo(args[1]);
        const song = {
        title: songInfo.title,
        url: songInfo.video_url
        };
    
        if (!serverQueue) {
        const queueContruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        };
    
        this._queue.set(message.guild.id, queueContruct);
    
        queueContruct.songs.push(song);
    
        try {
            var connection = await voiceChannel.join();
            queueContruct.connection = connection;
            this.play(message.guild, queueContruct.songs[0]);
        } catch (err) {
            console.log(err);
            this._queue.delete(message.guild.id);
            return message.channel.send(err);
        }
        } else {
        serverQueue.songs.push(song);
        return message.channel.send(`${song.title} has been added to the queue!`);
        }
    },
    skip: function(message, serverQueue) {
        if (!message.member.voice.channel)
        return message.channel.send(config.messages.en.voiceChannel);
        if (!serverQueue)
        return message.channel.send("There is no song that I could skip!");
        serverQueue.connection.dispatcher.end();
    },
    stop: function(message, serverQueue) {
        if (!message.member.voice.channel)
        return message.channel.send(config.messages.en.voiceChannel);
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
    },
    play: function(guild, song) {
        const serverQueue = this._queue.get(guild.id);
        if (!song) {
        serverQueue.voiceChannel.leave();
        this._queue.delete(guild.id);
        return;
        }
    
        const dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
            serverQueue.songs.shift();
            this.play(guild, serverQueue.songs[0]);
        })
        .on("error", error => console.error(error));
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
        serverQueue.textChannel.send(`Start playing: **${song.title}**`);
    }
};