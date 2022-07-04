const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ship')
        .setDescription('Ship someone')
        .addUserOption(option => {
            return option.setName('person')
                .setDescription('The person you want to ship')
                .setRequired(true)
        }),
    async execute(interaction) {

        const person = interaction.options.getMember('person')
        const sender = interaction.user.username


        const ship = Math.floor(Math.random() * 100) + 1;

        const embed = new MessageEmbed()
            .setTitle('💖')
            .setDescription(`${sender} ❤️ ${person}`)
            .addField(`${ship}%`, 'compatible', true)
            .setTimestamp()


        await interaction.reply({ embeds: [embed] })

    }
}