require('dotenv').config()
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId } = require('./config.json');
const fs = require('node:fs');

const TOKEN = process.env.TOKEN;

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

console.log(commands)

const rest = new REST({ version: '9' }).setToken(TOKEN);


(async () => {

	// Delete previous commands
	await rest.put(
		Routes.applicationGuildCommands(clientId, guildId),
		{ body: [] },
	);

	try {
		console.log('Started refreshing application (/) commands.');

		// Registering inside the test server guild
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
