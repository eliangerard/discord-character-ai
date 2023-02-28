const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chat')
		.setDescription('Continúa el chat con el último personaje especificado')
        .addStringOption(option => option.setName('query').setDescription('Chatea con el personaje').setRequired(true)),
	async execute(interaction, client) {
		const query = interaction.options.getString('query');
		
		if(client.lastChar == null) return interaction.reply("Aún no has hablado con ningún personaje");
		await interaction.deferReply();
		client.interaction = await interaction;

    	const { text } = await client.chat.sendAndAwaitResponse(query, true);

		interaction.editReply(text);
	},
};