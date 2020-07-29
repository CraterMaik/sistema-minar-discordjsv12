const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config');
const fs = require('fs')

for (let file of fs.readdirSync("./events/")) {
 if(file.endsWith(".js")) {
  // file = message.js
  let fileName = file.substring(0, file.length - 3)
  // file = message
  let fileContents = require(`./events/${file}`);

 client.on(fileName, fileContents.bind(null, client));

  delete require.cache[require.resolve(`./events/${file}`)];

 }
}

client.login(config.token)


