require('dotenv').config();
const connection = require('./connection');
let ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function addUsuario(usuario) {
    const clientmongo = await connection.getConnection();

    usuario.password = bcrypt.hashSync(usuario.password, 8);

    const result = await clientmongo.db('test')
        .collection('usuarios')
        .insertOne(usuario);
    return result;
};

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
    console.log('Usuario', usuario);
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

module.exports = { addUsuario, updateUsuario, buscarUsuario, buscarEmail, buscarUserName, generateJWT, getUsuario, deleteUsuario, getUsuarioId, addPelicula, removePelicula };