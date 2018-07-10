'use strict';
module.exports = (sequelize, DataTypes) => {
  var classtable = sequelize.define('classtable', {
    name: DataTypes.TEXT,
    documents: DataTypes.ARRAY(DataTypes.TEXT)
  }, {});
  classtable.associate = function(models) {
    // associations can be defined here
  };
  return classtable;
};
