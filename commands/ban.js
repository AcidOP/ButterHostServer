const { SlashCommandBuilder } = require('@discordjs/builders')
const { checkModerator } = require('../helpers/checkModerator')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans an user from the server')
        .setAliases(['b'])
        .addUserOption(option => {
            return option.setName('user')
                .setDescription('The user to be banned.')
                .setRequired(true)
        })
        .addStringOption(option => {
            return option.setName('reason')
                .setDescription('Reason for ban')
                .setRequired(true)
        }),
    async execute(interaction) {

        const user = interaction.options.getMember('user')
        const reason = interaction.options.getString('reason')

        // Check if the command is issued by a moderator

        const isModerator = checkModerator(interaction.member.id)

        if (!isModerator) {
            return interaction.reply({
                content: `You don't have permissions to ban an user. 😛`,
                ephemeral: true,
            });
        }

        // Check if we can ban the user
        if (user.roles.highest.position >= interaction.member.roles.highest.position) {
            return await interaction.reply({
                content: `You cannot ban ${user}. They have higher role than you.`,
                ephemeral: true
            });
        }

        await user.send(`You have been banned from ${interaction.guild.name}.\n Reason: ${reason}`)

        await user.ban()
        await interaction.reply(`${user} has been banned.`);
    },
};