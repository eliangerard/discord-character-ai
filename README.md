# discord-character-ai
A discord bot for Character AI integration

# Instructions
Right now, the guest mode is not working, so you must to create an account at [character.ai](https://beta.character.ai/) and get the session token, it last at least 1 month so you don't have to worry a lot if it expires, to get it:
+ Login at [character.ai](https://beta.character.ai/) 
+ Press F12 and go to **Application** section
+ Search for **Local Storage** and look for the element with the tag *@@auth0spajs@@*
+ Open the *body* and copy the whole *"access_token"*, it's pretty large, paste it on the config.json and that's it!

## Config
The config-template.json contains everything that you need, discord bot's token and application ID, also the session token of character.ai, fill the fields at the json and delete the "-template" part at the name of the file.

## Start it
> npm install

Use this command for install the necessary packages

> node deploy-commands

Use this for register the slash commands at your bot

> node .

Use this for start the bot!

**Don't forget to enable the "Use Application Commands" permission when you invite your bot**

There is an example of link with the permission included:

https://discord.com/oauth2/authorize?client_id=INSERT_CLIENT_ID_HERE&scope=bot&permissions=2147483648

## Commands
+ help: Explains how to get a Character ID
+ newchat: Start a new chat with a new Character, (char: Char ID or Name if already registered, query: Content of the chat)
+ register: Register a character with a name so you don't have to search his ID every time
+ chat: Continue the chat with the last character
