const Levels = require('discord-xp')
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder, blockQuote } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('xpfor')
        .setDescription('Show required xp for a level.')
        .addIntegerOption(option => {
            return option.setName('level')
                .setDescription('The level to lookup required xp.')
                .setRequired(true)
        }),
    async execute(interaction) {


        const level = interaction.options.getInteger('level')
        const targetXP = Levels.xpFor(level)

        const user = await Levels.fetch(interaction.user.id, interaction.guildId)

        if (!user) {
            return await interaction.reply(`You need **${targetXP}** xp points to reach level **${level}**`)
        }

        const userXP = user.xp
        const requiredXP = (targetXP >= userXP) ? targetXP - userXP : undefined;

        let messageEmbed;

        // If user gives a level higher than the level they got
        if (requiredXP) {
            messageEmbed = new MessageEmbed()
                .setTitle('Level details')
                .addFields(
                    { name: `XP required to reach level ${level}`, value: blockQuote(`${targetXP} 🎯`), inline: false },
                    { name: 'XP you currently have got', value: blockQuote(`${userXP} 💪`), inline: false },
                    { name: `More XP you need to reach level ${level}`, value: blockQuote(`${requiredXP} ⛰`), inline: false }
                )

        // If user gives a lower level than they have, we only show the xp for that level
        } else {
            messageEmbed = new MessageEmbed()
                .setTitle('Level details')
                .addFields(
                    { name: `XP required to reach level ${level}`, value: blockQuote(`${targetXP} 🎯`), inline: false }
                )
        }


        await interaction.reply({ embeds: [messageEmbed] });

    }
}