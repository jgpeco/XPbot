const fs = require('fs');

module.exports = {
  name: 'xpall',
  description: 'Show XP in all the levels',
  aliases: ['xptodos'],
  usage: `[command]`,
  cooldown: 10,
  execute(message) {
    try {
      //getting the data from the json file
      let data = fs.readFileSync('./util/xp-5e.json');
      let xp = JSON.parse(data);
      let displayXP = '';

      //mapping through the data and creating a formatted string with its content
      xp.map((item) => {
        displayXP += `Level: ${item.level} - XP: ${item.xp}\n`;
      });

      message.channel.send(displayXP);
    } catch (err) {
      console.error(err.message);
      return message.reply(`Couldn't find xp, error ${err.message}`);
    }
  },
};
