module.exports = {
    levels: {
        'lvl_1': {
            map_x: 9,
            map_y: 5,
            player_x: 0,
            player_y: 0,
            moves: 20,
            'walls': {
                lvl_walls_x: [4,5,7,8,5],
                lvl_walls_y: [3,3,3,3,4]
            },
            'spikes': {
                lvl_spikes_x: [6,2],
                lvl_spikes_y: [2,3]
            },
            'keys': {
                golden_key_x: 8,
                golden_key_y: 2,
                silver_key_x: 2, 
                silver_key_y: 4,
                bronze_key_x: 5, 
                bronze_key_y: 2,
            },
            'doors': {
                golden_door_x: 7,
                golden_door_y: 4,
                silver_door_x: 6, 
                silver_door_y: 3,
                bronze_door_x: 3, 
                bronze_door_y: 3,
            },
            'exit': {
                exit_x: 8, exit_y: 4
            }
        },
        'lvl_2' : {
            map_x: 9,
            map_y: 5,
            player_x: 6,
            player_y: 2,
            moves: 20,
            'walls': {
                lvl_walls_x: [4,6,4,6],
                lvl_walls_y: [2,2,3,3]
            },
            'spikes': {
                lvl_spikes_x: [3,7],
                lvl_spikes_y: [3,3]
            },
            'keys': {
                golden_key_x: 2,
                golden_key_y: 2,
                silver_key_x: 2, 
                silver_key_y: 4,
                bronze_key_x: 7, 
                bronze_key_y: 2,
            },
            'doors': {
                golden_door_x: 5,
                golden_door_y: 3,
                silver_door_x: 2,
                silver_door_y: 3,
                bronze_door_x: 6,  
                bronze_door_y: 4,
            },
            'exit': {
                exit_x: 5, exit_y: 2
            }
        },
        'lvl_3' : {
            map_x: 9,
            map_y: 11,
            player_x: 0,
            player_y: 0,
            moves: 31,
            'walls': {
                lvl_walls_x: [6,7,6,7,2,3,4,2,2,4,6,7,2,4,6,7,2,4,2,4,5,6,7,8],
                lvl_walls_y: [3,3,4,4,5,5,5,6,7,7,7,7,8,8,8,8,9,9,10,10,10,10,10,10]
            },
            'spikes': {
                lvl_spikes_x: [7,2,3,5,8,2,3,6,3,4,7,5,8],
                lvl_spikes_y: [2,3,3,3,3,4,4,5,6,6,6,9,9]
            },
            'keys': {
                golden_key_x: 2,
                golden_key_y: 4,
                silver_key_x: 8, 
                silver_key_y: 6,
                bronze_key_x: 8, 
                bronze_key_y: 2,
            },
            'doors': {
                golden_door_x: 3,
                golden_door_y: 7,
                silver_door_x: 3,
                silver_door_y: 8,
                bronze_door_x: 3,  
                bronze_door_y: 9,
            },
            'exit': {
                exit_x: 3, exit_y: 10
            }
        }
    }
}