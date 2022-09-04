const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

const { ReportChannelID } = require('../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('Report an user anonymously.')
        .addUserOption(option => option.setName('user')
            .setRequired(true)
            .setDescription('The user to report'))
        .addStringOption(option => option.setName('reason')
            .setRequired(true)
            .setDescription('The reason for the report')),
    async execute(interaction) {

        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');

        const reportEmbed = new MessageEmbed()
            .setTitle(`Report Received`)
            .setDescription(`${user} has been reported`)
            .addField('Reason', reason, false)
            .setColor('#0099ff')
            .setTimestamp();

        // Find Moderation channel within current guild
        const moderatorChannel = interaction.guild.channels.cache.find(channel => channel.id === ReportChannelID);
        await moderatorChannel.send({ embeds: [reportEmbed] });
        await interaction.reply({ content: 'Your report has been sent to the moderators!', ephemeral: true });
    }
}