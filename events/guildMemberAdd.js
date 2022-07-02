const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {

        const guildName = member.guild.name;
        const welcomeChannelID = '991442733485011074';
        const welcomeChannel = member.guild.channels.cache.get(welcomeChannelID);
        
        const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Member Joined')
        .setDescription(`${member.user.tag} has joined the ${guildName} 🎉`)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()
        
        await welcomeChannel.send({embed});

    }
}