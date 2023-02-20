const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const fs = require('node:fs');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Registra un personaje para que no tengas que escribir siempre su ID')
		.addStringOption(option => option.setName('char').setDescription('Ingresa el ID del personaje a registrar (Consulta help para más info)').setRequired(true))
		.addStringOption(option => option.setName('nombre').setDescription('Dale un nombre al personaje, con este podrás hablar con él').setRequired(true)),
	async execute(interaction, client) {
		const char = interaction.options.getString('char');
		const nombre = interaction.options.getString('nombre');
		
		client.interaction = await interaction;
		await interaction.deferReply();

        if(client.characters.find(element => {
            if(element.includes(nombre) || element.includes(char)){
                const alreadyName = element.substring(4, element.indexOf('----$'));
                const embed = new EmbedBuilder()
                .setTitle(`❌ ${nombre} ya está registrado como ${alreadyName}`)
                .setColor("#FF4444");

                interaction.editReply( { embeds: [embed] } ).then(msg => {
                    setTimeout(() => msg.delete(), 15000)
                });
                return true;
            }
            return false;
        }))
            return;
        fs.appendFileSync(client.charactersPath, `\n----${nombre}----$${char}`);
        client.characters = fs.readFileSync(client.charactersPath, 'utf8').split('\n');
        const embed = new EmbedBuilder()
                .setTitle(`✅ ${nombre} registrado`)
                .setColor("#FFFFFF");

        interaction.editReply( { embeds: [embed] } ).then(msg => {
            setTimeout(() => msg.delete(), 15000)
        });
	},
};