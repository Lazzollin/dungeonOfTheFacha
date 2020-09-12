# Dungeon of the Facha 0.2

Simpler setup update

<img class="logo" src="./logo.png" width="250" height="250" style="border-radius:25%"/>

### The Facha is so Facha that his on a journey to find the golden Tula, because he can, hi's THE FACHA


### Setup guide 😎

#### Requirements:

  * [<img src="https://sdtimes.com/wp-content/uploads/2018/04/1_tfZa4vsI6UusJYt_fzvGnQ.png" width="16" height="16" />](https://nodejs.org/en/) Node JS
  * <img src="https://vignette.wikia.nocookie.net/sanicman/images/c/ca/Concours-discord-cartes-voeux-fortnite-france-6.png/revision/latest?cb=20191015023221" width="16" height="16" /> A Discord server (Or at least moderator permissions on one)
  * 💻 A computer with somewhat stable internet (not my case)
  * ⌚ 10 ~ 25 minutes

* I - Create a discord bot

  First go to the [Discord developer portal](https://discord.com/developers/applications) and create a **New Application**.

  Once you have your app created go to the **0Auth2** tab, on scopes select **"bot"** and on bot permissions select **"Administrator"**, you'll end up with a link like this 'https://discord.com/api/oauth2/authorize?client_id=(your_bot_ID)&permissions=8&scope=bot'.

  Now you can copy that link and paste it on your browser and add your new bot to a server.

* II - Server setup

  Dungeon of the Facha uses custom server emojis as textures, so you'll need to add them to your server, to do that go to the **server settings**, click on **"Emoji"** and then **"Upload Emoji"** (You need at least **_20_** available emoji slots), navigate to the game folder, then go to **textures** and select **all the images** (you can add your own textures if you want, just make a 300x300 png and replace the original with the same name).
  
* III - Textures setup

  Now with the emoji textures added to the server there's ony one more step to do before playing.
  
  Discord Emojis ID are unique, even if you add the same picture as an emoji on two different servers, the emoji ID will be different, so you'll have to give the game the unique ID of the textures.
  
  To do that, send a message with the prefix //setup, and follow the instructions 😉.
  
  That's it, the game should recognize the //setup command and setup all the IDs for you.
  
* IV - Take it for a spin

  That's it, now you're ready to help The Facha on his adventure to find the Golden Tula, GLHF!
