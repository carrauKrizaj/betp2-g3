#Descripcion

Una aplicacion para armar listado de las peliculas que queres ver o ya viste y te permite dejarle una puntuacion y reseña. Podes seguir otro usuario si te gustan las reseñas
que deja dicho usuario.

#Funcionalidades

    El usuario puede:

        Registrarse
        Buscar peliculas y series
        Agregarlas a su listado
        Ponerles un estado (Completada, Pendiente, Abandonada, En Curso)
        Dejar una puntuacion
        Dejar una reseña
        Buscar Usuarios
        Seguir Usuarios

#Actores/Roles

- Usuario
- Moderador (?)

#Entidades principales

- Usuarios
- Reviews

#Instrucciones técnicas para la instalación de un entorno de desarrollo

1. Hacer un Fork al repositorio de GitHub: https://github.com/carrauKrizaj/betp2-g3
2. Clonar el repositorio localmente: no clonar el repo original, sino el que se generó luego del fork en tu propio repo.
3. Instalar las dependencias; para eso, desde la consola de comando pararse sobre el directorio del repo y ejecutar el comando "npm install".

#Endpoints de la API

GET - Home: '/' - (http:/localhost:3000).
GET - Buscador usuarios: '/usuarios/:nombre' - (http:/localhost:3000/':nombre').
POST - Login: '/usuarios/login' - (http:/localhost:3000/login).
POST - SignIn: '/usuarios/signin' - (http:/localhost:3000/signin).
GET - Reseñas: '/api/reviews' - (http:/localhost:3000/reviews).
GET - Buscador reseña: '/api/reviews/:id' - (http:/localhost:3000/reviews/':id').
POST - Agregar reseña: '/api/reviews' - (http:/localhost:3000/reviews/).
GET - Busca reseñas por usuario: '/api/reviews/user-reviews/:id' - (http:/localhost:3000/reviews/user-reviews/':id').
GET - Busca reseñas por titulo: '/api/reviews/title-reviews/:id' - (http:/localhost:3000/reviews/title-reviews/':id').
PUT - Modificar reseña: '/api/reviews/:id' - (http:/localhost:3000/reviews/':id').
DELETE - Borrar reseña: '/api/reviews/:id' - (http:/localhost:3000/reviews/':id').
