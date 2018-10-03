'use strict'
const Sequelize = require('sequelize')
const classesModel = require('./classes')
const documentsModel = require('./documents')
const usersModel = require('./users')
const temporaryDatasModel = require('./temporaryDatas')

const sequelize = new Sequelize('ibird', 'postgres', 'password', {
  host: 'postgres',
  dialect: 'postgres',
  operatorsAliases: false,
  logging: false
})

const classes = classesModel(sequelize, Sequelize)
const documents = documentsModel(sequelize, Sequelize)
const users = usersModel(sequelize, Sequelize)
const temporaryDatas = temporaryDatasModel(sequelize, Sequelize)
module.exports = {
  classes,
  documents,
  users,
  temporaryDatas
}
