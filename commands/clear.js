const { SlashCommandBuilder } = require('@discordjs/builders')
const { checkModerator } = require('../helpers/checkModerator')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clears last messages from a channel')
        .setAliases(['c'])
        .addIntegerOption(option => {
            return option.setName('amount')
                .setDescription('Amount of messages to be deleted')
                .setRequired(true)
        }),
    async execute(interaction) {

        const isModerator = checkModerator(interaction.member.id)

        if (!isModerator) {
            return await interaction.reply({ content: `You don't have permissions to clear messages. 😛`, ephemeral: true });
        }

        const amount = interaction.options.getInteger('amount')
        const channel = interaction.channel
        const messages = await channel.messages.fetch({ limit: amount })
        await channel.bulkDelete(messages)
        await interaction.reply({ content: `${amount} messages have been deleted.`, ephemeral: true });
    }
}