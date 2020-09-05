// importing Discord.js
const Discord = require('discord.js')
const { BOT_TOKEN } = require('./token')

client = new Discord.Client();

client.on('ready' , () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.on('message', msg => {
    if (msg.content === `!!play`) {
        console.log(msg.content);
        try {
            msg.channel.send(buildMap(6,4))
        } catch(err) {
            console.log(err)
        }
    }
});

client.login(BOT_TOKEN)

function player() {
    const facha = `:sunglasses:`
    let pos_x = 1
    let pos_y = 1
}

function buildMap(col, row) {
    const top_right_corner = [`╗ `]
    const top_left_corner = [`╔`]
    const bottom_right_corner = [`╝`]
    const bottom_left_corner = [`╚`]
    const bottom_left_corner2 = [`╚`]
    const horizontal_frame = [`═`]
    const inside = [`░`]
    const vertical_frame = [`║ \n`]
    const vertical_frame2 = [`\n║`]
    
    let map = [`${top_left_corner}`];

    let x = 1
    let y = 1
    let positionCount = 0

    for (i=0;i<row;i++) {
        console.log(`row N° = ${y}`)
        if (y != 1 && y != row) {
            map = map.slice(0, -1) + vertical_frame2
        } else if (y == row) {
            map = map.slice() + bottom_left_corner2
        }
        for (j=0;j<col;j++){
            console.log(`column N° ${x}`)
            if (y == 1 || y == row) {
                map += horizontal_frame
            } else {
                map += inside
            }
            x++
        }
        if (y == 1) {
            map = map.slice(0, -1) + top_right_corner
            y++
        } else if ( y == row) {
            map = map.slice(0, -1) + bottom_right_corner
            y++
        } else {
            map = map.slice(0, -1) + vertical_frame
            y++
        }

        //map += "\n"
    }
    console.log(map.length)
    return map.toString()
}

String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

//NzUwNDYzNzA5ODc2NTg0NjI5.X065yw.A2cGGifmW5tvckDFo8QhSzb04bQ

/*firstFrame = `
    ╔═══════════════════════════════════╗\n
    ║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║\n
    ║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║\n
    ║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║\n
    ║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║\n
    ║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║\n
    ║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║\n
    ║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║\n
    ║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║\n
    ║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║\n
    ║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║\n
    ║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║\n
    ║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║\n
    ║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║\n
    ║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║\n
    ║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║\n
    ╚═══════════════════════════════════╝`;*/

