const Player = require('../model/Player');

module.exports = {
  name: 'xpupdate',
  description: 'Updates the amount of XP a character has',
  aliases: ['xpatualizar', 'atualizarxp', 'updatelevel', 'mudarxp'],
  usage: `[command xpAmount]`,
  cooldown: 5,
  async execute(message, args) {
    //find level of player
    const player = message.author.id;
    const playerId = await Player.findOne({ discordUserId: player });
    if (!playerId) {
      return message.channel.send(
        `There isn't a character assigned to this player`
      );
    }

    const xpToUpdate = args[0];

    try {
      await Player.findOneAndUpdate(
        { discordUserId: player },
        { $set: { xp: xpToUpdate } }
      );

      const newXP = await Player.findOne({ discordUserId: player });
      return message.reply(`XP Update! Your new xp is ${newXP.xp}`);
    } catch (err) {
      console.error(err.message);
      return message.reply(`Couldn't update xp, error ${err.message}`);
    }
  },
};
