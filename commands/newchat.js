const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('newchat')
		.setDescription('Habla con el personaje especificado')
		.addStringOption(option => option.setName('char').setDescription('Ingresa el ID o nombre (Si está registrado) del personaje con el que vas a hablar').setRequired(true))
        .addStringOption(option => option.setName('query').setDescription('Comienza a chatear con el personaje').setRequired(true)),
	async execute(interaction, client) {
		let char = interaction.options.getString('char');
		const query = interaction.options.getString('query');
		let alreadyID = false;
		await interaction.deferReply();
		client.interaction = await interaction;
		
		client.characters.find(element => {
            if(element.includes(char))
                char = element.substring(element.indexOf('----$')+5);
        })
		try {
			if(char != client.lastChar)
				client.chat = await client.characterAI.createOrContinueChat(char);

			const response = await client.chat.sendAndAwaitResponse(query, true)
			console.log(response);
			client.lastChar = char;

			interaction.editReply(response);
		} catch(e){
			const embed = new EmbedBuilder()
                .setTitle(`❌ Error`)
				.setDescription(e)
                .setColor("#FF4444");

                return interaction.editReply( { embeds: [embed] } ).then(msg => {
                    setTimeout(() => msg.delete(), 15000)
                });
		}
	},
};