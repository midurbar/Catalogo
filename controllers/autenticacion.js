const {Usuario} = require('../models');
const md5 = require('md5');

/**
 * / Funcion para logearse en la pagina
// Buscamos el usuario en la base de datos que coincida con el
// nombre y password.
// Con el if hacemos que si el usuario existe nos redireciones
//para poder acceder a la app. En caso contrario volvemos a la
//pagina del login y  mostramos un
// mensaje de usuario o password incorrectos
* @param {login} req 
 * @param {*} res 
 */
function login(req, res) {
    const {nombre, password} = req.body;
    Usuario.findOne({where: {nombre, password: md5(password)}})
    .then(usuario => {
      if (usuario) {
        req.session.usuario = usuario;
        res.redirect("/catalogo/dashboard");
      } else {
        res.render("login", {mensaje: "Usuario o contraseña incorrectos."});
      }
    })
}
/**
 * 
 * 
 * funcion para cerrar sesion y que nos redirige al index 
 * @param {*} res 
 * @param {logout} req
 */
function logout(req, res) {
    req.session = null;
    res.redirect("/login");
}
/**
 * 
 * funcion de control de Acceso.
 * Comprueba que el usuario introducidos sea correcto
 * mediante la id. En caso de que no lo sea nos 
 * redirige al login
 * @param {controlAcceso} req
 */
function controlAcceso() {
  return function (req, res, next) {
      const usuario = req.session.usuario;
      if (usuario) {
          Usuario.findByPk(usuario.id, {
          })
          .then(usuario => {
              if (usuario) {
                  next();
              } else {
                  res.redirect("/login");
              }
          })    
      } else {
          res.redirect("/login");
      }
  }
}

module.exports = {
    login,
    logout,
    controlAcceso
}