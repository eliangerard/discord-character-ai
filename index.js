const CharacterAI = require('node_characterai');
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });
client.characterAI = new CharacterAI();
client.config = require("./config.json");
client.characters = fs.readFileSync('./characters.txt', 'utf8').split('\n');
client.charactersPath = path.join(__dirname, 'characters.txt');

(async() => {
    await client.login(client.config.botToken);
    try {
        if(client.config.sessionAIToken.length > 0)
            await client.characterAI.authenticateWithToken(client.config.sessionAIToken);
        else
            await client.characterAI.authenticateAsGuest();
    } catch {
        console.log("No se pudo logear a Character AI, intentalo de nuevo más tarde o revisa la expiración de tu token, suelen durar 1 mes");
    }
})();

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

commandFiles.forEach(file => {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
});

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

eventFiles.forEach(file => {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name,(...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
});


