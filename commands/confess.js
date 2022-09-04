const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

const { ConfessionChannelID } = require('../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('confess')
        .setDescription('Make an anonymous confession')
        .addStringOption(option => {
            return option.setName('confession')
                .setDescription('Enter your confession')
                .setRequired(true)
        }),
    async execute(interaction) {

        const confession = interaction.options.getString('confession') + '';
        const confessionLenght = confession.split(' ').length

        if (confessionLenght < 5) {
            return await interaction.reply({
                content: `Your confession is too short. It must be at least 5 words.`,
                ephemeral: true,
            });
        }

        const confessionEmbed = new MessageEmbed()
            .setTitle('A new confession has been made!')
            .addField('\u200B', confession, false)
            .addField('Report to the moderators if you think this message should be removed', '\u200B', false)
            .setColor('#000000')

        // Find confession channel within current guild
        const confessionChannel = interaction.guild.channels.cache.find(ch => ch.id === ConfessionChannelID);
        await confessionChannel.send({ embeds: [confessionEmbed] });
        await interaction.reply({ content: 'Confession sent!', ephemeral: true })

    }
}