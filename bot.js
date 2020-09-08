// importing Discord.js
const Discord = require('discord.js')
const { BOT_TOKEN } = require('./token')
const { levels } = require('./levels.js')

client = new Discord.Client();

client.on('ready' , () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

let player_x = 0
let player_y = 0

let map_x = 10
let map_y = 12

let timer = 120

const lvl = levels

client.on('message', msg => {
    if (msg.content === `//text`){
        console.log(msg.content, msg.author.username)
        msg.channel.send(buildInterface(timer)).then(sentMessage =>{
            timer = 120
            let timeOut = setInterval(function(){
                --timer
                console.log(timer)
                sentMessage.edit(buildInterface(timer))
                if(timer == 0){
                    clearInterval(timeOut)
                    console.log("Time's out")
                }
            }, 1000)
        })
    }
    if (msg.content === `//play`) {
        player_x = 0
        player_y = 9
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

                let collector = sentMessage.createReactionCollector(filter, { time: timer * 1000 });
                collector.on('collect', (reaction, collector) => {
                    console.log('got a reaction')
                    switch (reaction.emoji.name) {
                        case '➡':
                            if (player_x + 1 == map_x || rightCollision(player_x, player_y)) {
                                console.log('can\'t go right')
                                break;
                            } else {
                                ++player_x
                                reaction.user
                                console.log('go right')
                                console.log(`changed player x to : ${player_x}`)
                                sentMessage.edit(buildMap(map_x, map_y))
                                break;
                            }
                        case '⬅':
                            if (player_x == 0 || leftCollision(player_x, player_y)) {
                                console.log('can\'t go left')
                                break;
                            } else {
                                --player_x
                                console.log('go left')
                                console.log(`changed player x to : ${player_x}`)
                                sentMessage.edit(buildMap(map_x, map_y))
                                break;
                            }
                        case '⬆':
                            if (player_y == 0 || topCollision(player_x, player_y)) {
                                console.log('can\'t go up')
                                break
                            } else {
                                --player_y
                                console.log('go up')
                                console.log(`changed player y to : ${player_y}`)
                                sentMessage.edit(buildMap(map_x, map_y))
                                break
                            }
                        case '⬇':
                            if (player_y + 3 == map_y || bottomCollision(player_x, player_y)) {
                                console.log('can\'t go down')
                                break;
                            } else {
                                ++player_y
                                console.log('go down')
                                console.log(`changed player y to : ${player_y}`)
                                sentMessage.edit(buildMap(map_x, map_y))
                                break;
                            }
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
    const wall = [`██`]
    const facha = [`:sunglasses:`]

    let map = [`${top_left_corner}`];
    let x = 1
    let y = 1
    let wall_index = 0

    for (i=0;i<row;i++) {
        if (y != 1 && y != row) {
            map = map.slice(0, -1) + vertical_frame2
        } else if (y == row) {
            map = map.slice() + bottom_left_corner2
        }
        for (j=0;j<col;j++){
            if (y == 1 || y == row) {
                map += horizontal_frame
            } else if (player_x+1 == x && player_y+2 == y) {
                console.log(`current player x : ${player_x}`)
                console.log(`current x : ${x}`)
                console.log(`current y : ${player_y}`)
                console.log(`map x : ${map_x}`)
                console.log(`map x : ${map_y}`)

                if (player_x + 1 == map_x) {
                    map = map.slice(0, -1)
                    map += (facha + `:`)
                } else {
                    map += facha
                }
            } else if (
                lvl.lvl_1.walls.lvl_walls_x[wall_index] == x &&
                 lvl.lvl_1.walls.lvl_walls_y[wall_index] + 1 == y
            ) {
                map += wall
                wall_index ++
            } else {
                map += inside
            }
            ++x
        }
        x = 1
        if (y == 1) {
            map = map.slice(0, -1) + top_right_corner
            ++y
        } else if ( y == row) {
            map = map.slice(0, -1) + bottom_right_corner
            ++y
        } else {
            map = map.slice(0, -1) + vertical_frame
            ++y
        }
    }
    return map.toString()
}
function rightCollision(x, y) {
    let index = 0
    const limit = lvl.lvl_1.walls.lvl_walls_x.length

    let collisions = 0

    while (index < limit) {
        if (x + 2 == lvl.lvl_1.walls.lvl_walls_x[index] &&
            y + 1  == lvl.lvl_1.walls.lvl_walls_y[index]
        ) { collisions ++ }
        index++
    }
    if (collisions != 0) {
        return true
    } else {
        return false
    }
}
function leftCollision(x, y) {
    let index = 0
    const limit = lvl.lvl_1.walls.lvl_walls_x.length

    let collisions = 0

    while (index < limit) {
        if (x == lvl.lvl_1.walls.lvl_walls_x[index] &&
            y + 1  == lvl.lvl_1.walls.lvl_walls_y[index]
        ) { collisions ++ }
        index++
    }
    if (collisions != 0) {
        return true
    } else {
        return false
    }
}
function topCollision(x, y) {
    let index = 0
    const limit = lvl.lvl_1.walls.lvl_walls_x.length

    let collisions = 0

    while (index < limit) {
        if (x + 1 == lvl.lvl_1.walls.lvl_walls_x[index] &&
            y == lvl.lvl_1.walls.lvl_walls_y[index]
        ) { collisions ++ }
        index++
    }
    if (collisions != 0) {
        return true
    } else {
        return false
    }
}
function bottomCollision(x, y) {
    let index = 0
    const limit = lvl.lvl_1.walls.lvl_walls_x.length

    let collisions = 0

    while (index < limit) {
        if (x + 1 == lvl.lvl_1.walls.lvl_walls_x[index] &&
            y + 2  == lvl.lvl_1.walls.lvl_walls_y[index]
        ) { collisions ++ }
        index++
    }
    if (collisions != 0) {
        return true
    } else {
        return false
    }
}
function buildInterface(timer){
    let interfaceTimer = `[Time: ${timer}]`
    return interfaceTimer
}
