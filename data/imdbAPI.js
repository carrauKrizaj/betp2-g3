require('dotenv').config();
const axios = require('axios');

async function getPeliculas(movieName) {

  const options = {
    method: 'GET',
    url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
    params: { s: movieName, page: '1', r: 'json' },
    headers: {
      'x-rapidapi-key': process.env.API_KEY,
      'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
    }
  };

  await axios.request(options).then(function (response) {
    resultado = response.data;
  }).catch(function (error) {
    console.error(error);
  });

  console.log(resultado);
  return resultado;
};



// const options = {
//   method: 'GET',
//   url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
//   params: { i: movieName, r: 'json' },
//   headers: {
//     'x-rapidapi-key': process.env.API_KEY,
//     'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
//   }
// };

module.exports = { getPeliculas };