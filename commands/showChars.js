const Player = require('../model/Player');

module.exports = {
  name: 'showchars',
  description: 'Show all information about the created chars',
  aliases: [
    'mostrarpersonagens',
    'todospersonages',
    'mostrarpjs',
    'checkchars',
    'infochars',
  ],
  usage: '[command]',
  cooldown: 6,
  async execute(message) {
    try {
      //finding all players
      const characters = await Player.find({});
      if (!characters) {
        return message.reply(
          'There are no characters yet. Please, feel free to create one!'
        );
      }
      console.log(characters);
      let charString = '';
      let hasId;

      //mapping through and displaying
      characters.map((char) => {
        if (char.discordUserId) {
          hasId = `Yes - Player Id: ${char.discordUserId}`;
        } else if (!char.discordUserId) {
          hasId = `No`;
        }

        charString += `Name of Character: ${char.name} -- XP Total: ${char.xp} -- Assigned to Player? ${hasId}\n`;
      });

      return message.channel.send(charString);
    } catch (err) {
      console.error(err.message);
      return message.reply(`Couldn't find players, error ${err.message}`);
    }
  },
};
