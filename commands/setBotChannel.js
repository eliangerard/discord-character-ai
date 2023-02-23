const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const { channel } = require('node:diagnostics_channel');
const fs = require('node:fs');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('setbotchannel')
		.setDescription('Establece un canal en el que el bot converse como si fuera uno más')
		.addStringOption(option => option.setName('char').setDescription('ID del personaje').setRequired(true))
		.addStringOption(option => option.setName('canal').setDescription('ID del canal').setRequired(false)),
	async execute(interaction, client) {
		let char = interaction.options.getString('char');
		let canal = interaction.options.getString('canal');

        client.characters.find(element => {
            if(element.toLowerCase().includes(char.toLowerCase()))
                char = element.substring(element.indexOf('----$')+5);
        })

        client.interaction = await interaction;
		await interaction.deferReply();

        if(canal == null)
            canal = interaction.channelId;

        const registro = {
            "channelId" : canal,
            "charId" : char
        };

        if(client.botChannels[interaction.guildId] != null){
            let alreadyExists = false;
            //Searching if the channel is already registered and updating the character
            client.botChannels[interaction.guildId].forEach((element) => {
                if(element.channelId = registro.channelId){
                    element.charId = registro.charId;
                    alreadyExists = true;
                }
            });

            if(!alreadyExists) client.botChannels[interaction.guildId].push(registro);
        }
        else{
            client.botChannels[interaction.guildId] = new Array();
            client.botChannels[interaction.guildId][0] = registro;
        } 

        fs.writeFile("botChannels.json", JSON.stringify(client.botChannels), 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
         
            console.log("BotChannels.json file has been updated");
        });
	
        const embed = new EmbedBuilder()
            .setTitle(`✅ El personaje del <#${canal}> ha sido actualizado`)
            .setColor("#FFFFFF");

        interaction.editReply( { embeds: [embed] } ).then(msg => {
            setTimeout(() => msg.delete(), 15000)
        });
	},
};