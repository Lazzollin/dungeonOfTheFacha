const Discord = require('discord.js')
const { BOT_TOKEN } = require('./token')
const { levels } = require('./levels')

client = new Discord.Client();

client.on('ready' , () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if (message.content == `//play`){
        game(message)
    }
});

async function game(msg) {
    let textures = {
        corner: `<:fr:753482361626296350>`,
        frame: `<:fr:753482361626296350>`,
        inside: `⬛`,
        spike: `<:sp:752962691018129489>`,
        wall: `<:wa:753342233360597016>`,
        exit: `<:ex:753658803660259368>`,
        happy_facha: `<:hf:753658803647545395>`,
        angry_facha: `<:af:753010581933523104>`,
        golden_key: `<:gk:753301383897153646>`,
        silver_key: `<:sk:753301383310213200>`,
        bronze_key: `<:bk:753301379329556600>`,
        golden_door: `<:gd:753459639177183302>`,
        silver_door: `<:sd:753456787520487552>`,
        bronze_door: `<:bd:753456786555535420>`,
        golden_door_open: `<:gdo:753638708175175763>`,
        silver_door_open: `<:sdo:753638708262994032>`,
        bronze_door_open: `<:bdo:753456783804071956>`,
        golden_door_facha: `<:gdf:753638706535071824>`,
        silver_door_facha: `<:sdf:753638707021611108>`,
        bronze_door_facha: `<:bdf:753638706040012850>`,
        golden_door_on_spike: `<:gks:753764024369545277>`,
    }

    let lvl_number = 1
    let lvl = levels.lvl_1

    function setLvl() {
        switch (lvl_number) {
            case 1:
                lvl = levels.lvl_1
                break
            case 2:
                lvl = levels.lvl_2
                break
            case 3:
                lvl = levels.lvl_3
                break
        }
    }

    let currentUser = []

    let player_x = 0
    let player_y = 0

    let map_x = lvl.map_x
    let map_y = lvl.map_y

    let lives = 3
    let moves = 0
    let win = false

    let has_golden_key = false
    let has_silver_key = false
    let has_bronze_key = false
    let golden_door_opened = false
    let silver_door_opened = false
    let bronze_door_opened = false

    player_x = lvl.player_x
    player_y = lvl.player_y
    moves = lvl.moves
    lives = 3
    has_golden_key = false
    has_silver_key = false
    has_bronze_key = false
    golden_door_opened = false
    silver_door_opened = false
    bronze_door_opened = false
    currentUser = [msg.author.id, msg.author.username, msg.author]
    console.log(msg.content, currentUser);
        msg.channel.send(buildMap(map_x, map_y)).then(async sentMessage => {
            controls(sentMessage, currentUser[0])
        })
    
        function controls(sentMessage, currentUserId) {
            sentMessage.react('⬅')
            console.log('reacted with left arrow')
            sentMessage.react('➡')
            console.log('reacted with right arrow')
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
            collector.on('collect', (reaction, collectorr) => {
                console.log('got a reaction')
        
                if (moves <= 0) {collector.stop('https://www.youtube.com/watch?v=OLpeX4RRo28')}
                switch (reaction.emoji.name) {
                    case '➡':
                        moves--
                        sentMessage.reactions.resolve('➡').users.remove(currentUser[0])
                        if (player_x + 3 == map_x || rightCollision(player_x, player_y)) {
                            console.log('can\'t go right')
                            break;
                        } else {
                            console.log('go right')
                            console.log(`changed player x to : ${player_x + 1}`)
                            if (isInSpike(player_x, player_y, 'right') == true) {
                                console.log('is in spike')
                                moves--
                            }
                            ++player_x
                            if (takeKey(player_x, player_y) == 'gold') {
                                has_golden_key = true
                            }
                            if (takeKey(player_x, player_y) == 'silver') {
                                has_silver_key = true
                            }
                            if (takeKey(player_x, player_y) == 'bronze') {
                                has_bronze_key = true
                            }
                            if (openDoor(player_x, player_y) == 'gold') {
                                golden_door_opened = true
                            }
                            if (openDoor(player_x, player_y) == 'silver') {
                                silver_door_opened = true
                            }
                            if (openDoor(player_x, player_y) == 'bronze') {
                                bronze_door_opened = true
                            }
                            console.log(silver_door_opened)
                            sentMessage.edit(buildMap(map_x, map_y))
                            break;
                        }
                    case '⬅':
                        moves--
                        sentMessage.reactions.resolve('⬅').users.remove(currentUser[0])
                        if (player_x == 0 || leftCollision(player_x, player_y)) {
                            console.log('can\'t go left')
                            break;
                        } else {
                            console.log('go left')
                            console.log(`changed player x to : ${player_x - 1}`)
                            if (isInSpike(player_x, player_y, 'left')) {
                                console.log('is in spike')
                                moves--
                            } 
                            --player_x
                            if (takeKey(player_x, player_y) == 'gold') {
                                has_golden_key = true
                            }
                            if (takeKey(player_x, player_y) == 'silver') {
                                has_silver_key = true
                            }
                            if (takeKey(player_x, player_y) == 'bronze') {
                                has_bronze_key = true
                            }
                            if (openDoor(player_x, player_y) == 'gold') {
                                golden_door_opened = true
                            }
                            if (openDoor(player_x, player_y) == 'silver') {
                                silver_door_opened = true
                            }
                            if (openDoor(player_x, player_y) == 'bronze') {
                                bronze_door_opened = true
                            }
                            sentMessage.edit(buildMap(map_x, map_y))
                            break;
                        }
                    case '⬆':
                        moves--
                        sentMessage.reactions.resolve('⬆').users.remove(currentUser[0])
                        if (player_y == 0 || topCollision(player_x, player_y)) {
                            console.log('can\'t go up')
                            break
                        } else {
                            console.log('go up')
                            console.log(`changed player y to : ${player_y - 1}`)
                            if (isInSpike(player_x, player_y, 'up')) {
                                console.log('is in spike')
                                moves--
                            }
                            --player_y
                            if (takeKey(player_x, player_y) == 'gold') {
                                has_golden_key = true
                            }
                            if (takeKey(player_x, player_y) == 'silver') {
                                has_silver_key = true
                            }
                            if (takeKey(player_x, player_y) == 'bronze') {
                                has_bronze_key = true
                            }
                            if (openDoor(player_x, player_y) == 'gold') {
                                golden_door_opened = true
                            }
                            if (openDoor(player_x, player_y) == 'silver') {
                                silver_door_opened = true
                            }
                            if (openDoor(player_x, player_y) == 'bronze') {
                                bronze_door_opened = true
                            }
                            sentMessage.edit(buildMap(map_x, map_y))
                            break
                        }
                    case '⬇':
                        moves--
                        sentMessage.reactions.resolve('⬇').users.remove(currentUser[0])
                        if (player_y + 3 == map_y || bottomCollision(player_x, player_y)) {
                            console.log('can\'t go down')
                            break;
                        } else {
                            console.log('go down')
                            console.log(`changed player y to : ${player_y + 1}`)
                            if (isInSpike(player_x, player_y, 'down')) {
                                console.log('is in spike')
                                moves--
                            }
                            ++player_y
                            if (takeKey(player_x, player_y) == 'gold') {
                                has_golden_key = true
                            }
                            if (takeKey(player_x, player_y) == 'silver') {
                                has_silver_key = true
                            }
                            if (takeKey(player_x, player_y) == 'bronze') {
                                has_bronze_key = true
                            }
                            if (openDoor(player_x, player_y) == 'gold') {
                                golden_door_opened = true
                            }
                            if (openDoor(player_x, player_y) == 'silver') {
                                silver_door_opened = true
                            }
                            if (openDoor(player_x, player_y) == 'bronze') {
                                bronze_door_opened = true
                            }
                            sentMessage.edit(buildMap(map_x, map_y))
                            break;
                        }
                }
                if (lvl.exit.exit_x == player_x + 2 &&
                    lvl.exit.exit_y == player_y + 2) {
                        win = true
                        collector.stop('https://www.youtube.com/watch?v=OLpeX4RRo28')
                }
            });
        
            collector.on('end', collected => {
                if (win == true) {
                    sentMessage.edit(buildMap(map_x, map_y)) // buildInterface(lvl_number,lives,moves))
                    .then(sentMessage.channel.send(winMessage())
                    .then( sentMessage => {setTimeout(() => { sentMessage.delete() }, 15000)}))
                    .then( sentMessage => {
                        sentMessage.react('⏩')
                        console.log('reacted with repeat')
                        sentMessage.react('❌')
                        console.log('reacted with cross')
        
                        const repeatFilter = (reaction, user) => user.id === currentUserId && (
                            reaction.emoji.name === '⏩' ||
                            reaction.emoji.name === '❌'
                        );
        
                        let collector = sentMessage.createReactionCollector(repeatFilter, { time: 25000 });
                        collector.on('collect', (reaction, collector) => {
                            console.log('got a reaction')
                            switch (reaction.emoji.name) {
                                case '⏩':
                                    if (lvl_number == 3) {
                                        sentMessage.delete()
                                        sentMessage.channel.send(new Discord.MessageEmbed()
                                        .setColor('#ff0000')
                                        .setTitle(`${currentUser[1]} Flaco es la beta no tenemos mas niveles calmate crack fiera mastodonte cosmico citroneta overclockeada`)
                                        .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ'))
                                        .then( sentMessage => {setTimeout(() => { sentMessage.delete() }, 15000)})
                                        break
                                    } else {
                                        lvl_number++
                                        setLvl()
                                    }
                                    sentMessage.delete()
                                    win = false
                                    player_x = lvl.player_x
                                    player_y = lvl.player_y
                                    moves = lvl.moves
                                    has_golden_key = false
                                    has_silver_key = false
                                    has_bronze_key = false
                                    golden_door_opened = false
                                    silver_door_opened = false
                                    bronze_door_opened = false
                                    sentMessage.channel.send(buildMap(map_x, map_y))
                                    .then(async sentMessage => {
                                        controls(sentMessage, currentUserId)
                                    })
                                    break
                                case '❌':
                                    sentMessage.delete()
                                    break
                            }
                        })
                    })
                } else if (lives == 1){
                    sentMessage.delete()
                    sentMessage.channel.send(new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle(`${currentUser[1]} jajaj sos muy malardo`)
                        .setURL('https://www.youtube.com/watch?v=SJXiZrTiNe0'))
                        .then( sentMessage => {setTimeout(() => { sentMessage.delete() }, 15000)})
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
        
                        let collector = sentMessage.createReactionCollector(repeatFilter, { time: 25000 });
                        collector.on('collect', (reaction, collector) => {
                            console.log('got a reaction')
                            switch (reaction.emoji.name) {
                                case '🔁':
                                    sentMessage.delete()
                                    player_x = lvl.player_x
                                    player_y = lvl.player_y
                                    moves = lvl.moves
                                    has_golden_key = false
                                    has_silver_key = false
                                    has_bronze_key = false
                                    golden_door_opened = false
                                    silver_door_opened = false
                                    bronze_door_opened = false
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
            
            const facha = `😎`//<:sa:752951964051963994>`
        
            let map = []
            let x = 1
            let y = 1
            let wall_index = 0
            let spike_index = 0
        
            for (i=0;i<row;i++) {
                x = 1
                console.log(y)
                if (y == 1 || y == map_y) {map += textures.corner}
                for (j=0;j<col;j++){
                    if (y == 1 || y == map_y) {
                        // render the main frame and the exit \/
                        if (x + 1 == map_x) {
                             map += textures.corner 
                             break
                        } else {
                            map += textures.frame
                        }
                        // render walls \/
                    } else if (lvl.walls.lvl_walls_x[wall_index] == x &&
                        lvl.walls.lvl_walls_y[wall_index] == y)
                    {
                       map += textures.frame
                       wall_index ++
                       // render angry facha on spikes \/
                    } else if (lvl.spikes.lvl_spikes_x[spike_index] == x &&
                        lvl.spikes.lvl_spikes_y[spike_index] == y &&
                        player_x + 2 == x && player_y + 2 == y)
                    {
                       map += textures.angry_facha
                       spike_index ++
                       // render spikes \/
                    } else if (lvl.spikes.lvl_spikes_x[spike_index] == x &&
                        lvl.spikes.lvl_spikes_y[spike_index] == y && lvl.keys.golden_key_x == x &&
                        lvl.keys.golden_key_y == y && has_golden_key == false
                        )
                    {
                       map += textures.golden_door_on_spike
                       spike_index ++
                       // render spikes \/
                    } else if (lvl.spikes.lvl_spikes_x[spike_index] == x &&
                        lvl.spikes.lvl_spikes_y[spike_index] == y)
                    {
                       map += textures.spike
                       spike_index ++
                       // render player on opened golden door \/
                    } else if (lvl.doors.golden_door_x == x &&
                        lvl.doors.golden_door_y == y &&
                        player_x + 2 == x && player_y + 2 == y)
                    {
                       map += textures.golden_door_facha
                       // render player on opened silver door \/
                    } else if (lvl.doors.silver_door_x == x &&
                        lvl.doors.silver_door_y == y &&
                        player_x + 2 == x && player_y + 2 == y)
                    {
                       map += textures.silver_door_facha
                       // render player on opened bronze door \/
                    } else if (lvl.doors.bronze_door_x == x &&
                        lvl.doors.bronze_door_y == y &&
                        player_x + 2 == x && player_y + 2 == y)
                    {
                       map += textures.bronze_door_facha
                       // render golden door opened \/
                    } else if (lvl.doors.golden_door_x == x &&
                        lvl.doors.golden_door_y == y &&
                        golden_door_opened == true)
                    {
                       map += textures.golden_door_open
                       // render silver door opened\/
                    } else if (lvl.doors.silver_door_x == x &&
                        lvl.doors.silver_door_y == y &&
                        silver_door_opened == true)
                    {
                       map += textures.silver_door_open
                       // render bronze door opened \/
                    } else if (lvl.doors.bronze_door_x == x &&
                        lvl.doors.bronze_door_y == y &&
                        bronze_door_opened == true)
                    {
                       map += textures.bronze_door_open
                       // render golden door \/
                    } else if (lvl.doors.golden_door_x == x &&
                        lvl.doors.golden_door_y == y)
                    {
                       map += textures.golden_door
                        // render silver door \/
                    } else if (lvl.doors.silver_door_x == x &&
                        lvl.doors.silver_door_y == y)
                    {
                       map += textures.silver_door
                       // render bronze door \/
                    } else if (lvl.doors.bronze_door_x == x &&
                        lvl.doors.bronze_door_y == y)
                    {
                       map += textures.bronze_door
                       // render golden key \/
                    } else if (lvl.keys.golden_key_x == x &&
                        lvl.keys.golden_key_y == y && has_golden_key == false)
                    {
                       map += textures.golden_key
                       // render silver key \/
                    } else if (lvl.keys.silver_key_x == x &&
                        lvl.keys.silver_key_y == y && has_silver_key == false)
                    {
                       map += textures.silver_key
                       // render bronze key \/
                    } else if (lvl.keys.bronze_key_x == x &&
                        lvl.keys.bronze_key_y == y && has_bronze_key == false)
                    {
                       map += textures.bronze_key
                       // render facha \/
                    } else if (lvl.exit.exit_x == x &&
                        lvl.exit.exit_y == y &&
                        player_x + 2 == x && player_y + 2 == y) {
                        map += textures.happy_facha
                    } else if (lvl.exit.exit_x == x &&
                        lvl.exit.exit_y == y) {
                        map += textures.exit
                    } else if (player_x + 2 == x && player_y + 2 == y) {
                        map += facha
                    } else if (x == 1 || x == map_x) {
                        // render the rest of the frame
                        map += textures.frame
                    } else { map += textures.inside }
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
            const limit = lvl.walls.lvl_walls_x.length
        
            let collisions = 0
        
            while (index < limit) {
                if (x + 3 == lvl.walls.lvl_walls_x[index] &&
                    y + 2 == lvl.walls.lvl_walls_y[index] ||
                    (x + 3 == lvl.doors.golden_door_x &&
                    y + 2 == lvl.doors.golden_door_y &&
                    has_golden_key == false
                    ) || 
                    (x + 3 == lvl.doors.silver_door_x &&
                    y + 2 == lvl.doors.silver_door_y &&
                    has_silver_key == false
                    ) || 
                    (x + 3 == lvl.doors.bronze_door_x &&
                    y + 2 == lvl.doors.bronze_door_y &&
                    has_bronze_key == false
                    )
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
            const limit = lvl.walls.lvl_walls_x.length
        
            let collisions = 0
        
            while (index < limit) {
                if (x + 1 == lvl.walls.lvl_walls_x[index] &&
                    y + 2  == lvl.walls.lvl_walls_y[index] ||
                    (x + 1 == lvl.doors.golden_door_x &&
                    y + 2 == lvl.doors.golden_door_y &&
                    has_golden_key == false
                    ) || 
                    (x + 1 == lvl.doors.silver_door_x &&
                    y + 2 == lvl.doors.silver_door_y &&
                    has_silver_key == false
                    ) || 
                    (x + 1 == lvl.doors.bronze_door_x &&
                    y + 2 == lvl.doors.bronze_door_y &&
                    has_bronze_key == false
                    )
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
            const limit = lvl.walls.lvl_walls_x.length
        
            let collisions = 0
        
            while (index < limit) {
                if (x + 2 == lvl.walls.lvl_walls_x[index] &&
                    y + 1 == lvl.walls.lvl_walls_y[index] ||
                    (x + 2 == lvl.doors.golden_door_x &&
                    y + 1 == lvl.doors.golden_door_y &&
                    has_golden_key == false
                    ) || 
                    (x + 2 == lvl.doors.silver_door_x &&
                    y + 1 == lvl.doors.silver_door_y &&
                    has_silver_key == false
                    ) || 
                    (x + 2 == lvl.doors.bronze_door_x &&
                    y + 1 == lvl.doors.bronze_door_y &&
                    has_bronze_key == false
                    )
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
            const limit = lvl.walls.lvl_walls_x.length
        
            let collisions = 0
        
            while (index < limit) {
                if (x + 2 == lvl.walls.lvl_walls_x[index] &&
                    y + 3 == lvl.walls.lvl_walls_y[index] ||
                    (x + 2 == lvl.doors.golden_door_x &&
                    y + 3 == lvl.doors.golden_door_y &&
                    has_golden_key == false
                    ) || 
                    (x + 2 == lvl.doors.silver_door_x &&
                    y + 3 == lvl.doors.silver_door_y &&
                    has_silver_key == false
                    ) || 
                    (x + 2 == lvl.doors.bronze_door_x &&
                    y + 3 == lvl.doors.bronze_door_y &&
                    has_bronze_key == false
                    )
                ) { collisions ++ }
                index++
            }
            if (collisions != 0) {
                return true
            } else {
                return false
            }
        }
        
        function buildInterface(lvl_number, lives, moves) {
            let s = ''
            let index = 0
        
            if (lives == 0) {
                moves = 'X'
            }
            while (index < lives) {
                s += `💙`;
                index ++;
            }
        
            let myInterface = `\` ${s} | Lvl: ${lvl_number} | Moves: ${moves} \``
        
            if (has_golden_key) {
                myInterface += ` ${textures.golden_key}`
            }
            if (has_silver_key) {
                myInterface += ` ${textures.silver_key}`
            }
            if (has_bronze_key) {
                myInterface += ` ${textures.bronze_key}`
            }
        
            myInterface += `\n`
        
            return myInterface
        }
        
        function winMessage() {
            return (new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle(`${currentUser[1]} buena tula`)
                .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
                .addField ('Extraordinario', `${currentUser[2]} tamaño del tronco muy impactante`))
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
            const limit = lvl.spikes.lvl_spikes_x.length
        
            let collisions = 0
        
            let s_x = x
            let s_y = y
        
            switch (s) {
                case 'right':
                    s_x += 3
                    s_y += 2
                    break
                case 'left':
                    s_x += 1
                    s_y += 2
                    break
                case 'up':
                    s_x += 2
                    s_y += 1
                    break
                case 'down':
                    s_x += 2
                    s_y += 3
                    break
            }
        
            while (index < limit) {
                if (s_x == lvl.spikes.lvl_spikes_x[index] &&
                    s_y == lvl.spikes.lvl_spikes_y[index]
                ) { collisions ++ }
                index++
            }
            if (collisions != 0) {
                return true
            } else {
                return false
            }
        }
        
        function takeKey(x, y) {
            if (x + 2 == lvl.keys.golden_key_x &&
                y + 2 == lvl.keys.golden_key_y) {
                    return 'gold'
            }
            if (x + 2 == lvl.keys.silver_key_x &&
                y + 2 == lvl.keys.silver_key_y) {
                    return 'silver'
            }
            if (x + 2 == lvl.keys.bronze_key_x &&
                y + 2 == lvl.keys.bronze_key_y) {
                    return 'bronze'
            }
        }
        
        function openDoor(x, y) {
            if (x + 2 == lvl.doors.golden_door_x &&
                y + 2 == lvl.doors.golden_door_y) {
                    return 'gold'
            }
            if (x + 2 == lvl.doors.silver_door_x &&
                y + 2 == lvl.doors.silver_door_y) {
                    return 'silver'
            }
            if (x + 2 == lvl.doors.bronze_door_x &&
                y + 2 == lvl.doors.bronze_door_y) {
                    return 'bronze'
            }
        }
}

client.login(BOT_TOKEN)