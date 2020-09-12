const Player = require('../model/Player');

module.exports = {
  name: 'createchar',
  description: 'Creates a character of the RPG group',
  args: true,
  aliases: ['criarpersonagem', 'criarpj'],
  usage: '[command characterName(for now, accepts only one name) characterXP]',
  cooldown: 5,
  async execute(message, args) {
    try {
      //usage command playerName playerXP
      if (args.length != 2) {
        return message.reply(
          `not a valid command, the right usage of this command is ${usage}`
        );
      }
      const name = args[0];
      const xp = args[1];

      let player = await Player.findOne({ name: name });
      if (player) {
        return message.reply(
          `There is already a player with this name, please try another one`
        );
      }

      player = new Player({
        name: name,
        xp: xp,
      });

      await player.save();

      message.reply(
        `Player created with name: ${player.name} and set to XP: ${player.xp} `
      );
    } catch (err) {
      console.error(err.message);
      return message.reply(`Couldn't create new player, error ${err.message}`);
    }
  },
};
