const Sequelize = require('sequelize');
const sequelize = require('./db');

// Definimos el modelo para Usuario
const Usuario = sequelize.define('usuarios', {
    id: {type: Sequelize.INTEGER, autoIncrement:true, primaryKey:true, allowNull: false},
    password: {type: Sequelize.STRING(55), allowNull: false},
    nombre: {type: Sequelize.STRING(40), allowNull: false},
    Id_Bib: {type: Sequelize.INTEGER, allowNull: false}
});

module.exports = Usuario;