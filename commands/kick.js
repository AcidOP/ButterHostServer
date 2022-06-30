const { SlashCommandBuilder } = require('@discordjs/builders')
const { ModeratorID } = require('../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks an user from the server')
        .addUserOption(option => {
            return option.setName('user')
                .setDescription('The user to be kicked.')
                .setRequired(true)
        })
        .addStringOption(option => {
            return option.setName('reason')
                .setDescription('Reason for kick')
                .setRequired(false)
        }),
    async execute(interaction) {

        const user = interaction.options.getMember('user')
        const reason = interaction.options.getString('reason') || 'None provided'


        // Check if user has permissions to kick another user

        if (!interaction.member.roles.cache.has(ModeratorID)) {
            return interaction.reply({
                content: `You don't have permissions to kick an user. 😛`,
                ephemeral: true,
            });
        }

        // Check if we can kick the user
        if (user.roles.highest.position >= interaction.member.roles.highest.position) {
            return await interaction.reply({
                content: `You cannot kick ${user}. They have higher role than you.`,
                ephemeral: true,
            });
        }

        await user.send(`You have been kicked from ${interaction.guild.name}.\n Reason: ${reason}`)

        user.kick()
        await interaction.reply(`${user} has been kicked.`);
    },
};