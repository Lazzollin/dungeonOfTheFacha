const Discord = require('discord.js')
const fs = require('fs')
const { BOT_TOKEN } = require('./token')
const { levels } = require('./levels');
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
const ffmpeg = require('ffmpeg-static')
const opus = require('@discordjs/opus')

client = new Discord.Client();

client.on('ready' , () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    switch (message.content) {
        case '//play':
            game(message)
            music(message)
            break
        case '//setup':
            if (message.member.hasPermission('BAN_MEMBERS')) {
                autoSetup(message)
            } else {
                message.channel.send('Wait, that\'s illegal')
            }
    }
});

async function music(message){
    if(!message.guild) return

    if(message.member.voice.channel){
        const connection = await message.member.voice.channel.join()

        const dispatcher = connection.play(ffmpeg.createReadStream('/music/DOTF_MainTheme_Concept.wav', {type: 'wav/opus'}))

        dispatcher.on("start", ()=>{
            console.log("DOTF_MainTheme_Concept.wav is now playing")
        })
        dispatcher.on("finish", ()=>{
            console.log("DOTF_MainTheme_Concept.wav has finished playing")
        })
        dispatcher.error("error", console.error)

    }else{
        message.reply("[First you need join into the voice channel]")
    }
}

function autoSetup(msg) {
    let textures_ids = {
        "ids": {
            "frame_id": 0,
            "spike_id": 0,
            "exit_id": 0,
            "happy_facha_id": 0,
            "angry_facha_id": 0,
            "golden_key_id": 0,
            "silver_key_id": 0,
            "bronze_key_id": 0,
            "golden_door_id": 0,
            "silver_door_id": 0,
            "bronze_door_id": 0,
            "golden_door_open_id": 0,
            "silver_door_open_id": 0,
            "bronze_door_open_id": 0,
            "golden_door_facha_id": 0,
            "silver_door_facha_id": 0,
            "bronze_door_facha_id": 0,
            "golden_key_on_spike_id": 0,
            "silver_key_on_spike_id": 0,
            "bronze_key_on_spike_id": 0,
            "box": 0,
        }        
    }
    const user = msg.author

    function trimIDMsg(msg) {
        let trimedId = msg.slice(5, 23)
        return trimedId
    }
    function trimIDMsg2(msg) {
        let trimedId = msg.slice(6, 24)
        return trimedId
    }

    const querys = { // <:hfjdks:43782467832>
        "query_1": {
            query: '<:fr:',
            errorMessage: 'that\'s not a wall try again',
            nextItemMessage: '(:sp:) Now the spike texture',
            texture: "frame_id"
        },
        "query_2": {
            query: '<:sp:',
            errorMessage: 'that\'s not a spike try again',
            nextItemMessage: '(:ex:) Ok now lets go with the exit sign, that\'s kinda important',
            texture: "spike_id"
        },
        "query_3": {
            query: '<:ex:',
            errorMessage: 'that\'s not an exit sign try again',
            nextItemMessage: '(:hf:) Awesome, now give me the Happy Facha (the one with the hat)',
            texture: "exit_id"
        },
        "query_4": {
            query: '<:hf:',
            errorMessage: 'that\'s not Happy Facha try again',
            nextItemMessage: '(:af:) And now the angry one',
            texture: "happy_facha_id"
        },
        "query_5": {
            query: '<:af:',
            errorMessage: 'that\'s not Angry Facha try again',
            nextItemMessage: '(:gk:) Let\'s go with the keys now, first the golden one',
            texture: "angry_facha_id"
        },
        "query_6": {
            query: '<:gk:',
            errorMessage: 'that\'s not a golden key try again',
            nextItemMessage: '(:sk:) Now the silver one',
            texture: "golden_key_id"
        },
        "query_7": {
            query: '<:sk:',
            errorMessage: 'that\'s not a silver key try again',
            nextItemMessage: '(:bk:) Now bronze',
            texture: "silver_key_id"
        },
        "query_8": {
            query: '<:bk:',
            errorMessage: 'that\'s not a bronze key try again',
            nextItemMessage: '(:gd:) Good, now the doors, starting with the golden one',
            texture: "bronze_key_id"
        },
        "query_9": {
            query: '<:gd:',
            errorMessage: 'that\'s not a golden door try again',
            nextItemMessage: '(:sd:) And then the silver one',
            texture: "golden_door_id"
        },
        "query_10": {
            query: '<:sd:',
            errorMessage: '(:bd:) And the bronze one',
            nextItemMessage: 'that\'s not a silver door try again',
            texture: "silver_door_id"
        },
        "query_11": {
            query: '<:bd:',
            errorMessage: 'that\'s not a bronze door try again',
            nextItemMessage: '(:gdo:) You nailed it, now lets go with the opened doors, of course starting with the golden one',
            texture: "bronze_door_id"
        },
        "query_12": {
            query: '<:gdo:',
            errorMessage: 'that\'s not an opened golden door try again',
            nextItemMessage: '(:sdo:) And now the silver one',
            texture: "golden_door_open_id"
        },
        "query_13": {
            query: '<:sdo:',
            errorMessage: 'that\'s not an opened silver door try again',
            nextItemMessage: '(:bdo:) You guessed it, the bronze one',
            texture: "silver_door_open_id"
        },
        "query_14": {
            query: '<:bdo:',
            errorMessage: 'that\'s not an opened bronze door try again',
            nextItemMessage: '(:gdf:) Almost done, now we need the opened doors combined with the facha, starting with the golden one',
            texture: "bronze_door_open_id"
        },
        "query_15": {
            query: '<:gdf:',
            errorMessage: 'that\'s not an opened golden door with The Facha try again',
            nextItemMessage: '(:sdf:) Then the silver one',
            texture: "golden_door_facha_id"
        },
        "query_16": {
            query: '<:sdf:',
            errorMessage: 'that\'s not an opened silver door with The Facha try again',
            nextItemMessage: '(:bdf:) By now you should know how it goes (the bronze one\'s next)',
            texture: "silver_door_facha_id"
        },
        "query_17": {
            query: '<:bdf:',
            errorMessage: 'that\'s not an opened bronze door with The Facha try again',
            nextItemMessage: '(:gks:) Nice, only 3 more to go, now lets go with the keys on top of spikes, starting with, you guessed it, the golden one',
            texture: "bronze_door_facha_id"
        },
        "query_18": {
            query: '<:gks:',
            errorMessage: 'that\'s not a golden key on spikes try again',
            nextItemMessage: '(:sks:) And then the silver one (kinda repetitive I know but necessary)',
            texture: "golden_key_on_spike_id"
        },
        "query_19": {
            query: '<:sks:',
            errorMessage: 'that\'s not a silver key on spikes try again',
            nextItemMessage: '(:bks:) Now the bronze key on spikes',
            texture: "silver_key_on_spike_id"
        },
        "query_20": {
            query: '<:bks:',
            errorMessage: 'that\'s not a bronze key on spikes try again',
            nextItemMessage: '(:box:) And now the last one, the box',
            texture: "bronze_key_on_spike_id"
        },
        "query_21": {
            query: '<:box:',
            errorMessage: 'that\'s not a box try again',
            nextItemMessage: 'That\'s it you\'re all set now, Take it for a spin using //play and GLHF!',
            texture: "box",
        }
    }

    let queryIndex = 1

    function collectTextures(sentMessage) {
        const replyCollector = new Discord.MessageCollector(sentMessage.channel, m => m.author.id === user.id, { time: 30000 })
        replyCollector.on('collect', msg => {
            if (msg.content.startsWith(querys["query_" + queryIndex].query)) {
                if (queryIndex <= 11) {
                    textures_ids.ids[querys["query_" + queryIndex].texture] = trimIDMsg(msg.content)
                    console.log(trimIDMsg(msg.content))
                } else {
                    textures_ids.ids[querys["query_" + queryIndex].texture] = trimIDMsg2(msg.content)
                    console.log(trimIDMsg2(msg.content))
                }
                msg.delete()
                sentMessage.edit(querys["query_" + queryIndex].nextItemMessage)
                replyCollector.stop()
            } else {
                sentMessage.edit(querys["query_" + queryIndex].errorMessage)
                msg.delete()
            }
        })
        replyCollector.on('end', collected => { 
            if (queryIndex != 22) {
                queryIndex++
                collectTextures(sentMessage)
            } else {
                fs.writeFileSync('textureID.json', JSON.stringify(textures_ids), 'utf8')
                console.log('Setup Successful')
            }
        })
    }

    msg.channel.send('(:fr:) Ok lets start the setup first send the wall texture').then( sentMessage => {
        collectTextures(sentMessage)
    })
}
                
