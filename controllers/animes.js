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
 
