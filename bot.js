const Discord = require('discord.js')
const { BOT_TOKEN } = require('./token')
const { autoSetup } = require('./autosetup')
const { music } = require('./music')
const { game } = require('./game')


client = new Discord.Client();

client.on('ready' , () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    switch (message.content) {
        case '//play':
            game(message)
            break
        case '//setup':
            if (message.member.hasPermission('BAN_MEMBERS')) {
                autoSetup(message)
            } else {
                message.channel.send('Wait, that\'s illegal')
            }
        case '//music':
            music(message)
    }
});

client.login(BOT_TOKEN)

//https://www.youtube.com/watch?v=X33nc9XXNYs