module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`¡Listo! Corriendo como: ${client.user.tag}`);
	},
};