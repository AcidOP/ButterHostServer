module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`${client.user.tag} is ready!`);

		client.user.setActivity('This bot has been made by whynotacid#1236');

	},
};