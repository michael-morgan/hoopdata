'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    spot: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.BIGINT, allowNull: false },
    makes: DataTypes.INTEGER,
    attempts: DataTypes.INTEGER
  }, {});

  Spot.associate = function(models) {
    Spot.belongsTo(models.User);
  };

  return Spot;
};
