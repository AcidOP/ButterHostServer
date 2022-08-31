const fs = require('fs')
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Guide you through the commands'),
    async execute(interaction) {

        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')).filter(file => file !== 'help.js')
        const commands = commandFiles.map(file => require(`./${file}`))
        const commandNames = commands.map(command => command.data.name)
        const commandDescriptions = commands.map(command => command.data.description)
        const commandNamesAndDescriptions = commandNames.map((name, index) => `${name} - ${commandDescriptions[index]}`)
        const commandNamesAndDescriptionsString = commandNamesAndDescriptions.join('\n')
        

        const embed = new MessageEmbed()
            .setTitle('Commands')
            .setDescription(commandNamesAndDescriptionsString)
            .setColor('#00ff00')
            .setFooter({ text: `Requested by ${interaction.user.username}` })

        await interaction.reply({ embeds: [embed] })
    }
}
