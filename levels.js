module.exports = {
    levels: {
        'lvl_1': {
            map_x: 8,
            map_y: 5,
            player_x: 0,
            player_y: 2,
            moves: 18,
            'walls': {
                lvl_walls_x: [2,3,5,7],
                lvl_walls_y: [3,3,3,3]
            },
            'spikes': {
                lvl_spikes_x: [4,5],
                lvl_spikes_y: [3,4]
            },
            'keys': {
                golden_key_x: 2,
                golden_key_y: 2,
                silver_key_x: 4, 
                silver_key_y: 2,
                bronze_key_x: 7, 
                bronze_key_y: 4,
            },
            'doors': {
                golden_door_x: 7,
                golden_door_y: 2,
                silver_door_x: 3, 
                silver_door_y: 2,
                bronze_door_x: 5, 
                bronze_door_y: 2,
            },
            'exit': { exit_x: 2, exit_y: 4}
        }
    }
}