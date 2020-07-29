const commands = require("../commands")
const db = require("../database/database")
const config = require('../config')

module.exports = async client => {
 commands.registerCategories(config.categories)
 commands.registerCommands();
 await db.check.createTables();
 
 console.log(`Estoy listo!`)
}