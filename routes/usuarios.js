const express = require('express');
const router = express.Router();
const dataUsuarios = require('../data/crud_usuarios');

/*
router.get('/', async function(req, res) {
  const usuarios = await dataUsuarios.getUsuarios();
  res.json(usuarios);
});

router.get('/:id', async (req, res)=>{
    const usuario = await dataUsuarios.getUsuario(req.params.id);
    res.json(usuario);
});
*/

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

router.post('/', async (req, res)=>{
    try {
        
        let emailEncontrado = await dataUsuarios.buscarEmail(req.body.email); //busca si existe el email

        if(!emailEncontrado){  //si esta vacio, no encontro nada
            usuario = await dataUsuarios.addUsuario(usuario);
            res.json(usuario.ops[0]);
        }

    } catch (error){ //tira error de email existente
        res.send(error.message);
    }

});

router.put('/:id', async (req, res)=>{
    //validacion pendiente  Consultar tema ID 
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