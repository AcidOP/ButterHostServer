const Levels = require('discord-xp')
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder, codeBlock } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('levels')
        .setDescription('Get your stats in the server.')
        .addUserOption(option => {
            return option.setName('user')
                .setDescription('The user to get the stats of.')
                .setRequired(false)
        }),
    async execute(interaction) {

        const user = interaction.options.getUser('user') || interaction.user

        const userid = user.id
        const guildid = interaction.guild.id

        // Ignore with a nice message if made to check level for a bot
        if (user.bot) {
            const message = codeBlock("Bots cannot have levels you retard 💀")
            return await interaction.reply(message)
        }

        const userData = await Levels.fetch(userid, guildid)

        if (!userData) {
            const message = codeBlock("No record found for that user 👀")
            return await interaction.reply(message)
        }

        const userXP = userData.xp;
        const userLevel = userData.level;
        const userAvatar = interaction.guild.members.cache.get(userid).user.avatarURL({ format: 'png', dynamic: true, size: 1024 });

        const targetXP = Levels.xpFor(userLevel + 1);
        const requiredXP = targetXP - userXP;

        const levelEmbed = new MessageEmbed()
            .setTitle(`Stats of ${user.username}`)
            .addField("XP ✨", `${userXP}`, false)
            .addField("Level 🎃", `${userLevel}`, false)
            .addField("XP to next Level", `${requiredXP}`, false)
            .setThumbnail(userAvatar)

        await interaction.reply({ embeds: [levelEmbed] })
    }
}