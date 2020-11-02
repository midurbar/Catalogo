require('dotenv').config()
const express = require('express')
var cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const multer  = require('multer');


/**
 * Importar las funciones de la carpeta controllers para llamarlas desde las rutas.
 */
const {login, logout, controlAcceso, controlAccesoAdmin} = require('./controllers/autenticacion')
const {dashboard} = require('./controllers/dashboard')
const { crearAnime, listarAnimes, leerAnime, modificarAnime, eliminarAnime, cargarDatos} = require('./controllers/animes')
//const { mostrarMangas, crearManga, listarMangas, leerManga, modificarManga, eliminarManga} = require('./controllers/mangas')
//const { mostrarNovelas, crearNovela, listarNovelas, leerNovela, modificarNovela, eliminarNovela} = require('./controllers/novelas')
//const { crearUsuario, listarUsuarios, leerUsuario, modificarUsuario, eliminarUsuario } = require('./controllers/usuarios')

const app = express()

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './media') //el fichero de destino 
    },
/*    filename: function (req, file, cb) {
      cb(null, file.originalname) //El nombre del archivo despues de guardar
    }*/
  })
  
  
  var upload = multer({ storage: storage })

const cpUpload = upload.single("jpg")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use(cookieParser())
app.use(cookieSession({
    name: 'cookiesession',
    keys: [process.env.KEY1, process.env.KEY2],
    maxAge: process.env.DURACION_COOKIE * 60 * 1000
}))


// Declaración del motor de Vistas
app.set('views', './views')
app.set('view engine', 'ejs')

// Rutas de Login
app.get('/login', (req, res) => res.render('login'))
app.post('/login', login)

app.get('/logout', logout)


// Rutas para que el usuario cargue las imagenes 
app.post('/subirImagen', cpUpload, cargarDatos)

//Direccion de las rutas de cada modelo

// Rutas de Animes
app.post('/catalogo/animes', controlAcceso(), cpUpload, crearAnime)
app.get('/catalogo/animes', controlAcceso(), listarAnimes)
app.get('/catalogo/animes/:id', controlAcceso(), leerAnime)
app.post('/catalogo/animes/:id', controlAcceso(), modificarAnime)
app.post('/catalogo/animes/:id/eliminar', controlAcceso(), eliminarAnime)
app.get('/catalogo/animes/crear', controlAcceso(), (req, res) => {
  const usuario = req.session.usuario;
  res.render('crearAnime', {usuario})
})
app.post('/catalogo/animes/crear', controlAcceso(), crearAnime)

// Ruta por defecto
app.get('/catalogo', controlAcceso(), (req, res) => res.redirect("/login"))


//carpeta de media
app.use("media", express.static('media'));

app.listen(3000)