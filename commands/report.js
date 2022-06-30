const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('Reports a user')
        .addUserOption(option => option.setName('user')
            .setRequired(true)
            .setDescription('The user to report'))
        .addStringOption(option => option.setName('reason')
            .setRequired(true)
            .setDescription('The reason for the report')),
    async execute(interaction) {

        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');

        if (!user) {
            return interaction.reply({ content: 'You must specify a user to report!', ephemeral: true });
        }

        if (!reason) {
            return interaction.reply({ content: 'You must specify a reason for the report!', ephemeral: true });
        }

        const reportEmbed = new MessageEmbed()
            .setTitle(`Report Received`)
            .setDescription(`${user} has been reported`)
            .addField('Reason', reason, false)
            .addField('Reported By', interaction.user.username, false)
            .setColor('#0099ff')
            .setTimestamp();
            
    
        const moderatorChannel = interaction.guild.channels.cache.find(channel => channel.id === '991595644978475049');

        await moderatorChannel.send({ embeds: [reportEmbed] });

        await interaction.reply({ content: 'Your report has been sent to the moderators!', ephemeral: true });

    }
}