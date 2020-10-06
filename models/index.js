const sequelize = require("./db");
const Usuario = require("./usuarios");
const Anime = require("./animes");
const Manga = require("./mangas");
const Novela = require("./novelas");
const Biblioteca = require("./bibliotecas");

/**
 * Relaciones de la base de datos
 */
Biblioteca.belongsTo(Usuario);
Usuario.belongsTo(Biblioteca);
Biblioteca.hasMany(Anime);
Anime.belongsTo(Biblioteca);
Biblioteca.hasMany(Manga);
Manga.belongsTo(Biblioteca);
Biblioteca.hasMany(Novela);
Novela.belongsTo(Biblioteca);

sequelize
    .authenticate()
    .then(() => {
        console.log("Conexión establecida");
        // sequelize.sync({alter: true});
    })
    .catch(err => {
        console.error("Error al conectar: ", err);
    });

module.exports = {
    sequelize, 
    Usuario, 
    Biblioteca,
    Anime, 
    Manga, 
    Novela
}