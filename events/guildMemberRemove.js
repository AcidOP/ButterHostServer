const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {

        const guildName = member.guild.name;
        const welcomeChannelID = '992636521624653915';
        const welcomeChannel = member.guild.channels.cache.get(welcomeChannelID);

        const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Member Left')
        .setDescription(`${member.user.tag} has left the ${guildName} 😢`)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()

        await welcomeChannel.send({embed});


    }
}