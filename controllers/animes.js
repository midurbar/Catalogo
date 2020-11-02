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
 * Funcion que permite leer un anime.
La localizamos mendiante la clave primaria con findByPk,
y en caso de que no exista con el else mostramos un error.
Tambien le pasamos un catch por si acaso.
@param {leerAnime} req 
 */

function  leerAnime(req,res){
    const usuario = req.session.usuario;
    Anime.findByPk(req.params.id)
    .then(animeA=>{
        //aquí si el aspirante existe nos da ok.. pero si no existe nos dará el no encontrado
       if (anime) res.render("anime", {animeA, usuario})
       else res.render("error")
    })
    .catch(err=>{
        res.render("error", {err})
    })
}

/**
 * Función para modificar un anime. Lo localizamos mediante la clave primaria
con findbypk. Importante tener el anime.save() para que se guarden los cambios que modifiquemos.
Como siempre el res.render y el catch por si hay algún tipo de error.
 * @param {modificarAnime} req 
 * @param {*} res 
 */
function modificarAnime(req, res) {
   Anime.findByPk(req.params.id)
   .then(anime => {
       if (anime) {
           Object.assign(anime, req.body)
           anime.save()
           .then(() => {
               res.redirect("/catalogo/animes")
           })
       }
       else res.render("error")
   })
   .catch(err => {
       res.render("error", {err})
   })
}

/**
 * Función que borra un anime.
Lo localizamos con la primary key y luego le pasamos un destroy para que lo elimine.
Luego hacemos un res.render de anime para ver que efectivamente ese anime ya está eliminado.
Como siempre también aplicamos un res.render de error y un catch por si hay algún problema.
 * @param {eliminarUsuario} req 
 
 */
function eliminarAnime(req, res) {
   Anime.findByPk(req.params.id)
   .then(anime => {
       if (anime) {
           anime.destroy()
           .then(() => {
               res.redirect("/catalogo/animes")
           })
       } else {
           res.render("error")
       }
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

module.exports = {
   crearAnime, 
   listarAnimes, 
   leerAnime, 
   modificarAnime, 
   eliminarAnime,
   cargarDatos
}