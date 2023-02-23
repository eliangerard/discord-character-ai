const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");

let page = 0;
let totalPages;

let q;
const updateChars = (chars) => {
    q = ``;
    for(let i = page*10+1; i < (chars.length > (page*10)+11 ? page*10+11 : chars.length); i++)
        q += `**${i}.** ${chars[i].participant__name}${chars[i].title.length > 0 ? ` - \`${chars[i].title.replace('/*/g','')}\` ` : ''} \n`;
    q += `\n*Página: ${(page+1)+"/"+totalPages}*`;
}


module.exports = {
	data: new SlashCommandBuilder()
		.setName('search')
		.setDescription('Busca un personaje por su nombre')
        .addStringOption(option => option.setName('query').setDescription('El personaje que vas a buscar').setRequired(true)),
	async execute(interaction, client) {
		const query = interaction.options.getString('query');
        let isGuest = await client.characterAI.isGuest();
		if(isGuest)
            return interaction.reply("Guest accounts cannot use the search feature");

        interaction.deferReply();
        let { characters } = await client.characterAI.searchCharacters(query);
        client.searchedCharacters = characters;
        totalPages = Math.ceil(characters.length/10);
        updateChars(characters);
        const embed = new EmbedBuilder()
            .setTitle("🗒️ Personajes encontrados")
            .setColor("#FFFFFF")
            .addFields({ name: "Resultados: ", value: `${q}`})
            .setTimestamp();

        interaction.editReply( { embeds: [embed] } ).then(msg => {
            const handler = (reaction, user) => {    
                if(reaction.message.id == msg.id && !user.bot){
                    if(reaction.emoji.name == "✅"){                        
                        client.removeListener('messageReactionAdd', handler)
                        return msg.delete();
                    }    
                    if(reaction.emoji.name == "➡️"){
                        if(page == totalPages-1) page = 0;
                        else page++;
                        updateChars(characters);
                    }
                    if(reaction.emoji.name == "⬅️"){
                        if(page == 0) page = totalPages-1;
                        else page--;
                        updateChars(characters);
                    }
                    const embed = new EmbedBuilder()
                    .setTitle("🗒️ Personajes encontrados")
                    .setColor("#FFFFFF")
                    .addFields({ name: "Resultados: ", value: `${q}`})
                    .setTimestamp();

                    msg.edit({ embeds: [embed] });
                }
            }
            msg.react('⬅️');
            msg.react('➡️');
            msg.react('✅');
            client.on('messageReactionAdd', handler); 
        });
	},
};