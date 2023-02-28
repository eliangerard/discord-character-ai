module.exports = {
	name: 'messageCreate',
	async execute(message, client) {
        if(message.content.startsWith(client.config.noDetectionPrefix)) return;
        if(client.botChannels[message.guildId] != null && !message.author.bot){
            console.log("Mensaje recibido: "+message.content);
            //Searching if the channel is already registered and updating the character
            let channel = client.botChannels[message.guildId].find((element) => element.channelId == message.channelId);
            if(!channel || message.content.length == 0)
                return;
            console.log("\tRespondiendo...");
            
            chat = await client.characterAI.createOrContinueChat(channel.charId);
			const { text } = await chat.sendAndAwaitResponse(message.content, true)
            
            message.reply(text);
        }
	},
};