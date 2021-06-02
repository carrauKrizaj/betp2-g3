db = db.getSiblingDB('test');
const bcrypt = require('bcryptjs');
db.usuarios.drop();
db.usuarios.insertMany(usuarios);

const usuarios = 
[
    {
        "nombre": "Pepe",
        "apellido": "Mujica",
        "email": "pepe@altavista.com",
        "contraseña": bcrypt.hashSync('contraseña1', 8),
        "titulos": 
        [
            
        ]
    },
    {
        "nombre": "Norberto",
        "apellido": "Napolitano",
        "email": "pappo@blues.com",
        "contraseña": bcrypt.hashSync('contraseña1', 8),
        "titulos": 
        [
            
        ]
    },
    {
        "nombre": "Rick",
        "apellido": "Sanchez",
        "email": "wabalaba@dubdub.com",
        "contraseña": bcrypt.hashSync('contraseña1', 8),
        "titulos": 
        [
            
        ]
    },
    {
        "nombre": "Pickle",
        "apellido": "Rick",
        "email": "pickle@altavista.com",
        "contraseña": bcrypt.hashSync('contraseña1', 8),
        "titulos": 
        [
            
        ]
    },
    {
        "nombre": "Walter",
        "apellido": "White",
        "email": "blue@magic.com",
        "contraseña": bcrypt.hashSync('contraseña1', 8),
        "titulos": 
        [
            
        ]
    },
    {
        "nombre": "Manu",
        "apellido": "Ginobilli",
        "email": "manu@spurs.com",
        "contraseña": bcrypt.hashSync('contraseña1', 8),
        "titulos": 
        [
            
        ]
    },
    {
        "nombre": "Juan",
        "apellido": "Topo",
        "email": "topo@gmail.com",
        "contraseña": bcrypt.hashSync('contraseña1', 8),
        "titulos": 
        [
            
        ]
    },
    {
        "nombre": "Ron",
        "apellido": "Swanson",
        "email": "rons@pawnee.gov",
        "contraseña": bcrypt.hashSync('contraseña1', 8),
        "titulos": 
        [
            
        ]
    },
    {
        "nombre": "Groucho",
        "apellido": "Marx",
        "email": "grouchom@spurs.com",
        "contraseña": bcrypt.hashSync('contraseña1', 8),
        "titulos": 
        [
            
        ]
    }
];