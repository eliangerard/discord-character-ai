const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chat')
		.setDescription('Continúa el chat con el último personaje especificado')
        .addStringOption(option => option.setName('query').setDescription('Chatea con el personaje').setRequired(true)),
	async execute(interaction, client) {
		const query = interaction.options.getString('query');
		
		await interaction.deferReply();
		client.interaction = await interaction;

		const chat = await client.characterAI.createOrContinueChat(client.lastChar);
    	const response = await chat.sendAndAwaitResponse(query, true)

		interaction.editReply(response);
	},
};