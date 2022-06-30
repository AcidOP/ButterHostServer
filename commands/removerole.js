const { SlashCommandBuilder } = require('@discordjs/builders')
const { ModeratorID } = require('../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removerole')
        .setDescription('Removes the mentioned role.')
        .addRoleOption(option => {
            return option.setName('role')
                .setDescription('The role to be removed.')
                .setRequired(true)
        })
        .addUserOption(option => {
            return option.setName('user')
                .setDescription('The user who needs the role removed.')
                .setRequired(true)
        }),
    async execute(interaction) {

        const user = interaction.options.getMember('user') || interaction.member
        const role = interaction.options.getRole('role')


        // Check if the user is a moderator
        if ((!interaction.member.roles.cache.has(ModeratorID))) {
            return interaction.reply({
                content: `You don't have permissions to remove role from another user. 😛`,
                ephemeral: true,
            });
        }

        // Check if the mentioned user already has the to-be-assigned role
        if(!user.roles.cache.has(role.id)) {
            return interaction.reply({
                content: `That user does not have the provided role. Aborting!`,
                ephemeral: true,
            });
        }


        await user.roles.remove(role)

        await interaction.reply({ content: `Role has been removed from that user.`, ephemeral: true, });

    }
}