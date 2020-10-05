module.exports = {
    music(message){
        const { voice } = message.member
    
        if (!voice.channel.id){
            message.reply("You must be in a voice channel")
            return
        }
        voice.channel.join().then((connection)=>{
            try{
                const dispatcher = connection.play(path.join(__dirname,'/music/DOTF_MainTheme_Concept.wav'))
    
                dispatcher.on('finish', () =>{
                    console.log("Replay song")
                    music(message)
                })
    
            } catch(error){
                console.log(error)
            }
        })
    }
}