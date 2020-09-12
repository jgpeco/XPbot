const fs = require('fs');
const Player = require('../model/Player');

module.exports = {
  name: 'xptolevel',
  description: 'Show XP in specific levels',
  args: true,
  aliases: ['xpparanivel', 'xpnonivel'],
  usage: `[command level]`,
  cooldown: 5,
  execute(message, args) {
    try {
      const level = args[0];

      //getting the data from the json file
      let data = fs.readFileSync('./util/xp-5e.json');
      let xp = JSON.parse(data);

      //mapping through the data and creating a formatted string with its content
      xp.map((item) => {
        if (level === item.level) {
          message.channel.send(`To level ${level}, you need ${item.xp} XP`);
        }
      });
    } catch (err) {
      console.error(err.message);
      return message.reply(`Couldn't find xp, error ${err.message}`);
    }
  },
};
