const Levels = require('discord-xp')

module.exports = {
    name: 'messageCreate',
    async execute(message) {

        //  Validations
        if(message.author.bot) return;
        if(!message.guild) return;

        const userid= message.author.id
        const guildid = message.guildId


        const user = await Levels.fetch(userid, guildid)

        // Create a new user if one does not exist
        if(!user) {
            return await Levels.createUser(userid, guildid)
        }

        // Add XP to the user in the guild
        const randomXP = Math.floor(Math.random() * 29) +1; // (1 - 30 XP)
        const hasLevelledUp = await Levels.appendXp(userid, guildid, randomXP)

        // Tell user if their level increases
        if(hasLevelledUp) {
            const user = await Levels.fetch(userid, guildid)
            
            const levelChannel = message.guild.channels.cache.find(channel => channel.id === '991444082381557801')
            levelChannel.send(`${message.member} has levelled up and reached level ${user.level} 🎊`)
        }
    }
}