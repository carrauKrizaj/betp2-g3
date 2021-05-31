const express = require('express');
const router = express.Router();
const dataUsuarios = require('../data/crud_usuarios');

router.get('/', async function(req, res) {
  const usuarios = await dataUsuarios.getUsuarios();
  res.json(usuarios);
});

router.get('/:id', async (req, res)=>{
    const usuario = await dataUsuarios.getUsuario(req.params.id);
    res.json(usuario);
});

router.post('/', async (req, res)=>{
    //validacion pendiente
    let usuario = req.body;
    
    usuario = await dataUsuarios.addUsuario(usuario);
    res.json(usuario.ops[0]);
});

router.put('/:id', async (req, res)=>{
    //validacion pendiente
    let id = req.params.id;
    let usuario = req.body;
    usuario._id = id;
    usuario = await dataUsuarios.updateUsuario(usuario);
    res.json(await dataUsuarios.getUsuario(id));
});

router.delete('/:id', async(req, res) =>{
    let id = req.params.id;
    let usuario = await dataUsuarios.getUsuario(id);
    await dataUsuarios.deleteUsuario(id);
    res.json(usuario);
});

module.exports = router;