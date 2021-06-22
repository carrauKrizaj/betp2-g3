const express = require('express');
const router = express.Router();
const dataUsuarios = require('../data/crud_usuarios');
const auth = require('../middleware/auth');

//buscador por nombre de usuario = funcionalidad de la API; un usuario puede seguir a otros usuarios
router.get('/:username', async function (req, res) {
  const usuario = await dataUsuarios.getUsuario(req.params.username);
  res.json(usuario);
});

// router.get('/', async function(req, res) {
//   const usuarios = await dataUsuarios.getUsuarios();
//   res.json(usuarios);
// });

/*
router.get('/:id', async (req, res)=>{
    const usuario = await dataUsuarios.getUsuarioId(req.params.id);
    res.json(usuario);
});
*/

//LOGIN
router.post('/login', async (req, res) => {
  try {
    const usuario = await dataUsuarios.buscarUsuario(req.body.email, req.body.password);
    console.log(usuario);
    const token = await dataUsuarios.generateJWT(usuario);
    res.send({ usuario, token });

  } catch (error) {
    res.status(401).send(error.message);
  }
});

// SIGNUP
router.post('/signup', async (req, res) => {
  try {
    let usuario = req.body;
    let emailEncontrado = await dataUsuarios.buscarEmail(req.body.email); //busca si existe el mail
    let userNameEncontrado = await dataUsuarios.buscarUserName(req.body.username);

    if (!emailEncontrado && !userNameEncontrado) {  //si esta vacio, no encontro nada
      usuario = await dataUsuarios.addUsuario(usuario);
      res.json(usuario);
    }

  } catch (error) { //tira error de email/username existente
    res.send(error.message);
  }

});

//Consultar lo de la ID y getUsuario
router.put('/:id', async (req, res) => {
  //validacion pendiente 
  let id = req.params.id;
  let usuario = req.body;
  usuario._id = id;
  await dataUsuarios.updateUsuario(usuario);
  res.json(await dataUsuarios.getUsuarioId(id));
});

//DELETE
// Solo el mismo usuario o un moderador podria eliminar al usuario
router.delete('/:id', auth, async (req, res) => {
  let id = req.params.id;
  let usuario = await dataUsuarios.getUsuarioId(id);

  if (!usuario) {
    res.send("ID inexistente");
  }
  else {
    await dataUsuarios.deleteUsuario(id);
    res.send("Usuario eliminado");
  }

});

//Añade una pelicula al array de titulos del usuario
router.post('/add-pelicula/:idUsuario', async (req, res) => {
  let idUsuario = req.params.idUsuario;
  let pelicula = req.body;
  await dataUsuarios.addPelicula(idUsuario, pelicula);
  res.json(await dataUsuarios.getUsuarioId(idUsuario));
});

//Remueve una pelicula del array de titulos del usuario
router.put('/remove-pelicula/:idUsuario/:idPelicula', async (req, res) => {
  let idUsuario = req.params.idUsuario;
  let idPelicula = req.params.idPelicula;
  await dataUsuarios.removePelicula(idUsuario, idPelicula);
  res.json(await dataUsuarios.getUsuarioId(idUsuario));
});

//Agrega un usuario a la lista de seguidos del usuario logueado
router.post('/follow/:id', async (req, res) => {
  let id = req.params.id;
  let usuarioASeguir = req.body;
  await dataUsuarios.followUser(id, usuarioASeguir);
  res.json(await dataUsuarios.getUsuarioId(id));
});

//Remueve un usuario de la lista de seguidos del usuario logueado
router.put('/unfollow/:idUsuarioLogueado/:idUnfollowUser', async (req, res) => {
  let idUsuarioLogueado = req.params.idUsuarioLogueado;
  let idUnfollowUser = req.params.idUnfollowUser;
  await dataUsuarios.unfollowUser(idUsuarioLogueado, idUnfollowUser);
  res.json(await dataUsuarios.getUsuarioId(idUsuarioLogueado));
});

module.exports = router;