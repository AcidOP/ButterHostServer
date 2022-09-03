const fs = require('fs')
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Guide you through the commands'),
    async execute(interaction) {

        const exceptions = ['help.js', 'addrole.js', 'removerole.js']

        // Get all the javascript files in the commands folder
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
        // Remove all the admin commands from the list
        const validCommands = commandFiles.filter(file => !exceptions.includes(file))

        const commands = validCommands.map(file => require(`./${file}`))
        // Read the name of each command
        const commandNames = commands.map(command => command.data.name)

        // Read the description of each command
        const commandDescriptions = commands.map(command => command.data.description)

        // Create array with the name and description of each command
        const commandNamesAndDescriptions = commandNames.map((name, index) => `/${name} - ${commandDescriptions[index]}`)

        // Make name and description pairs into a string
        const commandString = commandNamesAndDescriptions.join('\n')

        const guildLogo = interaction.guild.iconURL()

        const embed = new MessageEmbed()
            .setTitle('Commands')
            .setDescription(commandString)
            .setColor('#000000')
            .setThumbnail(guildLogo)
            .setFooter({ text: `Requested by ${interaction.user.username}` })

        await interaction.reply({ embeds: [embed] })
    }
}
