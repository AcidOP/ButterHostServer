const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Shows the avatar of a user')
        .addUserOption(option => {
            return option.setName('user')
                .setDescription('User to show the avatar of')
                .setRequired(true)
        }),
    async execute(interaction) {

        const user = interaction.options.getUser('user')
        const avatar = user.avatarURL({ format: 'png', dynamic: true, size: 1024 })

        const embed = new MessageEmbed()
            .setTitle(`${user.username}'s avatar`)
            .setImage(avatar)
            .setFooter({ text: `Requested by ${interaction.user.username}` })
        await interaction.reply({ embeds: [embed] })
    }
}