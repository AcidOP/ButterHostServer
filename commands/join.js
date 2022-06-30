const { SlashCommandBuilder } = require('@discordjs/builders')
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Joins the voice channel of the user'),
    async execute(interaction) {


        const { channel } = interaction.member.voice

        if (!channel) {
            return interaction.reply({ content: 'You are not in a voice channel', ephemeral: true })
        }

        const channelID = channel.id;
        const guildID = interaction.guild.id;

        joinVoiceChannel({
            guildId: guildID,
            channelId: channelID,
            adapterCreator: interaction.guild.voiceAdapterCreator
        });

        await interaction.reply({ content: 'Hey there! Joined the channel!', ephemeral: true })
    }
}