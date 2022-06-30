const { SlashCommandBuilder } = require('@discordjs/builders')
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Leaves the voice channel of the user'),
    async execute(interaction) {

        const { channel } = interaction.member.voice
        if (!channel) {
            return interaction.reply({ content: 'You are not in a voice channel', ephemeral: true })
        }

        const guildID = interaction.guild.id;
        const connection = getVoiceConnection(guildID);

        connection.destroy();

        await interaction.reply({ content: 'See you again!', ephemeral: true })

    }
}