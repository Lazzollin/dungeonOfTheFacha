module.exports = {
    autoSetup(msg) {
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
}