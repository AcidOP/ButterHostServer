const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whois')
        .setDescription('Shows details about the user')
        .addUserOption(option => {
            return option.setName('user')
                .setDescription('User to show the details of')
                .setRequired(true)
        }),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const avatar = user.avatarURL({ format: 'png', dynamic: true, size: 1024 });

        const serverName = interaction.guild;
        const guildMember = interaction.guild.members.cache.get(user.id);

        const joinedAt = await guildMember.joinedAt.toLocaleString();
        const createdAt = await user.createdAt.toLocaleString();
        const roles = await guildMember.roles.cache.map(role => role.name)
            .filter(role => role !== '@everyone')
            .join(', ');
            
        const roleString = roles.length > 0 ? roles : 'No roles!';


        const isBot = await user.bot ? 'Yes' : 'No';


        const embed = new MessageEmbed()
            .setTitle(`${user.username}'s details`)
            .setThumbnail(avatar)
            .addField('Joined Discord on:', createdAt)
            .addField(`Joined ${serverName} at:`, joinedAt)
            .addField('Roles:', roleString)
            .addField('Bot Account:', isBot)
            .setFooter({ text: `Requested by ${interaction.user.username}` })

        await interaction.reply({ embeds: [embed] });
    }
}