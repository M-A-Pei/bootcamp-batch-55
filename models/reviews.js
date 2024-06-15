'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Reviews.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    stayed: DataTypes.DATE,
    left: DataTypes.DATE,
    review: DataTypes.STRING,
    burger: DataTypes.BOOLEAN,
    pizza: DataTypes.BOOLEAN,
    kelp: DataTypes.BOOLEAN,
    hotdog: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Reviews',
  });
  return Reviews;
};