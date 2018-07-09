'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cllass = sequelize.define('Cllass', {
    name: DataTypes.TEXT,
    docs: DataTypes.ARRAY(DataTypes.TEXT)
  }, {});
  Cllass.associate = function(models) {
    // associations can be defined here
  };
  return Cllass;
};