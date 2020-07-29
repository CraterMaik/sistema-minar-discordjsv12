const queries = require('./queries');

module.exports = {
 existsUser: async function(iduser) {
  let query = "SELECT * FROM profiles WHERE iduser = ?"
  let result = await queries.getQuery(query, iduser)

  if (result != undefined) {
   return true

  } else {
   return false

  }
 },
 addUser: async function (iduser) {
 
  let queryProfiles = "INSERT INTO profiles (iduser) VALUES(?)"

  let queryInventory = "INSERT INTO inventory(iduser) VALUES(?)"

  let queryStats = "INSERT INTO stats(iduser) VALUES(?)"

  await queries.runQuery(queryProfiles, iduser)
  await queries.runQuery(queryInventory, iduser)
  await queries.runQuery(queryStats, iduser)

 },
 getUser: async function (iduser) {
  let query = "SELECT * FROM profiles WHERE iduser = ?"
  let result = await queries.getQuery(query, iduser)

  return result;

 },
 getStats: async function (iduser) {
  let query = "SELECT * FROM stats WHERE iduser = ?"
  let result = await queries.getQuery(query, iduser)

  return result;
 },
 getInvetory: async function (iduser) {
  let query = "SELECT * FROM inventory WHERE iduser = ?"
  let result = await queries.getQuery(query, iduser)

  return result;
 },
 updateCoins: async function (iduser, amount) {
  let query = "UPDATE profiles SET coins = coins + ? WHERE iduser = ?"
  await queries.runQuery(query, [amount, iduser])
 },
 updateInvStats: async function (iduser, type) {
  let query = `UPDATE inventory SET ${type} = ${type} + 1 WHERE iduser = ?`
  let queryS = `UPDATE stats SET ${type} = ${type} + 1 WHERE iduser = ?`

  await queries.runQuery(query, iduser)
  await queries.runQuery(queryS, iduser)
 },
 updateSell: async function (iduser, type) {
  let query = `UPDATE inventory SET ${type} = 0 WHERE iduser = ?`

  await queries.runQuery(query, iduser)
 
 },

 addCooldown: async function(iduser, time) {
  let query = "INSERT INTO cooldows(iduser, time) VALUES(?, ?)"

  await queries.runQuery(query, [iduser, time])
 },
 getCooldown: async function(iduser) {
  let query = "SELECT * FROM cooldows WHERE iduser = ?"
  let result = await queries.getQuery(query, iduser)
  return result;
 },
 updateCooldown: async function(iduser, time) {
  let query = `UPDATE cooldows SET time = ${time} WHERE iduser = ?`
  await queries.runQuery(query, iduser)
 },
 deleteCooldown: async function(iduser) {
  let query = "DELETE FROM cooldows WHERE iduser = ?"
  await queries.runQuery(query, iduser)
 },
 alltop: async function () {
  let query = `SELECT * FROM profiles ORDER BY coins DESC LIMIT 10`
  let result = queries.allQuery(query)
  return result;
  
 },
 alltopStats: async function (type) {
  let query = `SELECT * FROM stats ORDER BY ${type} DESC LIMIT 10`
  let result = queries.allQuery(query)
  return result;

 }
 
 

}