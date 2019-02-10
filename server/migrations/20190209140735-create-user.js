'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        set(val) {
          this.setDataValue('email', val.trim().toLowerCase());
        }
      },
      password: { type: Sequelize.STRING, allowNull: false },
      firstName: { type: Sequelize.STRING, allowNull: false },
      lastName: Sequelize.STRING,
      position: Sequelize.STRING,
      height: Sequelize.STRING,
      weight: Sequelize.INTEGER,
      vertical: Sequelize.INTEGER,
      hundredMeterSprint: Sequelize.FLOAT,
      fiveKMRun: Sequelize.FLOAT,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
