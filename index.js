require('dotenv').config()
const express = require('express')
var cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const multer  = require('multer');


/**
 * Importar las funciones de la carpeta controllers para llamarlas desde las rutas.
 */
const {login, logout, controlAcceso} = require('./controllers/autenticacion')
const {dashboard} = require('./controllers/dashboard')
//const { mostrarAnimes, crearAnime, listarAnimes, leerAnime, modificarAnime, eliminarAnime} = require('./controllers/animes')
//const { mostrarMangas, crearManga, listarMangas, leerManga, modificarManga, eliminarManga} = require('./controllers/mangas')
//const { mostrarNovelas, crearNovela, listarNovelas, leerNovela, modificarNovela, eliminarNovela} = require('./controllers/novelas')
//const { crearUsuario, listarUsuarios, leerUsuario, modificarUsuario, eliminarUsuario } = require('./controllers/usuarios')

