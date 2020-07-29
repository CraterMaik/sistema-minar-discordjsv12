
const sqlite3 = require('sqlite3').verbose()
const config = require('../config.js');
const sql = new sqlite3.Database(config.dirBase)


async function tableVerific () {
 // TABLA: Personajes
 await sql.run('CREATE TABLE IF NOT EXISTS players (iduser TEXT, name TEXT, level INTEGER, xp INTEGER, hydration INTEGER, money INTEGER, status INTEGER DEFAULT 0)')

 // TABLA: sistema minar
 await sql.run('CREATE TABLE IF NOT EXISTS profiles (iduser TEXT, coins INTEGER DEFAULT 50, status INTEGER DEFAULT 0)')

 await sql.run('CREATE TABLE IF NOT EXISTS inventory (iduser TEXT, stones INTEGER DEFAULT 0, golds INTEGER DEFAULT 0, diamonds INTEGER DEFAULT 0, status INTEGER DEFAULT 0)')
 
 await sql.run('CREATE TABLE IF NOT EXISTS stats (iduser TEXT, stones INTEGER DEFAULT 0, golds INTEGER DEFAULT 0, diamonds INTEGER DEFAULT 0, status INTEGER DEFAULT 0)')

 await sql.run('CREATE TABLE IF NOT EXISTS cooldows (iduser TEXT, time TEXT, status INTEGER DEFAULT 0)')

}

module.exports = {
 createTables: async function() {
  try {
   await tableVerific();
  } catch (error) {
   console.error(error)
  }
 }
}