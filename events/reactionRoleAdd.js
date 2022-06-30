const { reactionData } = require('../reactions.js');

module.exports = {
    name: 'messageReactionAdd',
    async execute(reaction, user, client) {

        // ------------------------------ Validations -----------------------------

        // Ignore the bot
        if (user.bot) return;

        // Incomplete (Or previously sent message)                   
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();

        // Dont check DMs and all
        if (!reaction.message.guild) return;


        // Only the get-role channel
        if (!(reaction.message.channel.id === '991445180836233236')) return;

        // ------------------------------------------------------------------------


        const guildID = reaction.message.guildId;   // Guild id
        const guild = client.guilds.cache.get(guildID)  // guild  
        const reactedUser = await guild.members.fetch(user.id)  // user (object) who reacted
        const emoji = reaction.emoji.name // emoji name


        // ------------------------------ Role Assignment -----------------------------

        reactionData.map(async (data) => {
            if (emoji === data.emoji) {
                const role = guild.roles.cache.get(data.roleID)

                return await reactedUser.roles.add(role)
            }
        }
        )

        // ---------------------------  Remove junk reactions ---------------------------
        let flag;

        reactionData.map(async (data) => {
            if (emoji === data.emoji) {
                flag = true;
            }
        })

        if (!flag) {
            await reaction.users.remove(user);
        }

    }
};