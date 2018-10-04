
'use strict'
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: DataTypes.TEXT,
    hashedPassword: DataTypes.TEXT,
    allClass: DataTypes.BOOLEAN,
    authorityClasses: DataTypes.ARRAY(DataTypes.INTEGER),
    openControl: DataTypes.BOOLEAN,
    openMobile: DataTypes.BOOLEAN,
    openBB: DataTypes.BOOLEAN
  }, {
    timestamps: false
  })
  return users
}
