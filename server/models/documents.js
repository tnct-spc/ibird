'use strict'
module.exports = (sequelize, DataTypes) => {
  const documents = sequelize.define('documents', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    docid: DataTypes.STRING,
    classid: DataTypes.INTEGER,
    x: DataTypes.INTEGER,
    y: DataTypes.INTEGER,
    priority: DataTypes.INTEGER,
    endTime: DataTypes.DATE,
    startTime: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    title: DataTypes.TEXT,
    openMobile: DataTypes.BOOLEAN,
    sizeX: DataTypes.INTEGER,
    sizeY: DataTypes.INTEGER,
    overlapPriority: DataTypes.INTEGER,
    filename: DataTypes.STRING
  }, {
    timestamps: false
  })
  return documents
}
