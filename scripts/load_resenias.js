db = db.getSiblingDB('test');
db.resenias.remove( {} );
db.resenias.insertMany([{
    "usuarioId": "1",
    "tituloId": "1",
    "texto": "Reseña 1",
    "puntaje": 7
},
{
    "usuarioId": "2",
    "tituloId": "2",
    "texto": "Reseña 2",
    "puntaje": 5
},
{
    "usuarioId": "3",
    "tituloId": "4",
    "texto": "Reseña 3",
    "puntaje": 3
},
{
    "usuarioId": "4",
    "tituloId": "3",
    "texto": "Reseña 4",
    "puntaje": 9
},
{
    "usuarioId": "5",
    "tituloId": "5",
    "texto": "Reseña 5",
    "puntaje": 10
}
]);