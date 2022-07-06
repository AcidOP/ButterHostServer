const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('details')
        .setDescription('Shows details about the server'),
    async execute(interaction) {

        const guild = interaction.member.guild

        const ownerID = guild.ownerId;
        const owner = await guild.members.fetch(ownerID)
        const time = await guild.createdAt.toLocaleString()
        const boost = guild.premiumSubscriptionCount
        const serverLevel = `${guild.premiumTier}`.replace(/TIER_/g, 'Level ')


        const embed = new MessageEmbed()
            .setTitle(guild.name)
            .setThumbnail(guild.iconURL())
            .addField('Owner', `${owner}`, false)
            .addField('Members', `${guild.memberCount}`, false)
            .addField('Channels', `${guild.channels.cache.size}`, false)
            .addField('Roles', `${guild.roles.cache.size}`, false)
            .addField('Boosts', `${boost}`, false)
            .addField('Server Level', `${serverLevel}`, false)
            .addField('Created', `${time}`, false)
            .setFooter({ text: `Requested by ${interaction.user.username}` })


        await interaction.reply({ embeds: [embed] })

    }
}