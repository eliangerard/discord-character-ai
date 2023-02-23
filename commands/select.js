const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const fs = require('node:fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('select')
		.setDescription('Selecciona uno de los resultados de la búsqueda')
        .addIntegerOption(option => option.setName('option').setDescription('Opción seleccionada').setRequired(true)),
	async execute(interaction, client) {
		const option = interaction.options.getInteger('option');
		
        const character = client.searchedCharacters[option];
		client.lastChar = character.external_id;

        console.log(`https://characterai.io/i/400/static/avatars/${character.avatar_file_name}`);
		const embed = new EmbedBuilder()
            .setTitle(`✅ Has seleccionado a ${character.participant__name}`)
            .setThumbnail(`https://characterai.io/i/400/static/avatars/${character.avatar_file_name}`)
            .setDescription(character.greeting)
            .setColor("#FFFFFF");

        await interaction.reply( { embeds: [embed] } );
        setTimeout(() => interaction.deleteReply(), 15000);

        const nombre = character.participant__name;
        const char = character.external_id;

        if(client.characters.find(element => element.includes(nombre) || element.includes(char)))
            return;
        
        fs.appendFileSync(client.charactersPath, `\n----${nombre}----$${char}`);
        return client.characters = fs.readFileSync(client.charactersPath, 'utf8').split('\n');
	},
};