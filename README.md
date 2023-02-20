# discord-character-ai
A discord bot for Character AI integration

# Instructions
Right now, the guest mode is not working, so you must to create an account at [character.ai](https://beta.character.ai/) and get the session token, it last at least 1 month so you don't have to worry a lot if it expires, to get it:
+ Login at [character.ai](https://beta.character.ai/) 
+ Press F12 and go to **Application** section
+ Search for **Local Storage** and look for the element with the tag *@@auth0spajs@@*
+ Open the *body* and copy the whole *"access_token"*, it's pretty large, paste it on the config.json and that's it!

## Commands
+ help: Explains how to get a Character ID
+ newchat: Start a new chat with a new Character, (char: Char ID or Name if already registered, query: Content of the chat)
+ register: Register a character with a name so you don't have to search his ID every time
+ chat: Continue the chat with the last character
