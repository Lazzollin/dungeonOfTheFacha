// importing Discord.js
const Discord = require('discord.js')
const { BOT_TOKEN } = require('./token')

client = new Discord.Client();

client.on('ready' , () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

let player_x = 0
let player_y = 0

let map_x = 10
let map_y = 9

client.on('message', msg => {
    if (msg.content === `//play`) {
        player_x = 0
        player_y = 0
        let currentUser = [msg.author.id, msg.author.username]
        console.log(msg.content, currentUser);
            msg.channel.send(buildMap(map_x, map_y)).then(sentMessage => {
                const messageID = sentMessage.id
                sentMessage.react('➡')
                console.log('reacted with right arrow')
                sentMessage.react('⬅')
                console.log('reacted with left arrow')
                sentMessage.react('⬆')
                console.log('reacted with up arrow')
                sentMessage.react('⬇')
                console.log('reacted with down arrow')

                const filter = (reaction, user) => user.id === currentUser[0] && (
                    reaction.emoji.name === '➡' ||
                    reaction.emoji.name === '⬅' ||
                    reaction.emoji.name === '⬆' ||
                    reaction.emoji.name === '⬇'
                );

                let collector = sentMessage.createReactionCollector(filter, { time: 50000 });
                collector.on('collect', (reaction, collector) => {
                    console.log('got a reaction');
                    //console.log(reaction)
                    switch (reaction.emoji.name) {
                        case '➡':
                            if (player_x - 2 != map_x) {
                                player_x ++
                                console.log('move right')

                                sentMessage.edit(buildMap(map_x, map_y))
                                
                            } else {
                                console.log('can\'t move right')
                            }
                            break;
                        case '⬅':
                            if (player_x = 0) {
                                console.log('can\'t move left')
                            } else {
                                player_x - 1
                                console.log('move left')

                                sentMessage.edit(buildMap(map_x, map_y))
                            }
                            break;
                        case '⬆':
                            if (player_y = 0) {
                                console.log('can\'t move up')
                                break;
                            } else {
                                player_y = player_y - 1
                                console.log('move up')

                                sentMessage.edit(buildMap(map_x, map_y))
                            }
                            break;
                        case '⬇':
                            if (player_y - 1 == map_y) {
                                console.log('can\'t move down')
                            } else {
                                player_y ++
                                console.log('move down')

                                sentMessage.edit(buildMap(map_x, map_y))
                            }
                            break;
                    }
                    
                });
                collector.on('end', collected => {
                    console.log(`collected ${collected.size} reactions`);
                });
            })
    }
});

client.login(BOT_TOKEN)

function buildMap(col, row) {
    console.log(`map size is ${col} x ${row}`)
    const top_right_corner = [`╗ `]
    const top_left_corner = [`╔`]
    const bottom_right_corner = [`╝`]
    const bottom_left_corner = [`╚`]
    const bottom_left_corner2 = [`╚`]
    const horizontal_frame = [`══`]
    const inside = [`░░`]
    const vertical_frame = [`║ \n`]
    const vertical_frame2 = [`\n║`]
    const facha = [`:sunglasses:`]
    
    let map = [`${top_left_corner}`];

    let x = 1
    let y = 1

    for (i=0;i<row;i++) {
        //console.log(`y : ${y}`)
        if (y != 1 && y != row) {
            map = map.slice(0, -1) + vertical_frame2
        } else if (y == row) {
            map = map.slice() + bottom_left_corner2
        }
        for (j=0;j<col;j++){
            //console.log(`x : ${x}`)
            if (y == 1 || y == row) {
                map += horizontal_frame
            } else if (player_x+1 == x && player_y+2 == y) {
                map += facha
            } else {
                map += inside
            }
            x++
        }
        x = 1
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
    //console.log(map.length)
    return map.toString()
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

