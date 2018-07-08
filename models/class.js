'use strict';
module.exports = (sequelize, DataTypes) => {
  var class = sequelize.define('class', {
    classname: DataTypes.STRING,
    document: DataTypes.ARRAY(DataTypes.JSON)
  }, {});
  class.associate = function(models) {
    // associations can be defined here
  };
  return class;
};