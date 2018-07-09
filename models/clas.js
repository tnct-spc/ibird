'use strict';
module.exports = (sequelize, DataTypes) => {
  var clas = sequelize.define('clas', {
    name: DataTypes.TEXT,
    doc: DataTypes.TEXT[]
  }, {});
  clas.associate = function(models) {
    // associations can be defined here
  };
  return clas;
};