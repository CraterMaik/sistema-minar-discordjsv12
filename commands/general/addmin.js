const {
 Command
} = require('../../commands')

const db = require('../../database/database');
const {
 Message
} = require('discord.js');

module.exports = class addMinCommand extends Command {
 constructor() {
  super({
   name: 'addmin',
   aliases: [],
   category: 'general',
   priority: 9,
   permLvl: 3
  })
 }
 async execute(msg, args) {

  await db.mines.updateCoins(msg.author.id, 100)
  msg.channel.send('listo')

 }
}

