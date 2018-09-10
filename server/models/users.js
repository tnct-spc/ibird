
'use strict'
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: DataTypes.TEXT,
    hashedPassword: DataTypes.TEXT
  }, {
    timestamps: false
  })
  return users
}
