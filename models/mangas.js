const Sequelize = require('sequelize');
const sequelize = require('./db');

// Definimos el modelo de Manga

// Con autoincrement:true nos aseguramos de que su valor se incremente
//con allownull:true podemos escoger si podemos permitir tener el campo vacio
const Manga = sequelize.define('mangas', {
    Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    Nombre: {type: Sequelize.STRING(100), allowNull: false},
    Vol: {type: Sequelize.INTEGER, allowNull: false},
    Tipo: {type: Sequelize.STRING(50), allowNull: false},
    Descrp: {type: Sequelize.STRING(500), allowNull: false},
    Img: {type: Sequelize.STRING(10), allowNull: false}
});


module.exports = Manga;