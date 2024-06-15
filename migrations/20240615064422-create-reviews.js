'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      stayed: {
        type: Sequelize.DATE
      },
      left: {
        type: Sequelize.DATE
      },
      review: {
        type: Sequelize.STRING
      },
      burger: {
        type: Sequelize.BOOLEAN
      },
      pizza: {
        type: Sequelize.BOOLEAN
      },
      kelp: {
        type: Sequelize.BOOLEAN
      },
      hotdog: {
        type: Sequelize.BOOLEAN
      },
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reviews');
  }
};