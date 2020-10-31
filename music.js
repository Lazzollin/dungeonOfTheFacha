const path = require('path');

module.exports = {
    music(msg) {
        const { voice } = msg.member
    
        if (!voice.channel.id){
            msg.reply("You must be in a voice channel")
            return
        }
        voice.channel.join().then((connection)=>{
            try{
                const dispatcher = connection.play(path.join(__dirname,'/music/DotF_MainTheme.wav'))
    
                dispatcher.on('finish', () =>{
                    console.log("Replay song")
                    this.music
                })
    
            } catch(error){
                console.log(error)
            }
        })
    }
}