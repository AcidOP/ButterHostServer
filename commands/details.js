const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('details')
        .setDescription('Shows details about the server'),
    async execute(interaction) {

        const guild = interaction.member.guild

        const ownerID = guild.ownerId;
        const owner = await guild.members.fetch(ownerID);
        const memberCount = guild.memberCount;
        const channelCount = guild.channels.cache.size;
        const roleCount = guild.roles.cache.size;
        const time = await guild.createdAt.toLocaleString();
        const boostCount = guild.premiumSubscriptionCount || 0;
        const serverLevel = `${guild.premiumTier}`.replace(/TIER_/g, 'Level ');


        const embed = new MessageEmbed()
            .setTitle(guild.name)
            .setThumbnail(guild.iconURL())
            .addField('Owner', `${owner}`, false)
            .addField('Members', `${memberCount}`, false)
            .addField('Channels', `${channelCount}`, false)
            .addField('Roles', `${roleCount}`, false)
            .addField('Boosts', `${boostCount}`, false)
            .addField('Server Level', `${serverLevel}`, false)
            .addField('Created', `${time}`, false)
            .setFooter({ text: `Requested by ${interaction.user.username}` })


        await interaction.reply({ embeds: [embed] })

    }
}