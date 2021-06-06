const connection = require('./connection');
let ObjectId = require('mongodb').ObjectId;

async function addResenia(resenia){
    const clientmongo = await connection.getConnection();

    const result = await clientmongo.db('test')
                                    .collection('resenias')
                                    .insertOne(resenia);

    return result;
}

async function getResenias(){
    const clientmongo = await connection.getConnection();

    const reviews = await clientmongo.db('test')
                                    .collection('resenias')
                                    .find()
                                    .toArray()

    return reviews;
}

async function getResenia(id){
    const clientmongo = await connection.getConnection();

    const review = await clientmongo.db('test')
                                    .collection('resenias')
                                    .findOne({_id: new ObjectId(id)});

    return review;
}

async function getReseniasUsuario(userId){
    const clientmongo = await connection.getConnection();

    const reviews = await clientmongo.db('test')
    .collection('resenias')
    .find({"usuarioId": userId})
    .toArray()

    return reviews;
}

async function getReseniasTitulo(titleId){
    const clientmongo = await connection.getConnection();

    const reviews = await clientmongo.db('test')
    .collection('resenias')
    .find({"tituloId": titleId})
    .toArray()

    return reviews;
}

async function updateResenia(review){
    const clientmongo = await connection.getConnection();
    const query = {_id: new ObjectId(review._id)};
    const newValues = {$set:{
        texto: review.texto,
        puntaje: review.puntaje
        }
    };

    const result = await clientmongo.db('test')
                                    .collection('resenias')
                                    .updateOne(query, newValues);

    return result;
}

async function deleteResenia(id){
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db('test')
                                    .collection('resenias')
                                    .deleteOne({_id: new ObjectId(id)});

    return result;
}

module.exports = {addResenia, getResenias, getResenia, updateResenia, deleteResenia, getReseniasUsuario, getReseniasTitulo};