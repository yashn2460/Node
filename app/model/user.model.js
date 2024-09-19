// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connection'); // Import the sequelize instance

const User = sequelize.define('User', {
  // Define the model's attributes
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role:{
    type:DataTypes.ENUM('admin', 'customer'),
    allowNull: false,
  }
});

module.exports = User;
