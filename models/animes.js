const Sequelize = require('sequelize');
const sequelize = require('./db');

// Definimos el modelo de Anime

// Con autoincrement:true nos aseguramos de que su valor se incremente
//con allownull:true podemos escoger si podemos permitir tener el campo vacio
const Anime = sequelize.define('animes', {
    Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    Nombre: {type: Sequelize.STRING(100), allowNull: false},
    Ep: {type: Sequelize.INTEGER, allowNull: false},
    Tipo: {type: Sequelize.STRING(50), allowNull: false},
    Descrp: {type: Sequelize.STRING(500), allowNull: false},
    Img: {type: Sequelize.STRING(10), allowNull: false},
    Id_Bib: {type: Sequelize.INTEGER, allowNull: false}
});


module.exports = Anime;