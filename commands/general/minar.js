const {
 Command
} = require('../../commands')

const db = require('../../database/database');
const { Message } = require('discord.js');

module.exports = class MinarCommand extends Command {
 constructor() {
  super({
   name: 'minar',
   aliases: [],
   category: 'general',
   priority: 9,
   permLvl: 0
  })
 }
 async execute(msg, args) {
  // minar -> farmetar
  
  // minar perfil
  // minar inventario
  // minar vender <piedras, oro o dimante>

  let ID_USER = msg.author.id;

  let existsUser = await db.mines.existsUser(ID_USER)

  if(args[0] === 'inv') {
   if (!existsUser) return msg.channel.send('Debes crearte un perfil, usando el comando `minar perfil`.')

   let resultInv = await db.mines.getInvetory(ID_USER)
    msg.channel.send({
     embed: {
      description: `👤 __**${msg.author.tag}**__\n🌑 Piedra: ${resultInv.stones}\n⭐ Oro: ${resultInv.golds}\n💎 Diamante: ${resultInv.diamonds}`,
      color: 'fff'
     }
    })

  } else
  if(args[0] === 'perfil') {
   if(existsUser) {
    let resultUser = await db.mines.getUser(ID_USER);
    let resultStats = await db.mines.getStats(ID_USER);

    msg.channel.send({
     embed: {
      description: `👤 __**${msg.author.tag}**__\n💰 Coins: ${resultUser.coins}\n🌑 Piedra: ${resultStats.stones}\n⭐ Oro: ${resultStats.golds}\n💎 Diamante: ${resultStats.diamonds}`,
      color: 'fff'
     }
    })


   } else {
    await db.mines.addUser(ID_USER);
    msg.channel.send(msg.author.username +' registrado correctamente, use: `minar perfil`.')
   }
  }
  else
  if(args[0] === 'vender') {
   if (!existsUser) return msg.channel.send('Debes crearte un perfil, usando el comando `minar perfil`.')

   // minar vender piedra
   if(!args[1]) return msg.channel.send('Debes agregar un mineral para vender, `minar vender <mineral>`')
   let mineral = args[1];
   let resultInv = await db.mines.getInvetory(ID_USER)

   if(mineral === 'piedra') {
    // aumentar sus monedas segun el monto a vender 
    let mineStones = resultInv.stones
    if (mineStones < 1) return msg.channel.send('No tienes piedras en tu inventario para vender.')
    let amountStones = mineStones * 5
    await db.mines.updateCoins(ID_USER, amountStones)
    
    // quitar de su inventario
    await db.mines.updateSell(ID_USER, 'stones')
    msg.channel.send(`Has vendido ${mineStones} piedra(s), por **${amountStones} monedas**.`)
   }
   if(mineral === 'oro') {
    
    // aumentar sus monedas segun el monto a vender 
    let minegolds = resultInv.golds
    if(minegolds < 1) return msg.channel.send('No tienes oro en tu inventario para vender.')
    let amountGolds = minegolds * 15
    await db.mines.updateCoins(ID_USER, amountGolds)
    
    // quitar de su inventario
    await db.mines.updateSell(ID_USER, 'golds')
    msg.channel.send(`Has vendido ${minegolds} oro(s), por **${amountGolds} monedas**.`)
   }
   if(mineral === 'diamante') {
    // aumentar sus monedas segun el monto a vender 
    let mineDiamonds = resultInv.diamonds
    if (mineDiamonds < 1) return msg.channel.send('No tienes diamantes en tu inventario para vender.')
    let amountDiamonds = mineDiamonds * 20
    await db.mines.updateCoins(ID_USER, amountDiamonds)
    
    // quitar de su inventario
    await db.mines.updateSell(ID_USER, 'diamonds')
    msg.channel.send(`Has vendido ${mineDiamonds} diamante(s), por **${amountDiamonds} monedas**.`)
   }
  }else 
  if(args[0] === 'top'){
   if(args[1] === 'stats') {

    //lista top estadisticas
     let tipo = 'diamonds';
    
     let resultList = await db.mines.alltopStats(tipo)
     let i = 0;
     let list = resultList.map(data => {

      if (msg.guild.members.cache.get(data.iduser)) {
       i++;
       return `${i}] <@${data.iduser}> | **💎 ${data.diamonds} diamantes**`
      }

     })

     msg.channel.send({
      embed: {
       description: list.join('\n'),
       color: 'fff'
      }
     })

   } else {
    // lista top coins
    let resultList = await db.mines.alltop()
    let i = 0;
    let list = resultList.map(data => {
     
     if (msg.guild.members.cache.get(data.iduser)) {
       i++;
       return `${i}] <@${data.iduser}> | **💰 ${data.coins} monedas**`
     }
    
    })
    
    msg.channel.send({embed: {
     description: list.join('\n'),
     color: 'fff'
    }})


   }
  } else {
  
   if (!existsUser) return msg.channel.send('Debes crearte un perfil, usando el comando `minar perfil`.')
   // Para minar requieres 10 de monedas
   // Cooldown de 15 segundos para volver a minar
   // Probabilidades: de minar Piedra 60%, Oro 30%, Diamante 10% de encontrar.
   
   // Al vender: Piedra: 5 monedas x1, Oro 15 monedas x1, 20 Diamantes x1

   let dataUser = await db.mines.getUser(ID_USER)
   if(dataUser.coins < 10) return msg.channel.send('No tienes monedas suficientes para seguir minando.')

   //verificar cooldown
   let resultCooldown = await db.mines.getCooldown(ID_USER)

   if (resultCooldown) {
    let time = parseInt(resultCooldown.time)
     if (time < Date.now()) {
      await db.mines.deleteCooldown(ID_USER)


     } else {
      return msg.channel.send('Tienes que esperar 15 segundos para minar nuevamente.')
     }
   } else {
    let timeCooldown = Date.now() + 15000; // 15 segundos

    await db.mines.addCooldown(ID_USER, timeCooldown)
   }
  

   let random = randomInt(1, 8)
   await db.mines.updateCoins(ID_USER, -10)
    // Diamante
    if(random == 1) {
     await db.mines.updateInvStats(ID_USER, 'diamonds')
     msg.channel.send('Has encontrado Diamante.')
    } else
    if (random == 2 || random == 3) {
     await db.mines.updateInvStats(ID_USER, 'golds')
     msg.channel.send('Has encontrado Oro.')
    } else {
     await db.mines.updateInvStats(ID_USER, 'stones')
     msg.channel.send('Has encontrado una simple piedra.')

    }
   
  }

 }
}

function randomInt(min, max) {
 return Math.floor(Math.random() * (max - min)) + min;
}