const fs = require('fs');

module.exports = {
  name: 'mylevel',
  description: 'Show XP in specific levels',
  aliases: ['meunivel', 'myxp', 'minhaxp'],
  usage: `[command]`,
  cooldown: 5,
  async execute(message) {
    //find level of player
    const player = message.author.id;
    const playerId = await Player.findOne({ discordUserId: player });
    if (!playerId) {
      return message.channel.send(
        `There isn't a character assigned to this player`
      );
    }

    const playerXP = playerId.xp;

    try {
      //getting the data from the json file
      let data = fs.readFileSync('./util/xp-5e.json');
      let xp = JSON.parse(data);

      for (let i = 0; i < xp.length; i++) {
        if (playerXP < xp[i].xp && playerXP > xp[i - 1].xp) {
          const xpNextLevel = xp[i].xp - playerXP;
          message.channel.send(
            `You are at level ${xp[i].level}, with a total of ${playerXP} XP, you need ${xpNextLevel} xp to the next level`
          );
        }
      }
    } catch (err) {
      console.error(err.message);
      return message.reply(`Couldn't find xp, error ${err.message}`);
    }
  },
};
