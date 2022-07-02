const Levels = require('discord-xp')
const { SlashCommandBuilder, codeBlock } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('Get the top member of the server'),
    async execute(interaction) {

        const limit = 1;
        const guildID = interaction.guild.id

        const guildName = interaction.guild.name
        const leaderboard = await Levels.fetchLeaderboard(guildID, limit)


        if (!leaderboard) {
            return await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }


        const userid = leaderboard[0].userID;
        const guild = interaction.guild;
        const user = await guild.members.fetch(userid)


        const userLevel = leaderboard[0].level + '';
        const userXP = leaderboard[0].xp + '';

        const userAvatar = user.user.avatarURL();

        const embed = new MessageEmbed()
            .setTitle('Leaderboard')
            .addField(`The most active user in ${guildName}`, `${user}`, true)
            .addField('Level 🎃', userLevel, false)
            .addField('XP ✨', userXP, false)
            .setColor('#0099ff')
            .setThumbnail(userAvatar)

        await interaction.reply({ embeds: [embed] });

    }
}