module.exports = {
	name: 'messageCreate',
	async execute(message, client) {
        if(client.botChannels[message.guildId] != null && !message.author.bot){
            console.log("Mensaje recibido: "+message.content+"\n\tRespondiendo...");
            //Searching if the channel is already registered and updating the character
            let channel = client.botChannels[message.guildId].find((element) => element.channelId = message.channelId);
            chat = await client.characterAI.createOrContinueChat(channel.charId);

			const response = await chat.sendAndAwaitResponse(message.content, true)
            message.reply(response);
        }
	},
};