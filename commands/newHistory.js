const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('newhistory')
		.setDescription('Crea un nuevo historial con el personaje')
        .addStringOption(option => option.setName('char').setDescription('Ingresa el ID o nombre (Si está registrado) del personaje con el que vas a hablar').setRequired(false)),
	async execute(interaction, client) {	
        let char = interaction.options.getString('char');
        
        if(!client.chat)
            client.chat = await client.characterAI.createOrContinueChat(character);

        const response = await client.chat.saveAndStartNewChat();
        console.log(response);
        await interaction.reply("holaa "+response);
        // .then(msg => {
        //     setTimeout(() => msg.delete(), 15000)
        // });
	},
};