const Sequelize = require('sequelize')
const classesModel = require('./classes')

const sequelize = new Sequelize('ibird', 'postgres', 'password',{
  host: 'postgres',
  dialect: 'postgres',
  operatorsAliases: false,
  logging: false
})

const classes = classesModel(sequelize, Sequelize)
// BlogTag will be our way of tracking relationship between Blog and Tag models
// each Blog can have multiple tags and each Tag can have multiple blogs
// const BlogTag = sequelize.define('blog_tag', {})
// const Blog = BlogModel(sequelize, Sequelize)
// const Tag = TagModel(sequelize, Sequelize)
module.exports = {
  classes
}
