const queries = require('./queries');

module.exports = {
 
 // iduser TEXT, name TEXT, await level INTEGER, xp INTEGER, hydration INTEGER, money INTEGER

 exist: async function (iduser) {
  let query = "SELECT * FROM players WHERE iduser = ?"
  let result = await queries.getQuery(query, iduser)

  if(result != undefined) {
   return true
   
  } else { 
   return false

  }

 },
 add: async function (iduser, name) {
  let query = "INSERT INTO players(iduser, name, level, xp, hydration, money) VALUES (?, ?, ?, ?, ?, ?)"
  await queries.runQuery(query, [iduser, name, 0, 0, 100, 0])

 },

 get: async function (iduser) {
  let query = "SELECT * FROM players WHERE iduser = ?"
  let result = await queries.getQuery(query, iduser)
  //let buscar = "SELECT * FROM players WHERE iduser = ? OR name = ?"
  return result

 }


}