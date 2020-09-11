const { prefix } = require('../util/config.json');

module.exports = {
  name: 'help',
  description: 'List all commands or info about a specific one',
  aliases: ['commands', 'ajuda', 'comandos', 'regras'],
  usage: '[command name]',
  cooldown: 5,
  execute(message, args) {
    const data = [];
    const { commands } = message.client;

    //if there is no specific command help the user wants
    if (!args.length) {
      //maps through all the commands to create a message
      data.push(`List of my commands:`);
      data.push(commands.map((command) => command.name).join(', '));
      data.push(
        `\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`
      );

      //sends message to the user in a DM
      //send() takes 2 parameters = content to send and message option
      //in this case, if this is a big help message, split true will split it into more messages
      return message.author
        .send(data, { split: true })
        .then(() => {
          if (message.channel.type === 'dm') return;
          message.reply("I've sent you a DM with all my commands!");
        })
        .catch((error) => {
          console.error(
            `Could not send help DM to ${message.author.tag}.\n`,
            error
          );
          message.reply(
            "it seems like I can't DM you! Do you have DMs disabled?"
          );
        });
    }

    //help for a specific command
    //getting the name of the command
    const name = args[0].toLowerCase();
    const command =
      commands.get(name) ||
      commands.find((c) => c.aliases && c.aliases.includes(name));

    if (!command) {
      return message.reply('not a valid command');
    }

    data.push(`*Name*: ${command.name}`);

    if (command.aliases) data.push(`*Aliases:* ${command.aliases.join(', ')}`);
    if (command.description) data.push(`*Description:* ${command.description}`);
    if (command.usage) data.push(`*Usage:* ${command.usage}`);

    message.channel.send(data, { split: true });
  },
};
