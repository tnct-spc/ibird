'use strict'
module.exports = (sequelize, DataTypes) => {
  const documents = sequelize.define('schools', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    background_image: DataTypes.STRING,
    background_images: DataTypes.ARRAY(DataTypes.STRING),
    timetable: DataTypes.JSON
  }, {
    timestamps: false
  })
  return documents
}
