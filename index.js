require('dotenv').config()
const fs = require('fs')
const path = require('path')
const Levels = require("discord-xp");
const { Client, Collection, Intents } = require('discord.js');

const TOKEN = process.env.TOKEN;
const MONGO_URI = process.env.MONGO_URI;

// Discord Client Interface
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
    partials: [
        'MESSAGE',
        'CHANNEL',
        'REACTION',
    ]
});

console.clear()

// Connecting to MongoDB
Levels.setURL(MONGO_URI);

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

// Setting up Commands
console.group('Command Listeners: ')
for (const file of commandFiles) {
    console.log(`${file} was loaded.`)
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}
console.groupEnd('Command Listeners: ')

// Setting up event Listeners
console.group('Event Listenters: ')
for (const file of eventFiles) {
    console.log(`${file} was loaded.`)
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}
console.groupEnd('Event Listenters: ')

// Setting up Command Handler
client.on('interactionCreate', async interaction => {

    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction, client);
    } catch (error) {
        if (error) {
            console.error(error)
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
})

// Login to Discord with your client's token
client.login(TOKEN);
