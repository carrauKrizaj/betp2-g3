const connection = require('./connection');
let ObjectId = require('mongodb').ObjectId;

async function getUsuarios(){
    const clientmongo = await connection.getConnection();
    const usuarios =  await clientmongo.db('test')
                                       .collection('usuarios')
                                       .find()
                                       .toArray();
    return usuarios;
};

async function getUsuario(id){
    const clientmongo = await connection.getConnection();
    const usuario =  await clientmongo.db('test')
                                       .collection('usuarios')
                                       .findOne({_id: new ObjectId(id)});
    return usuario;
};

async function addUsuario(usuario){
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('test')
                                    .collection('usuarios')
                                    .insertOne(usuario);
    return result;
};

module.exports = {getUsuarios, getUsuario, addUsuario};