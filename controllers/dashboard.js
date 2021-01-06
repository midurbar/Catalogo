const { Usuarios, Bibliotecas} = require("../models");

/**
 *Esta funcion es un controlador de Express que se encarga de vargar el dashboard
 *
 * @param {*} req Contiene los datos de la peticion, entre los cuales esta el 
 * ID del usuario
 * @param {*} res Respuesta a la peticion
 */

function dashboard(req, res){
    const usuarios= req.session.usuarios;

    Usuarios.findByPk(usuarios.id, {
        include: {model: Bibliotecas, as: 'bibliotecas'}
    })

    .then(usuarios => {

        res.render('dashboard', {usuarios, bibliotecas})

    })

}


module.exports = {
    dashboard
}