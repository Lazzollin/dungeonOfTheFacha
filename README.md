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

#### Setting up Node

  * I - Clone the repository

    ### For Windows Users:

      Hit Win + R and type "cmd" and navigate to the folder you want to save the game in (You can create it on the windows explorer and then copy the direction and paste it on the cmd after "cd ", if your folder is not on the C: drive, first you'll have to type your drive's letter followed by a semi colon, for example D:,  to switch to your drive)

      Example:

      > cd C:\Users\MyUsername\Documents\

      For more info on how to use cmd see [A Beginner's Guide To The Windows Command Line](https://www.makeuseof.com/tag/a-beginners-guide-to-the-windows-command-line/)

      Then, if you don't have [Node.js](https://nodejs.org/en/) installed, you should, it's in the requirements

      Once you have [Node.js](https://nodejs.org/en/) installed, on cmd, go to the folder you created for the game and clone the repository like this:

        ```
          git clone https://github.com/Lazzollin/dungeonOfTheFacha

          cd dungeonOfTheFacha

        ```
      
    ### For Linux Users
    ### For MacOs Users

  * II - Create a discord bot

    First go to the [Discord developer portal](https://discord.com/developers/applications) and create a **New Application**.

    Once you have your app created go to the **0Auth2** tab, on scopes select **"bot"** and on bot permissions select **"Administrator"**, you'll end up with a link like this 'https://discord.com/api/oauth2/authorize?client_id=(your_bot_ID)&permissions=8&scope=bot'.

    Now you can copy that link and paste it on your browser and add your new bot to a server.

  * III - Getting your bot's Token

    In order to be able to run the game on your new bot, you'll need a bot token, this is a randomly generated string that allows your bot to communicate with Discord.

    To get your token, go to the [Discord developer portal](https://discord.com/developers/applications), go to your app, and then navigate to bot, you'll see a "Click to reveal token" and under that, a button that says **"Copy"**, click that button, and boom, you hava a token.

  * IV - Using your new token

    To use your new token, go to the game folder you cloned earlier, and the **"token.js"** file, on any text editor you want, to keep it simple you can open it with Notepad, if you're using windows, Vi if you're on Linux (Or whatever text editor you have as default, probably if your using linux you kinda know what you're doing) or TextEdit if you're on MacOS.

    The "token.js" is very straightforward, just replace the 'YOUR_TOKEN' with, you guessed it, your token, then save the file and your ready to go.

  * V - Running the bot

    Great!, now you can run your bot with Node.js going to your console, and on the game folder you cloned use:

       > npm start

    Once you have the bot running, you can go to the next step


#### Setting up Discord

  * I - Server setup

    Dungeon of the Facha uses custom server emojis as textures, so you'll need to add them to your server, to do that go to the **server settings**, click on **"Emoji"** and then **"Upload Emoji"** (You need at least **_20_** available emoji slots), navigate to the game folder, then go to **textures** and select **all the images** (you can add your own textures if you want, just make a 300x300 png and replace the original with the same name).
    
  * II - Textures setup

    Now with the emoji textures added to the server there's ony one more step to do before playing.
    
    Discord Emojis ID are unique, even if you add the same picture as an emoji on two different servers, the emoji ID will be different, so you'll have to give the game the unique ID of the textures.
    
    To do that, send a message with the prefix //setup, and follow the instructions 😉.
    
    That's it, the game should recognize the //setup command and setup all the IDs for you.
    
  * III - Take it for a spin

    That's it, now you're ready to help The Facha on his adventure to find the Golden Tula, GLHF!
