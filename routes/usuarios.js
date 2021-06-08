const express = require('express');
const router = express.Router();
const dataUsuarios = require('../data/crud_usuarios');


//buscador por nombre de usuario = funcionalidad de la API; un usuario puede seguir a otros usuarios
router.get('/:username', async function(req, res) {
  const usuario = await dataUsuarios.getUsuario(req.params.username);
  res.json(usuario);
});

// router.get('/', async function(req, res) {
//   const usuarios = await dataUsuarios.getUsuarios();
//   res.json(usuarios);
// });

/*
router.get('/:id', async (req, res)=>{
    const usuario = await dataUsuarios.getUsuario(req.params.id);
    res.json(usuario);
});
*/

//LOGIN
router.post('/login', async (req, res)=>{
    try {
      const usuario = await dataUsuarios.buscarUsuario(req.body.email, req.body.password);
      console.log(usuario);
      const token = await dataUsuarios.generateJWT(usuario);
      res.send({usuario, token});

    } catch (error) {
      res.status(401).send(error.message);
    }
  });

// SIGNUP
router.post('/signup', async (req, res)=>{
    try {
        let usuario = req.body;
        let emailEncontrado = await dataUsuarios.buscarEmail(req.body.email); //busca si existe el mail
        let userNameEncontrado = await dataUsuarios.buscarUserName(req.body.username);

        if(!emailEncontrado && !userNameEncontrado){  //si esta vacio, no encontro nada
            usuario = await dataUsuarios.addUsuario(usuario);
            res.json(usuario);
        }

    } catch (error){ //tira error de email/username existente
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

/*   Solo el mismo usuario o un moderador podria eliminar al usuario
router.delete('/:id', async(req, res) =>{
    let id = req.params.id;
    let usuario = await dataUsuarios.getUsuario(id);
    await dataUsuarios.deleteUsuario(id);
    res.json(usuario);
});
*/

module.exports = router;