module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`${client.user.tag} is ready!`);

		client.user.setActivity('with life', { type: 'PLAYING' });

	},
};