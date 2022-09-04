const { SlashCommandBuilder } = require('@discordjs/builders')
const { ModeratorID } = require('../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addrole')
        .setDescription('Adds mentioned role.')
        .addRoleOption(option => {
            return option.setName('role')
                .setDescription('The role to be added.')
                .setRequired(true)
        })
        .addUserOption(option => {
            return option.setName('user')
                .setDescription('The user who needs the role.')
                .setRequired(true)
        }),
    async execute(interaction) {

        const user = interaction.options.getMember('user') || interaction.member
        const role = interaction.options.getRole('role')

        // Do not allow users to add roles to bots
        if (user.user.bot) {
            return interaction.reply({ content: 'You cannot add roles to bots you idiot. 🙄', ephemeral: true })
        }

        // Check if the user is a moderator
        if ((!interaction.member.roles.cache.has(ModeratorID))) {
            return interaction.reply({
                content: `You don't have permissions to add role to another user. 😏`,
                ephemeral: true,
            });
        }

        // Check if the user has a higher role than the bot
        if (interaction.member.roles.highest.position < user.roles.highest.position) {
            return interaction.reply({
                content: `You cannot add roles to users more powerful than you. 😂`,
                ephemeral: true,
            });
        }

        // Check if the mentioned user already has the to-be-assigned role
        if(user.roles.cache.has(role.id)) {
            return interaction.reply({
                content: `That user already has the provided role. Aborting!`,
                ephemeral: true,
            });
        }

        // Add the role and send success message
        await user.roles.add(role)
        await interaction.reply({ content: `Role has been added to that user. 😘`, ephemeral: true, });

    }
}