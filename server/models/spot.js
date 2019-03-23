'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    spot: { type: DataTypes.STRING, allowNull: false },
    makes: DataTypes.INTEGER,
    attempts: DataTypes.INTEGER
  }, {});

  Spot.associate = function(models) {
    Spot.belongsTo(models.User, {
      foreignKey: {
        name: 'id',
        allowNull: false
      }
    });
  };

  return Spot;
};
