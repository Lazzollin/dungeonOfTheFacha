const Discord = require('discord.js');
const client = new Discord.Client();

function game() {
    p = ":sunglasses:";
    firstFrame = `\n╬═══════════════════════════════════╬\n║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║\n║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║\n║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║\n║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║\n║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║\n║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║\n║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║\n║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║\n║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║\n║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║\n║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║\n║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║\n║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║\n║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║\n║░░░${p}░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║\n╬═══════════════════════════════════╬`

    
    var frame = firstFrame;

    return(frame)
}

client.on('ready' , () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'juegar') {
        console.log(msg.user);
        msg.channel.send(game());
    }
});

client.login('NzUwNDYzNzA5ODc2NTg0NjI5.X065yw.A2cGGifmW5tvckDFo8QhSzb04bQ')


function frame() {
    return(this.$firstFrame)
};

//NzUwNDYzNzA5ODc2NTg0NjI5.X065yw.A2cGGifmW5tvckDFo8QhSzb04bQ

/*var numero = Math.floor(Math.random() * 5);
    console.log(numero)
    switch(numero) {
        case 0:
            return ("Laza gei");
            break;
        case 1:
            return ("Mateo gei");
            break;
        case 2:
            return ("Tronce gei");
            break;
        case 3:
            return ("Manu gei");
            break;
        case 4:
            return ("Balido gei");
            break;
    }*/