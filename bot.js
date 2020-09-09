const Discord = require('discord.js')
const { BOT_TOKEN } = require('./token')
const { levels } = require('./levels.js')

client = new Discord.Client();

client.on('ready' , () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

let player_x = 0
let player_y = 0

let map_x = 13
let map_y = 5

let lvl_number = 1
let lives = 3
let moves = 2

const lvl = levels

let currentUser = []

client.on('message', msg => {
    if (msg.content == `//play`){
        moves = 2
        player_x = 0
        player_y = 0
        currentUser = [msg.author.id, msg.author.username, msg.author]
        console.log(msg.content, currentUser);
            msg.channel.send(buildMap(map_x, map_y)).then(async sentMessage => {
                controls(sentMessage, currentUser[0])
            })
    }
});

client.login(BOT_TOKEN)

function controls(sentMessage, currentUserId) {
    sentMessage.react('➡')
    console.log('reacted with right arrow')
    sentMessage.react('⬅')
    console.log('reacted with left arrow')
    sentMessage.react('⬆')
    console.log('reacted with up arrow')
    sentMessage.react('⬇')
    console.log('reacted with down arrow')

    const filter = (reaction, user) => user.id === currentUserId && (
        reaction.emoji.name === '➡' ||
        reaction.emoji.name === '⬅' ||
        reaction.emoji.name === '⬆' ||
        reaction.emoji.name === '⬇'
    );

    let collector = sentMessage.createReactionCollector(filter, { max: moves });
    collector.on('collect', (reaction, collector) => {
        console.log('got a reaction')
        switch (reaction.emoji.name) {
            case '➡':
                moves--
                if (player_x + 3 == map_x || rightCollision(player_x, player_y)) {
                    console.log('can\'t go right')
                    break;
                } else {
                    ++player_x
                    reaction.user
                    console.log('go right')
                    console.log(`changed player x to : ${player_x}`)
                    if (isInSpike(player_x, player_y, 1) == true) {
                        moves--
                    }
                    sentMessage.edit(buildMap(map_x, map_y))
                    break;
                }
            case '⬅':
                moves--
                if (player_x == 0 || leftCollision(player_x, player_y)) {
                    console.log('can\'t go left')
                    break;
                } else {
                    --player_x
                    console.log('go left')
                    console.log(`changed player x to : ${player_x}`)
                    if (isInSpike(player_x, player_y, 2)) {
                        moves--
                    }
                    sentMessage.edit(buildMap(map_x, map_y))
                    break;
                }
            case '⬆':
                moves--
                if (player_y == 0 || topCollision(player_x, player_y)) {
                    console.log('can\'t go up')
                    break
                } else {
                    --player_y
                    console.log('go up')
                    console.log(`changed player y to : ${player_y}`)
                    if (isInSpike(player_x, player_y, 3)) {
                        moves--
                    }
                    sentMessage.edit(buildMap(map_x, map_y))
                    break
                }
            case '⬇':
                moves--
                if (player_y + 3 == map_y || bottomCollision(player_x, player_y)) {
                    console.log('can\'t go down')
                    break;
                } else {
                    ++player_y
                    console.log('go down')
                    console.log(`changed player y to : ${player_y}`)
                    if (isInSpike(player_x, player_y, 4)) {
                        moves--
                    }
                    sentMessage.edit(buildMap(map_x, map_y))
                    break;
                }
        }
    });
    collector.on('end', collected => {
        if (lives == 1){
            sentMessage.delete()
            sentMessage.channel.send(new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle(`${currentUser[1]} jajaj sos muy malardo`)
                .setURL('https://www.youtube.com/watch?v=SJXiZrTiNe0')
                .then( sentMessage => {setTimeout(() => { sentMessage.delete() }, 15000)}))
        } else {
            console.log(`sin movimientos`);
            lives--
            sentMessage.edit(buildInterface(lvl_number,lives,moves))
            .then(sentMessage.channel.send(deathMessage())
            .then( sentMessage => {setTimeout(() => { sentMessage.delete() }, 15000)}))
            .then( sentMessage => {
                sentMessage.react('🔁')
                console.log('reacted with repeat')
                sentMessage.react('❌')
                console.log('reacted with cross')

                const repeatFilter = (reaction, user) => user.id === currentUserId && (
                    reaction.emoji.name === '🔁' ||
                    reaction.emoji.name === '❌'
                );

                let collector = sentMessage.createReactionCollector(repeatFilter, { max: moves });
                collector.on('collect', (reaction, collector) => {
                    console.log('got a reaction')
                    switch (reaction.emoji.name) {
                        case '🔁':
                            sentMessage.delete()
                            player_x = lvl.lvl_1.player_x
                            player_y = lvl.lvl_1.player_y
                            moves = lvl.lvl_1.moves
                            sentMessage.channel.send(buildMap(map_x, map_y))
                            .then(async sentMessage => {
                                controls(sentMessage, currentUserId)
                            })
                            break
                        case '❌':
                            sentMessage.delete()
                            break
                    }
                console.log(`lives: ${lives}`)
                });
            })
        }
    })
}
function buildMap(col, row) {
    console.log(`map size is ${col} x ${row}`)

    const corner = `<:c:752966967912038500>`
    const frame = `<:f:752966972467052606>`
    const inside = `⬛`
    const spike = `<:s:752962691018129489>`
    const wall = `<:w:752966973809229875>`
    const angry_facha = `<:af:753010581933523104>`

    const facha = `😎`//<:sa:752951964051963994>`

    let map = []
    let x = 1
    let y = 1
    let wall_index = 0
    let spike_index = 0

    for (i=0;i<row;i++) {
        x = 1
        console.log(y)
        if (y == 1 || y == map_y) {map += corner}
        for (j=0;j<col;j++){
            if (y == 1 || y == map_y) {
                if (x + 1 == map_x) {
                     map += corner 
                     break
                } else {
                    map += frame
                }
            } else if (lvl.lvl_1.walls.lvl_walls_x[wall_index] == x &&
                lvl.lvl_1.walls.lvl_walls_y[wall_index] + 1 == y)
            {
               map += wall
               wall_index ++
            } else if (lvl.lvl_1.spikes.lvl_spikes_x[spike_index] == x &&
                lvl.lvl_1.spikes.lvl_spikes_y[spike_index] + 1 == y &&
                player_x + 2 == x && player_y + 2 == y)
            {
               map += angry_facha
               spike_index ++
            }else if (lvl.lvl_1.spikes.lvl_spikes_x[spike_index] == x &&
                lvl.lvl_1.spikes.lvl_spikes_y[spike_index] + 1 == y)
            {
               map += spike
               spike_index ++
            } else if (player_x + 2 == x && player_y + 2 == y) {
                map += facha
            } else if (x == 1 || x == map_x) {
                map += frame
            } else { map += inside }
            x ++
        }
        y ++
        map += ` \n`
    }
    console.log(map.length)
    return buildInterface(lvl_number, lives, moves) + map
}
function rightCollision(x, y) {
    let index = 0
    const limit = lvl.lvl_1.walls.lvl_walls_x.length

    let collisions = 0

    while (index < limit) {
        if (x + 3 == lvl.lvl_1.walls.lvl_walls_x[index] &&
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
        if (x - 3 == lvl.lvl_1.walls.lvl_walls_x[index] &&
            y == lvl.lvl_1.walls.lvl_walls_y[index]
        ) { collisions ++}
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
        if (x + 2 == lvl.lvl_1.walls.lvl_walls_x[index] &&
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
function buildInterface(lvl_number, lives, moves){
    let interface = `\` [Lvl: ${lvl_number}  Lives: ${lives}  Moves: ${moves}] \`\n`
    return interface
}

function deathMessage() {
    return (new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle(`${currentUser[1]} sos malardo`)
        .setURL('https://www.youtube.com/watch?v=SJXiZrTiNe0')
        .addField ('Mala tula', `${currentUser[2]} tamaño muy decepcionante`))
}

function isInSpike(x, y, s) {
    let index = 0
    const limit = lvl.lvl_1.spikes.lvl_spikes_x.length

    let collisions = 0

    let s_x = x
    let s_y = y

    switch (s) {
        case 1:
            s_x += 2
            s_y += 1
            break
        case 2:
            s_y += 1
            break
        case 3:
            s_x += 1
            break
        case 4:
            s_x += 1
            s_y += 2
            break
    }

    while (index < limit) {
        if (s_x == lvl.lvl_1.spikes.lvl_spikes_x[index] &&
            s_y == lvl.lvl_1.spikes.lvl_spikes_y[index]
        ) { collisions ++ }
        index++
    }
    if (collisions != 0) {
        return true
    } else {
        return false
    }
}