client.login(BOT_TOKEN)

function game(msg) {
    const jsonString = fs.readFileSync('./textureID.json')
    const textureJSON = JSON.parse(jsonString)

    let textures = {
        frame: `<:fr:${textureJSON.ids.frame_id}>`,
        inside: `⬛`,
        spike: `<:sp:${textureJSON.ids.spike_id}>`,
        exit: `<:ex:${textureJSON.ids.exit_id}>`,
        happy_facha: `<:hf:${textureJSON.ids.happy_facha_id}>`,
        angry_facha: `<:af:${textureJSON.ids.angry_facha_id}>`,
        golden_key: `<:gk:${textureJSON.ids.golden_key_id}>`,
        silver_key: `<:sk:${textureJSON.ids.silver_key_id}>`,
        bronze_key: `<:bk:${textureJSON.ids.bronze_key_id}>`,
        golden_door: `<:gd:${textureJSON.ids.golden_door_id}>`,
        silver_door: `<:sd:${textureJSON.ids.silver_door_id}>`,
        bronze_door: `<:bd:${textureJSON.ids.bronze_door_id}>`,
        golden_door_open: `<:gdo:${textureJSON.ids.golden_door_open_id}>`,
        silver_door_open: `<:sdo:${textureJSON.ids.silver_door_open_id}>`,
        bronze_door_open: `<:bdo:${textureJSON.ids.bronze_door_open_id}>`,
        golden_door_facha: `<:gdf:${textureJSON.ids.golden_door_facha_id}>`,
        silver_door_facha: `<:sdf:${textureJSON.ids.silver_door_facha_id}>`,
        bronze_door_facha: `<:bdf:${textureJSON.ids.bronze_door_facha_id}>`,
        golden_key_on_spike: `<:gks:${textureJSON.ids.golden_key_on_spike_id}>`,
        silver_key_on_spikes: `<:sks:${textureJSON.ids.silver_key_on_spike_id}`,
        bronze_key_on_spikes: `<:bks:${textureJSON.ids.bronze_key_on_spike_id}`,
        box: `<:box:${textureJSON.ids.box}>`
    }

    let lvl_number = 1
    let lvl = levels['lvl_' + lvl_number]

    function setLvl() {
        lvl = levels['lvl_' + lvl_number]
    }

    let boxes = {
        "boxes_x": lvl.box.box_x,
        "boxes_y": lvl.box.box_y
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
    let golden_door_opened =[]
    let golden_index = 0
    while (golden_index < lvl.doors.golden_door_x.length) {
        golden_door_opened.push(false)
        golden_index ++
    }

    let silver_door_opened =[]
    let silver_index = 0
    while (silver_index < lvl.doors.silver_door_x.length) {
        silver_door_opened.push(false)
        silver_index ++
    }

    let bronze_door_opened =[]
    let bronze_index = 0
    while (bronze_index < lvl.doors.bronze_door_x.length) {
        bronze_door_opened.push(false)
        bronze_index ++
    }

    player_x = lvl.player_x
    player_y = lvl.player_y
    moves = lvl.moves
    lives = 3

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
        collector.on('collect', (reaction) => {
            console.log('got a reaction')

            if (moves <= 0) {collector.stop('https://www.youtube.com/watch?v=OLpeX4RRo28')}

            movement(reaction.emoji.name ,sentMessage)
            
            if (lvl.exit.exit_x === player_x + 2 &&
                lvl.exit.exit_y === player_y + 2) {
                    win = true
                    collector.stop()
            }
        });
    
        collector.on('end', collected => {
            if (win === true) {
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
    
                    let collector = sentMessage.createReactionCollector(repeatFilter, { time: 35000 });
                    collector.on('collect', (reaction, collector) => {
                        console.log('got a reaction')
                        switch (reaction.emoji.name) {
                            case '⏩':
                                if (lvl_number === 7) {
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
                                map_x = lvl.map_x
                                map_y = lvl.map_y
                                player_x = lvl.player_x
                                player_y = lvl.player_y
                                moves = lvl.moves
                                has_golden_key = false
                                has_silver_key = false
                                has_bronze_key = false
                                
                                golden_door_opened = []
                                let golden_index = 0
                                while (golden_index < lvl.doors.golden_door_x.length) {
                                    golden_door_opened.push(false)
                                    golden_index ++
                                }

                                silver_door_opened = []
                                let silver_index = 0
                                while (silver_index < lvl.doors.silver_door_x.length) {
                                    silver_door_opened.push(false)
                                    silver_index ++
                                }

                                bronze_door_opened = []
                                let bronze_index = 0
                                while (bronze_index < lvl.doors.bronze_door_x.length) {
                                    bronze_door_opened.push(false)
                                    bronze_index ++
                                }

                                boxes.boxes_x = lvl.box.box_x
                                boxes.boxes_y = lvl.box.box_y

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
            } else if (lives === 1){
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
    
                    let collector = sentMessage.createReactionCollector(repeatFilter, { time: 35000 });
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

                                golden_door_opened = []
                                let golden_index = 0
                                while (golden_index < lvl.doors.golden_door_x.length) {
                                    golden_door_opened.push(false)
                                    golden_index ++
                                }

                                silver_door_opened = []
                                let silver_index = 0
                                while (silver_index < lvl.doors.silver_door_x.length) {
                                    silver_door_opened.push(false)
                                    silver_index ++
                                }

                                bronze_door_opened = []
                                let bronze_index = 0
                                while (bronze_index < lvl.doors.bronze_door_x.length) {
                                    bronze_door_opened.push(false)
                                    bronze_index ++
                                }

                                boxes.boxes_x = lvl.box.box_x
                                boxes.boxes_y = lvl.box.box_y

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
        let box_index = 0
        let golden_index = 0
        let silver_index = 0
        let bronze_index = 0
    
        for (i=0;i<row;i++) {
            x = 1
            console.log(y)
            if (y === 1 || y === map_y) {map += textures.frame}
            for (j=0;j<col;j++) {
                if (y === 1 || y === map_y) {
                    // render the main frame and the exit \/
                    if (x + 1 === map_x) {
                            map += textures.frame 
                            break
                    } else {
                        map += textures.frame
                    }
                    // render walls \/
                } else if (lvl.walls.lvl_walls_x[wall_index] === x &&
                    lvl.walls.lvl_walls_y[wall_index] === y)
                {
                    map += textures.frame
                    wall_index ++
                    // render box box as arcade riven \/
                } else if (boxes.boxes_x[box_index] === x &&
                    boxes.boxes_y[box_index] === y)
                {
                    map += textures.box
                    box_index ++
                    // render angry facha on spikes \/
                } else if (lvl.spikes.lvl_spikes_x[spike_index] === x &&
                    lvl.spikes.lvl_spikes_y[spike_index] === y &&
                    player_x + 2 === x && player_y + 2 === y)
                {
                    map += textures.angry_facha
                    spike_index ++
                    // render golden key on spikes \/
                } else if (lvl.spikes.lvl_spikes_x[spike_index] === x &&
                    lvl.spikes.lvl_spikes_y[spike_index] === y && lvl.keys.golden_key_x === x &&
                    lvl.keys.golden_key_y === y && has_golden_key === false
                    )
                {
                    map += textures.golden_key_on_spike
                    spike_index ++
                    // render silver key on spikes \/
                } else if (lvl.spikes.lvl_spikes_x[spike_index] === x &&
                    lvl.spikes.lvl_spikes_y[spike_index] === y && lvl.keys.silver_key_x === x &&
                    lvl.keys.silver_key_y === y && has_silver_key === false
                    )
                {
                    map += textures.silver_key_on_spike
                    spike_index ++
                    // render bronze key on spikes \/
                } else if (lvl.spikes.lvl_spikes_x[spike_index] === x &&
                    lvl.spikes.lvl_spikes_y[spike_index] === y && lvl.keys.bronze_key_x === x &&
                    lvl.keys.bronze_key_y === y && has_bronze_key === false
                    )
                {
                    map += textures.golden_key_on_spike
                    spike_index ++
                    // render spikes \/
                } else if (lvl.spikes.lvl_spikes_x[spike_index] === x &&
                    lvl.spikes.lvl_spikes_y[spike_index] === y)
                {
                    map += textures.spike
                    spike_index ++
                    // render player on opened golden door \/
                } else if (lvl.doors.golden_door_x[golden_index] === x &&
                    lvl.doors.golden_door_y[golden_index] === y &&
                    player_x + 2 === x && player_y + 2 === y)
                {
                    map += textures.golden_door_facha
                    // render player on opened silver door \/
                } else if (lvl.doors.silver_door_x[silver_index] === x &&
                    lvl.doors.silver_door_y[silver_index] === y &&
                    player_x + 2 === x && player_y + 2 === y)
                {
                    map += textures.silver_door_facha
                    // render player on opened bronze door \/
                } else if (lvl.doors.bronze_door_x[bronze_index] === x &&
                    lvl.doors.bronze_door_y[bronze_index] === y &&
                    player_x + 2 === x && player_y + 2 === y)
                {
                    map += textures.bronze_door_facha
                    // render golden door opened \/
                } else if (lvl.doors.golden_door_x[golden_index] === x &&
                    lvl.doors.golden_door_y[golden_index] === y &&
                    golden_door_opened[golden_index] === true)
                {
                    map += textures.golden_door_open
                    golden_index ++
                    // render silver door opened\/
                } else if (lvl.doors.silver_door_x[silver_index] === x &&
                    lvl.doors.silver_door_y[silver_index] === y &&
                    silver_door_opened[silver_index] === true)
                {
                    map += textures.silver_door_open
                    silver_index ++
                    // render bronze door opened \/
                } else if (lvl.doors.bronze_door_x[bronze_index] === x &&
                    lvl.doors.bronze_door_y[bronze_index] === y &&
                    bronze_door_opened[bronze_index] === true)
                {
                    map += textures.bronze_door_open
                    bronze_index ++
                    // render golden door \/
                } else if (lvl.doors.golden_door_x[golden_index] === x &&
                    lvl.doors.golden_door_y[golden_index] === y)
                {
                    map += textures.golden_door
                    golden_index ++
                    // render silver door \/
                } else if (lvl.doors.silver_door_x[silver_index] === x &&
                    lvl.doors.silver_door_y[silver_index] === y)
                {
                    map += textures.silver_door
                    silver_index ++
                    // render bronze door \/
                } else if (lvl.doors.bronze_door_x[bronze_index] === x &&
                    lvl.doors.bronze_door_y[bronze_index] === y)
                {
                    map += textures.bronze_door
                    bronze_index ++
                    // render golden key \/
                } else if (lvl.keys.golden_key_x === x &&
                    lvl.keys.golden_key_y === y && has_golden_key === false)
                {
                    map += textures.golden_key
                    // render silver key \/
                } else if (lvl.keys.silver_key_x === x &&
                    lvl.keys.silver_key_y === y && has_silver_key === false)
                {
                    map += textures.silver_key
                    // render bronze key \/
                } else if (lvl.keys.bronze_key_x === x &&
                    lvl.keys.bronze_key_y === y && has_bronze_key === false)
                {
                    map += textures.bronze_key
                    // render facha \/
                } else if (lvl.exit.exit_x === x &&
                    lvl.exit.exit_y === y &&
                    player_x + 2 === x && player_y + 2 === y) {
                    map += textures.happy_facha
                } else if (lvl.exit.exit_x === x &&
                    lvl.exit.exit_y === y) {
                    map += textures.exit
                } else if (player_x + 2 === x && player_y + 2 === y) {
                    map += facha
                } else if (x === 1 || x === map_x) {
                    // render the rest of the frame
                    map += textures.frame
                } else { map += textures.inside }
                x ++
            }
            y ++
            map += ` \n`
        }
        for (i=0;i<3;i++) {
            map += `** **`
            map += `\n`
        }
        console.log(map.length)

        return buildInterface(lvl_number, lives, moves) + map
    }
    
    function rightCollision(x, y) {
        let index = 0
        const limit = lvl.walls.lvl_walls_x.length
        let golden_door_index = 0
        let silver_door_index = 0
        let bronze_door_index = 0
        const golden_door_limit = lvl.doors.golden_door_x.length
        const silver_door_limit = lvl.doors.silver_door_x.length
        const bronze_door_limit = lvl.doors.bronze_door_x.length
    
        let collisions = 0
    
        while (index < limit) {
            if (x + 3 === lvl.walls.lvl_walls_x[index] &&
                y + 2 === lvl.walls.lvl_walls_y[index]
            ) { collisions ++ }
            index++
        }
        while (golden_door_index < golden_door_limit) {
            if (x + 3 === lvl.doors.golden_door_x[golden_door_index] &&
                y + 2 === lvl.doors.golden_door_y[golden_door_index] &&
                has_golden_key === false
            ) { collisions ++ }
            golden_door_index ++
        }
        while (silver_door_index < silver_door_limit) {
            if (x + 3 === lvl.doors.silver_door_x[silver_door_index] &&
                y + 2 === lvl.doors.silver_door_y[silver_door_index] &&
                has_silver_key === false
            ) { collisions ++ }
            silver_door_index ++
        }
        while (bronze_door_index < bronze_door_limit) {
            if (x + 3 === lvl.doors.bronze_door_x[bronze_door_index] &&
                y + 2 === lvl.doors.bronze_door_y[bronze_door_index] &&
                has_bronze_key === false
            ) { collisions ++ }
            bronze_door_index ++
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
        let golden_door_index = 0
        let silver_door_index = 0
        let bronze_door_index = 0
        const golden_door_limit = lvl.doors.golden_door_x.length
        const silver_door_limit = lvl.doors.silver_door_x.length
        const bronze_door_limit = lvl.doors.bronze_door_x.length
    
        let collisions = 0
    
        while (index < limit) {
            if (x + 1 === lvl.walls.lvl_walls_x[index] &&
                y + 2 === lvl.walls.lvl_walls_y[index]
            ) { collisions ++ }
            index++
        }
        while (golden_door_index < golden_door_limit) {
            if (x + 1 === lvl.doors.golden_door_x[golden_door_index] &&
                y + 2 === lvl.doors.golden_door_y[golden_door_index] &&
                has_golden_key === false
            ) { collisions ++ }
            golden_door_index ++
        }
        while (silver_door_index < silver_door_limit) {
            if (x + 1 === lvl.doors.silver_door_x[silver_door_index] &&
                y + 2 === lvl.doors.silver_door_y[silver_door_index] &&
                has_silver_key === false
            ) { collisions ++ }
            silver_door_index ++
        }
        while (bronze_door_index < bronze_door_limit) {
            if (x + 1 === lvl.doors.bronze_door_x[bronze_door_index] &&
                y + 2 === lvl.doors.bronze_door_y[bronze_door_index] &&
                has_bronze_key === false
            ) { collisions ++ }
            bronze_door_index ++
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
        let golden_door_index = 0
        let silver_door_index = 0
        let bronze_door_index = 0
        const golden_door_limit = lvl.doors.golden_door_x.length
        const silver_door_limit = lvl.doors.silver_door_x.length
        const bronze_door_limit = lvl.doors.bronze_door_x.length
    
        let collisions = 0

        while (index < limit) {
            if (x + 2 === lvl.walls.lvl_walls_x[index] &&
                y + 1 === lvl.walls.lvl_walls_y[index]
            ) { collisions ++ }
            index++
        }
        while (golden_door_index < golden_door_limit) {
            if (x + 2 === lvl.doors.golden_door_x[golden_door_index] &&
                y + 1 === lvl.doors.golden_door_y[golden_door_index] &&
                has_golden_key === false
            ) { collisions ++ }
            golden_door_index ++
        }
        while (silver_door_index < silver_door_limit) {
            if (x + 2 === lvl.doors.silver_door_x[silver_door_index] &&
                y + 1 === lvl.doors.silver_door_y[silver_door_index] &&
                has_silver_key === false
            ) { collisions ++ }
            silver_door_index ++
        }
        while (bronze_door_index < bronze_door_limit) {
            if (x + 2 === lvl.doors.bronze_door_x[bronze_door_index] &&
                y + 1 === lvl.doors.bronze_door_y[bronze_door_index] &&
                has_bronze_key === false
            ) { collisions ++ }
            bronze_door_index ++
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
        let golden_door_index = 0
        let silver_door_index = 0
        let bronze_door_index = 0
        const golden_door_limit = lvl.doors.golden_door_x.length
        const silver_door_limit = lvl.doors.silver_door_x.length
        const bronze_door_limit = lvl.doors.bronze_door_x.length
    
        let collisions = 0
    
        while (index < limit) {
            if (x + 2 === lvl.walls.lvl_walls_x[index] &&
                y + 3 === lvl.walls.lvl_walls_y[index] ||
                (x + 2 === lvl.doors.golden_door_x &&
                y + 3 === lvl.doors.golden_door_y &&
                has_golden_key === false
                ) || 
                (x + 2 === lvl.doors.silver_door_x &&
                y + 3 === lvl.doors.silver_door_y &&
                has_silver_key === false
                ) || 
                (x + 2 === lvl.doors.bronze_door_x &&
                y + 3 === lvl.doors.bronze_door_y &&
                has_bronze_key === false
                )
            ) { collisions ++ }
            index++
        }
        while (index < limit) {
            if (x + 2 === lvl.walls.lvl_walls_x[index] &&
                y + 3 === lvl.walls.lvl_walls_y[index]
            ) { collisions ++ }
            index++
        }
        while (golden_door_index < golden_door_limit) {
            if (x + 2 === lvl.doors.golden_door_x[golden_door_index] &&
                y + 3 === lvl.doors.golden_door_y[golden_door_index] &&
                has_golden_key === false
            ) { collisions ++ }
            golden_door_index ++
        }
        while (silver_door_index < silver_door_limit) {
            if (x + 2 === lvl.doors.silver_door_x[silver_door_index] &&
                y + 3 === lvl.doors.silver_door_y[silver_door_index] &&
                has_silver_key === false
            ) { collisions ++ }
            silver_door_index ++
        }
        while (bronze_door_index < bronze_door_limit) {
            if (x + 2 === lvl.doors.bronze_door_x[bronze_door_index] &&
                y + 3 === lvl.doors.bronze_door_y[bronze_door_index] &&
                has_bronze_key === false
            ) { collisions ++ }
            bronze_door_index ++
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
    
        if (lives === 0) {
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
            if (s_x === lvl.spikes.lvl_spikes_x[index] &&
                s_y === lvl.spikes.lvl_spikes_y[index]
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
        if (x + 2 === lvl.keys.golden_key_x &&
            y + 2 === lvl.keys.golden_key_y) {
                return 'gold'
        }
        if (x + 2 === lvl.keys.silver_key_x &&
            y + 2 === lvl.keys.silver_key_y) {
                return 'silver'
        }
        if (x + 2 === lvl.keys.bronze_key_x &&
            y + 2 === lvl.keys.bronze_key_y) {
                return 'bronze'
        }
    }
    
    function openDoor(x, y) {
        let golden_index = 0
        let silver_index = 0 
        let bronze_index = 0
        const golden_limit = lvl.doors.golden_door_x.length
        const silver_limit = lvl.doors.silver_door_x.length
        const bronze_limit = lvl.doors.bronze_door_x.length

        while (golden_index < golden_limit) {
            if (x + 2 === lvl.doors.golden_door_x[golden_index] &&
                y + 2 === lvl.doors.golden_door_y[golden_index]) {
                    golden_door_opened[golden_index] = true
            }
            golden_index ++
        }
        while (silver_index < silver_limit) {
            if (x + 2 === lvl.doors.silver_door_x[silver_index] &&
                y + 2 === lvl.doors.silver_door_y[silver_index]) {
                    silver_door_opened[silver_index] = true
            }
            silver_index ++
        }
        while (bronze_index < bronze_limit) {
            if (x + 2 === lvl.doors.bronze_door_x[bronze_index] &&
                y + 2 === lvl.doors.bronze_door_y[bronze_index]) {
                    bronze_door_opened[bronze_index] = true
            }
            bronze_index ++
        }  
    }
    function movement(direction, sentMessage) {
        console.log(direction)
        const position = {
            "➡": {
                map_fixed_position: player_x + 3 === map_x,
                collision: rightCollision(player_x, player_y),
                boxMovement: rightMoveBox(player_x, player_y),
                currentDirection: 'right',
                increase: player_x + 1,
                orientation: 'x'
            },
            "⬅": {
                map_fixed_position: player_x === 0,
                collision: leftCollision(player_x, player_y),
                boxMovement: leftMoveBox(player_x, player_y),
                currentDirection: 'left',
                increase: player_x - 1,
                orientation: 'x'
            },
            "⬆": {
                map_fixed_position: player_y === 0,
                collision: topCollision(player_x, player_y),
                boxMovement: topMoveBox(player_x, player_y),
                currentDirection: 'up',
                increase: player_y - 1,
                orientation: 'y'
            },
            "⬇": {
                map_fixed_position: player_y + 3 === map_y,
                collision: bottomCollision(player_x, player_y),
                boxMovement: bottomMoveBox(player_x, player_y),
                currentDirection: 'down',
                increase: player_y + 1,
                orientation: 'y'
            }
        }
    
        const currentPosition = position[direction]
        console.log(bronze_door_opened[1])
    
        moves--
        sentMessage.reactions.resolve(direction).users.remove(currentUser[0])
        if (currentPosition.map_fixed_position  || currentPosition.collision ||
            currentPosition.boxMovement == 'a donde vas master?') {
            console.log(`can\'t go ${currentPosition.currentDirection}`)
        } else {
            console.log(`go ${currentPosition.currentDirection}`)
            if (isInSpike(player_x, player_y, currentPosition.currentDirection) === true) {
                console.log('is in spike')
                moves--
            }
            if (currentPosition.orientation === 'x') {
                player_x = currentPosition.increase
            } else {
                player_y = currentPosition.increase
            }
            if (takeKey(player_x, player_y) === 'gold') has_golden_key = true
                
            if (takeKey(player_x, player_y) === 'silver') has_silver_key = true
                
            if (takeKey(player_x, player_y) === 'bronze') has_bronze_key = true

            openDoor(player_x, player_y)
            
            sentMessage.edit(buildMap(map_x, map_y))
        }
    }
    function rightMoveBox(x, y) {
        let index = 0
        let wall_index = 0
        let box_identifier = 0

        const limit = lvl.box.box_x.length

        const wall_limit = lvl.walls.lvl_walls_x.length
    
        let collisions = 0
    
        while (index < limit) {
            if (x + 3 === lvl.box.box_x[index] &&
                y + 2 === lvl.box.box_y[index]
            ) { collisions ++ , box_identifier = index}
            if (x + 3 === lvl.box.box_x[index] &&
                y + 2 === lvl.box.box_y[index] && ((
                    x + 4 === lvl.box.box_x[index + 1] &&
                    y + 2 === lvl.box.box_y[index + 1]
                ) || (
                    x + 4 === lvl.map_x
                ))
            ) { collisions += 2 }
            wall_index = 0
            while (wall_index < wall_limit) {
                x + 4 === lvl.walls.lvl_walls_x[wall_index] &&
                y + 2 === lvl.walls.lvl_walls_y[wall_index]
                wall_index ++
            }
            index++
        }
        
        
        if (collisions === 1) {
            boxes.boxes_x[box_identifier] ++
            return true
        } else if (collisions > 1) {  
            return 'a donde vas master?'
        } else return false
    }
    function leftMoveBox(x, y) {
        let index = 0
        let wall_index = 0
        let box_identifier = 0

        const limit = lvl.box.box_x.length

        const wall_limit = lvl.walls.lvl_walls_x.length
    
        let collisions = 0

        while (index < limit) {
            if (x + 1 === lvl.box.box_x[index] &&
                y + 2 === lvl.box.box_y[index]
            ) { collisions ++ , box_identifier = index}
            if (x + 1 === lvl.box.box_x[index] &&
                y + 2 === lvl.box.box_y[index] && ((
                    x  === lvl.box.box_x[index + 1] &&
                    y + 2 === lvl.box.box_y[index + 1]
                ) || (
                    x === 0
                ))
            ) { collisions += 2 }
            wall_index = 0
            while (wall_index < wall_limit) {
                x  === lvl.walls.lvl_walls_x[wall_index] &&
                y + 2 === lvl.walls.lvl_walls_y[wall_index]
                wall_index ++
            }
            index++
        }

        if (collisions === 1) {
            boxes.boxes_x[box_identifier] --
            return true
        } else if (collisions > 1) {  
            return 'a donde vas master?'
        } else return false
    }
    function topMoveBox(x, y) {
        let index = 0
        let wall_index = 0
        let box_identifier = 0

        const limit = lvl.box.box_x.length

        const wall_limit = lvl.walls.lvl_walls_x.length
    
        let collisions = 0

        while (index < limit) {
            if (x + 2 === lvl.box.box_x[index] &&
                y + 1 === lvl.box.box_y[index]
            ) { collisions ++ , box_identifier = index}
            if (x + 2 === lvl.box.box_x[index] &&
                y + 1 === lvl.box.box_y[index] && ((
                    x + 2 === lvl.box.box_x[index + 1] &&
                    y === lvl.box.box_y[index + 1]
                ) || (
                    y === 0
                ))
            ) { collisions += 2 }
            wall_index = 0
            while (wall_index < wall_limit) {
                x + 4 === lvl.walls.lvl_walls_x[wall_index] &&
                y + 2 === lvl.walls.lvl_walls_y[wall_index]
                wall_index ++
            }
            index++
        }

        if (collisions === 1) {
            boxes.boxes_y[box_identifier] --
            return true
        } else if (collisions > 1) {  
            return 'a donde vas master?'
        } else return false
    }
    function bottomMoveBox(x, y) {
        let index = 0
        let wall_index = 0
        let box_identifier = 0

        const limit = lvl.box.box_x.length

        const wall_limit = lvl.walls.lvl_walls_x.length
    
        let collisions = 0

        while (index < limit) {
            if (x + 2 === lvl.box.box_x[index] &&
                y + 3 === lvl.box.box_y[index]
            ) { collisions ++ , box_identifier = index}
            if (x + 2 === lvl.box.box_x[index] &&
                y + 3 === lvl.box.box_y[index] && ((
                    x + 2 === lvl.box.box_x[index + 1] &&
                    y + 4 === lvl.box.box_y[index + 1]
                ) || (
                    y + 4 === lvl.map_y
                ))
            ) { collisions += 2 }
            wall_index = 0
            while (wall_index < wall_limit) {
                x + 4 === lvl.walls.lvl_walls_x[wall_index] &&
                y + 2 === lvl.walls.lvl_walls_y[wall_index]
                wall_index ++
            }
            index++
        }
        
        if (collisions === 1) {
            boxes.boxes_y[box_identifier] ++
            return true
        } else if (collisions > 1) {  
            return 'a donde vas master?'
        } else return false
    }
} // https://www.youtube.com/watch?v=X33nc9XXNYs