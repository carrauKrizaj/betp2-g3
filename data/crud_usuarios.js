require('dotenv').config();
const connection = require('./connection');
let ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

async function addUsuario(usuario) {
    const clientmongo = await connection.getConnection();

    usuario.password = bcrypt.hashSync(usuario.password, 8);
    usuario.titulos = [];
    usuario.seguidores = [];
    usuario.seguidos = [];

    const result = await clientmongo.db('test')
        .collection('usuarios')
        .insertOne(usuario);
    return result;
};

function checkEmail(email){
    if (!validator.isEmail(email)){
        throw new Error('Email invalido');
    }
}

function checkName(name){
    if (!validator.isAlpha(name)){
        throw new Error('El nombre o apellido tienen caracteres no validos');
    }
}

function checkStringLength(string){
    if (!validator.isLength(string, { min: 6, max: 20 })){
        throw new Error('El usuario/contraseña debe contener minimo 6 caracteres y maximo 20');
    }
}

async function buscarEmail(email) {
    const clientmongo = await connection.getConnection();

    const usuario = await clientmongo.db('test')
        .collection('usuarios')
        .findOne({ email: email });

    if (usuario) {
        throw new Error('Email o nombre de usuario ya en uso');
    }

    return usuario;

}

async function buscarUserName(username) {
    const clientmongo = await connection.getConnection();

    const usuario = await clientmongo.db('test')
        .collection('usuarios')
        .findOne({ username: username });

    if (usuario) {
        throw new Error('Email o nombre de usuario ya en uso');
    }

    return usuario;

}

async function buscarUsuario(email, password) {
    const clientmongo = await connection.getConnection();

    const usuario = await clientmongo.db('test')
        .collection('usuarios')
        .findOne({ email: email });
    
    if (!usuario) {
        throw new Error('Datos inválidos');
    }

    const isMatch = bcrypt.compareSync(password, usuario.password);

    if (!isMatch) {
        throw new Error('Datos inválidos');
    }

    return usuario;
}

async function updateUsuario(usuario) {
    const clientmongo = await connection.getConnection();
    const query = { _id: new ObjectId(usuario._id) };
    const newValues = {
        $set: {
            nombre: usuario.nombre,
            apellido: usuario.apellido,
        }
    };
    const result = await clientmongo.db('test')
        .collection('usuarios')
        .updateOne(query, newValues);
    return result;
};

async function generateJWT(usuario) {
    const token = jwt.sign({ _id: usuario._id, email: usuario.email }, process.env.SECRET, { expiresIn: '1h' });
    return token;
}

//buscador por nombre de usuario = funcionalidad de la API; un usuario puede seguir a otros usuarios
async function getUsuario(username) {
    const clientmongo = await connection.getConnection();
    const usuario = await clientmongo.db('test')
        .collection('usuarios')
        .find({ username: { '$regex': username } })
        .toArray();
    return usuario;
};

// async function getUsuarios(){
//     const clientmongo = await connection.getConnection();
//     const usuarios =  await clientmongo.db('test')
//                                        .collection('usuarios')
//                                        .find()
//                                        .toArray();
//     return usuarios;
// };

async function deleteUsuario(id) {
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('test')
        .collection('usuarios')
        .deleteOne({ _id: new ObjectId(id) });
    return result;
};

async function getUsuarioId(id) {
    const clientmongo = await connection.getConnection();
    const usuario = await clientmongo.db('test')
        .collection('usuarios')
        .findOne({ _id: new ObjectId(id) });
    return usuario;
};

async function addPelicula(idUsuario, pelicula) {
    const clientmongo = await connection.getConnection();
    const query = { _id: new ObjectId(idUsuario) };
    const newValues = { $push: { "titulos": pelicula } };
    const result = await clientmongo.db('test')
        .collection('usuarios')
        .updateOne(query, newValues);
    return result;
};

async function removePelicula(idUsuario, peliculaId) {
    const clientmongo = await connection.getConnection();
    const query = { _id: new ObjectId(idUsuario) };
    const newValues = { $pull: { "titulos": {id: peliculaId} } };
    const result = await clientmongo.db('test')
        .collection('usuarios')
        .updateOne(query, newValues);
    return result;
};

async function followUser(id, usuarioASeguir){
    const clientmongo = await connection.getConnection();

    const usuarioEncontrado = await getUsuarioId(usuarioASeguir._id);
    const yaSiguiendo = usuarioEncontrado.seguidores.find(user => user._id = id);

    if(yaSiguiendo){
        throw new Error('Usuario ya seguido');
    }

    const query = { _id: new ObjectId(id) };
    const newValues = { $push: { "seguidos": usuarioASeguir } };
    await clientmongo.db('test').collection('usuarios').updateOne(query, newValues);

    let aux = await getUsuarioId(id);

    //con esto evito pasarle informacion personal del usuario
    const usuarioSiguiendo = {
        _id: aux._id,
        username: aux.username,
        titulos: aux.titulos
    };

    const query2 = { _id: new ObjectId(usuarioASeguir._id) };
    const newValues2 = { $push: { "seguidores": usuarioSiguiendo } };
    await clientmongo.db('test').collection('usuarios').updateOne(query2, newValues2);
};

async function unfollowUser(idUsuarioLogueado, idUnfollowUser){
    const clientmongo = await connection.getConnection();

    const query = { _id: new ObjectId(idUsuarioLogueado) };
    const newValues = { $pull: { "seguidos": {_id: idUnfollowUser} } };
    await clientmongo.db('test').collection('usuarios').updateOne(query, newValues);

    const query2 = { _id: new ObjectId(idUnfollowUser) };
    const newValues2 = { $pull: { "seguidores": query } };
    await clientmongo.db('test').collection('usuarios').updateOne(query2, newValues2);
};

module.exports = { addUsuario, updateUsuario, buscarUsuario, buscarEmail, buscarUserName, generateJWT, getUsuario, 
                    deleteUsuario, getUsuarioId, addPelicula, removePelicula, followUser, unfollowUser, checkEmail,
                    checkName, checkStringLength };