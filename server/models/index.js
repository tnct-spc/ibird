const Sequelize = require('sequelize')
const classesModel = require('./classes')
const documentsModel = require('./documents')
const usersModel = require('./documents')

const sequelize = new Sequelize('ibird', 'postgres', 'password',{
  host: 'postgres',
  dialect: 'postgres',
  operatorsAliases: false,
  logging: false
})

const classes = classesModel(sequelize, Sequelize)
const documents = documentsModel(sequelize, Sequelize)
const users = usersModel(sequelize, Sequelize)
module.exports = {
  classes,
  documents,
  users
}
