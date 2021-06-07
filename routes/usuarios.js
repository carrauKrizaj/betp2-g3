const express = require('express');
const router = express.Router();
const dataUsuarios = require('../data/crud_usuarios');


//buscador por nombre de usuario = funcionalidad de la API; un usuario puede seguir a otros usuarios
router.get('/:nombre', async function(req, res) {
  const usuarios = await dataUsuarios.getUsuarios(req.params.nombre);
  res.json(usuarios);
});

/*
router.get('/:id', async (req, res)=>{
    const usuario = await dataUsuarios.getUsuario(req.params.id);
    res.json(usuario);
});
*/

//LOGIN
router.post('/login', async (req, res)=>{
    try {
      const usuario = await dataUsuarios.buscarUsuario(req.body.email, req.body.contraseña);
      console.log(usuario);
      const token = await dataUsuarios.generateJWT(usuario);
      res.send({usuario, token});

    } catch (error) {
      res.status(401).send(error.message);
    }
  });

// SIGNIN ?? revisar: este método es para registrarse a la página.
router.post('/signin', async (req, res)=>{
    try {
        
        let emailEncontrado = await dataUsuarios.buscarEmail(req.body.email); //busca si existe el mail

        if(!emailEncontrado){  //si esta vacio, no encontro nada
            usuario = await dataUsuarios.addUsuario(usuario);
            res.json(usuario.ops[0]);
        }

    } catch (error){ //tira error de email existente
        res.send(error.message);
    }

});

//Consultar lo de la ID y getUsuario
router.put('/:id', async (req, res)=>{ 
    //validacion pendiente 
    let id = req.params.id;
    let usuario = req.body;
    usuario._id = id;
    usuario = await dataUsuarios.updateUsuario(usuario);
    res.json(await dataUsuarios.getUsuario(id));
});

/*   ¿Se deberia pode reliminar usuarios?
router.delete('/:id', async(req, res) =>{
    let id = req.params.id;
    let usuario = await dataUsuarios.getUsuario(id);
    await dataUsuarios.deleteUsuario(id);
    res.json(usuario);
});
*/

module.exports = router;