'use strict'
module.exports = (sequelize, DataTypes) => {
  const temporaryDatas = sequelize.define('temporary_datas', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    uniqueId: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    data: DataTypes.JSON,
    isActive: DataTypes.BOOLEAN
  }, {
    timestamps: false
  })
  return temporaryDatas
}
