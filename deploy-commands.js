const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { botAppID, botToken } = require('./config.json');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
console.log(commandFiles);

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	console.log(filePath);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(botToken);

rest.put(Routes.applicationCommands(botAppID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);