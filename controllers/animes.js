const { Anime, Biblioteca } = require("../models");
const fs = require("fs");
const jwt = require("jsonwebtoken");

/**
 * 
 * 
 *  Función para crear el animes que queramos. Se crea con create y luego hacemos 
 * un res.render de
animes para verlo.
Res.render de error por si hubiese algún problema.
@param {crearAnime} req 
 */
function crearAnime(req, res) {
    const anime = req.body;
    Anime.create(anime)
    .then(() => {
       res.redirect("/catalogo/animes")
    })
    .catch(err => {
       res.render("error", {err})
    })
 }

 /**
 * 
 * 
 * // funcion para listar los animes
//los localizamos todos con findAll()
//Ponemos un cath por si surje algun error
@param {listarAnimes} req 
 */
function listarAnimes(req, res) {
    const usuario = req.session.usuario;
    Anime.findAll()
    .then(animes => {
       res.render("animes", {animes, usuario})
    })
    .catch(err => {
       res.render("error", {err})
    })
 }

/**
 * 
 * 
 * Funcion que recoge los datos del formulario.
 * TODO: coger los datos de req.body y procesarlos
      Anime.create(req.body)
req.file.filename = req.body.Nombre+".jpg";
Con aspirante.findorcreate encuentra o crea el aspirante si no existe. 
Luego con el if nos aseguramos de que si no existe el created se asignen los valores y se
guarde todo con aspirante.save()
@param {cargarDatos} req 
 */

function cargarDatos(req, res) {
    

    const nombreNuevo = req.body.Nombre+".jpg";
    const datos = {
        ...req.body,
        jpg: nombreNuevo
    };

    Anime.findOrCreate({where: {Nombre: req.body.Nombre}, defaults: datos})
    .then(([anime, created])=>{
        if (!created) Object.assign(anime, datos)
        return Anime.save()
    })
    // 
    .catch(err=>{
        console.log(err);
        res.render("error", {err})
   })
}