const Sequelize = require('sequelize');
const sequelize = require('./db');

// Definimos el modelo para Usuario
const Biblioteca = sequelize.define('bibliotecas', {
    Id: {type: Sequelize.INTEGER, autoIncrement:true, primaryKey:true, allowNull: false},
    Id_us: {type: Sequelize.INTEGER, allowNull: false}
});

module.exports = Biblioteca;