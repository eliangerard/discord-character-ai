const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('conversations')
		.setDescription('Muestra las conversaciones que has tenido'),
	async execute(interaction, client) {		
        // const embed = new EmbedBuilder()
        // .setTitle("❔ Ayuda")
        // .setDescription("Encuentra el ID del personaje en la URL de la página oficial [character.ai](https://beta.character.ai/)")
        // .setImage("https://camo.githubusercontent.com/4dd4c40b7ac315e0b2a0342aeea3ad36774fd1edd6c76f1e6f00dd624596abb5/68747470733a2f2f692e696d6775722e636f6d2f6e643836664e342e706e67")
        // .setTimestamp()
        // .setColor("#FFFFFF");

        console.log(await client.chat.getSavedConversations());
        interaction.reply( { embeds: [embed] } ).then(msg => {
            setTimeout(() => msg.delete(), 15000)
        });
		await interaction.reply("Hola");
	},
};