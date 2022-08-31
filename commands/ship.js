const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ship')
        .setDescription('Ship someone')
        .addUserOption(option => {
            return option.setName('user')
                .setDescription('The person you want to ship')
                .setRequired(true)
        }),
    async execute(interaction) {

        const sender = interaction.user;
        const person = interaction.options.getUser('user');

        const personAvatar = person.avatarURL({ format: 'png', dynamic: true, size: 1024 });
        const senderUsername = sender.username;
        const personUsername = person.username;
        const ship = Math.floor(Math.random() * 100);
        const color = ship > 50 ? '#2eff00' : '#ff0000';


        const embed = new MessageEmbed()
            .setTitle(`${senderUsername} ❤️ ${personUsername}`)
            .setDescription(`${senderUsername} and ${personUsername} have a ship of ${ship}%`)
            .setThumbnail(personAvatar)
            .setFooter({ text: `Requested by ${senderUsername}` })
            .setColor(color);

        await interaction.reply({ embeds: [embed] });
    }
}