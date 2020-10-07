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

