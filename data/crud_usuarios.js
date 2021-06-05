require('dotenv').config();
const connection = require('./connection');
let ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



//faltaria agregar una verificacion si ya existe ese mail. Consultar al profe donde va

async function addUsuario(usuario){ 
    const clientmongo = await connection.getConnection();

    usuario.password = bcrypt.hashSync(usuario.password, 8);

    const result = await clientmongo.db('test')
                                    .collection('usuarios')
                                    .insertOne(usuario);
    return result;
};

async function buscarEmail(email){
    
    const usuario = await connectiondb.db('test')
                            .collection('usuarios')
                            .findOne({email:email});

    if(usuario){
        throw new Error('Email ya existente')
    }
        
    return usuario

}

async function buscarUsuario(email, contraseña){
    const connectiondb = await connection.getConnection();

    const usuario = await connectiondb.db('test')
                            .collection('usuarios')
                            .findOne({email:email});
    console.log('Usuario', usuario);
    if(!usuario){
        throw new Error('Datos inválidos');
    }

    const isMatch =  bcrypt.compareSync(contraseña, usuario.contraseña);

    if(!isMatch){
        throw new Error('Datos inválidos');
    }
    
    return usuario;
}

async function updateUsuario (usuario){
    const clientmongo = await connection.getConnection();
    const query = {_id: new ObjectId(usuario._id)};
    const newValues = {$set:{
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        // email: usuario.email (el email no se deberia poder cambiar)
        }
    };
    const result = await clientmongo.db('test')
                                    .collection('usuarios')
                                    .updateOne(query,newValues);
    return result;
};

async function generateJWT(usuario){
    const token = jwt.sign({_id: usuario._id, email: usuario.email}, process.env.SECRET, {expiresIn: '1h'});
    return token;
}

/*                                               ¿Realmente se puede eliminar un usuario?

async function deleteUsuario (id){
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('test')
                                    .collection('usuarios')
                                    .deleteOne({_id: new ObjectId(id)});
    return result;
};

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

*/

module.exports = {addUsuario, updateUsuario, buscarUsuario, buscarEmail, generateJWT};