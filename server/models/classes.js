'use strict'
module.exports = (sequelize, DataTypes) => {
  var classes = sequelize.define('classes', {
    classid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    year: DataTypes.TEXT,
    course: DataTypes.TEXT,
    randomSort: DataTypes.BOOLEAN,
    index: DataTypes.INTEGER
  }, {
    timestamps: false
  })
  return classes
}
