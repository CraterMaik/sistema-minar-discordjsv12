const config = require('../config')
const commands = require('../commands')

const Discord = require('discord.js')

let prefix = config.prefix;

module.exports = async (client, message) => {
 if(message.author.bot) return;

 let cmd = message.content.slice(prefix.length)
 
 if(cmd != undefined) {
  cmd = cmd.split(' ')
 }

 let result = await commands.checkValidCmd(message, cmd, prefix);

 if(result) {
  commands.executeCmd(message, cmd, Discord, client)
 }

}