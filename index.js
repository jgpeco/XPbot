require('dotenv').config();
const connectdb = require('./util/db');

const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const { prefix } = require('./util/config.json');

//reading the commands folder
const fs = require('fs');
const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

//setting cooldowns
const cooldowns = new Discord.Collection();

client.on('ready', () => {
  //to add = greetings when start to run on server
  console.log('bot running');
});

//connecting to database
connectdb();

client.on('message', (message) => {
  //check if the message doesn't have the right prefix or if the bot isn't trying to make a command to itself
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  //removing the prefix from the message
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  //passing the command name or a alias of it to a variable
  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;

  //if there is command and the user didn't understand the usage of the command
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  //checking for cooldowns
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  //creating a cooldown for the command
  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    //check to see if the cooldown isn't over and let the user know when it is over
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `Please wait ${timeLeft.toFixed(1)} more seconds before reusing the ${
          command.name
        } command.`
      );
    }
  }

  //deletes message if it was not deleted when the cooldown passed
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  //search for command and pass parameters to execution
  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('There was an error trying to execute the command');
  }
});

client.login(process.env.XPBOT_TOKEN);
