'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      set(val) {
        this.setDataValue('email', val.trim().toLowerCase());
      }
    },
    password: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: DataTypes.STRING,
    position: DataTypes.STRING,
    height: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    vertical: DataTypes.INTEGER,
    hundredMeterSprint: DataTypes.FLOAT,
    fiveKMRun: DataTypes.FLOAT
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Spot);
  };

  return User;
};
