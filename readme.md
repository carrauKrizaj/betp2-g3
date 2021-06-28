#Descripcion

Una aplicacion para armar listado de las peliculas que queres ver o ya viste y te permite dejarle una puntuacion y reseña. Podes seguir otro usuario si te gustan las reseñas
que deja dicho usuario.

#Funcionalidades

    El usuario puede:

        Registrarse
        Buscar peliculas
        Agregarlas a su listado
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
4. Agregar las variables de entorno (solicitarlas).
5. Para ejecutar el programa, desde la consola de comando pararse sobre el directorio del repo y ejecutar el comando "npm run devstart".

#Endpoints de la API

- GET: '/'; Home.
- GET: '/usuario/:username'; Buscador usuarios. 
- POST: '/usuario/login'; Login.
- POST: '/usuario/signup'; Registrarse.
- PUT: '/usuario/:id'; Actualizar usuario.
- DELETE: '/usuario/:id'; Borrar usuario.
- POST: '/usuario/add-pelicula/:idUsuario'; Agregar pelicula a la lista de titulos del usuario.
- PUT: '/usuario/remove-pelicula/:idUsuario/:idPelicula'; Remueve pelicula de la lista de titulos del usuario.
- POST: '/usuario/follow/:id'; Agrega un usuario a la lista de seguidos del usuario.
- PUT: '/usuario/unfollow/:idUsuarioLogueado/:idUnfollowUser'; Remueve un usuario de la lista de seguidos del usuario logueado.
- GET: '/api/reviews' (localhost:3000/reviews); Reseñas.
- GET: '/api/reviews/:id' (localhost:3000/reviews/':id'); Buscador reseña.
- POST: '/api/reviews' (localhost:3000/reviews/); Agregar reseña.
- GET: '/api/reviews/user-reviews/:id' (localhost:3000/reviews/user-reviews/':id'); Busca reseñas por usuario.
- GET: '/api/reviews/title-reviews/:id' (localhost:3000/reviews/title-reviews/':id'); Busca reseñas por titulo.
- PUT: '/api/reviews/:id' (localhost:3000/reviews/':id'); Modificar reseña.
- DELETE: '/api/reviews/:id' (localhost:3000/reviews/':id'); Borrar reseña.
- GET: '/api/peliculas/:movieName'; Devuelve una lista de peliculas con similitud al nombre enviado en la request.

Los endpoints se pueden testear a través de este link: https://obscure-thicket-15756.herokuapp.com/