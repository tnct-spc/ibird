'use strict'
module.exports = (sequelize, DataTypes) => {
  const documents = sequelize.define('schools', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    background_image: DataTypes.STRING
  }, {
    timestamps: false
  })
  return documents
}
