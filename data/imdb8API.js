require('dotenv').config();
const axios = require('axios');

async function getPeliculas(movieName){
    let resultado;
    const options = {
        method: 'GET',
        url: 'https://imdb8.p.rapidapi.com/auto-complete',
        params: {q: movieName},
        headers: {
          'x-rapidapi-key': process.env.API_KEY2,
          'x-rapidapi-host': 'imdb8.p.rapidapi.com'
        }
      };

    await axios.request(options).then(function (response) {
        resultado = response.data.d
                            .filter(item => item.q === "feature")
                            .map(item => ({foto:item.i, id:item.id, titulo: item.l, anio: item.y}));
    }).catch(function (error) {
        console.error(error);
    });

    return resultado;
};

module.exports = {getPeliculas};
  
