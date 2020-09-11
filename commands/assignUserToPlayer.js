const Player = require('../model/Player');

module.exports = {
  name: 'assign',
  description: 'Assign a Discord User to a Player of the game',
  args: true,
  aliases: ['nomear', 'atribuir', 'name'],
  usage: `[command characterName]`,
  cooldown: 5,
  async execute(message, args) {
    const charName = args[0];
    const player = message.author.id;

    try {
      let char = await Player.findOne({ name: charName });
      if (char.discordUserId) {
        message.reply(
          `This char is assigned to another user, you have to ask for it to be removed from that user`
        );
      }

      char = await Player.findOneAndUpdate(
        { name: charName },
        { $set: { discordUserId: player } }
      );
    } catch (err) {
      console.error(err.message);
      return message.reply(`Couldn't create new player, error ${err.message}`);
    }
  },
};
