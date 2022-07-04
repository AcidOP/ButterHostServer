const { SlashCommandBuilder } = require('@discordjs/builders')
const {ModeratorID, juniorModeratorID} = require('../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a user from the server')
        .addUserOption(option => {
            return option.setName('user')
                .setDescription('The user to be kicked.')
                .setRequired(true)
        })
        .addStringOption(option => {
            return option.setName('reason')
                .setDescription('Reason for kick')
        }),
    async execute(interaction) {

        const user = interaction.options.getMember('user')
        const reason = interaction.options.getString('reason')

        // Check if the command is issued by a moderator

        const isModerator = interaction.member.roles.cache.has(ModeratorID) || interaction.member.roles.cache.has(juniorModeratorID)


        if (!isModerator) {
            return interaction.reply({
                content: `You don't have permissions to kick an user. 😛`,
                ephemeral: true,
            });
        }

        // Check if we can kick the user

        const highestPosition = interaction.member.roles.highest.position;
        const targetPosition = user.roles.highest.position;

        if (targetPosition >= highestPosition) {
            return await interaction.reply({
                content: `You cannot kick ${user}. They have higher role than you.`,
                ephemeral: true
            });
        }


        await user.send(`You have been kicked from ${interaction.guild.name}.\n Reason: ${reason}`)

        await user.kick()
        await interaction.reply(`${user} has been kicked.`);


    }
}