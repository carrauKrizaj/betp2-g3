const axios = require('axios');

//GET By ID or Title
  var options = {
    method: 'GET',
    url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
    params: {i: 'tt1266020', r: 'json'},
    headers: {
      'x-rapidapi-key': 'af67125161mshe02963b2dce7b50p162f53jsne1e573bdb96d',
      'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
    }
  };

/*Lista de IDs 
matrix: tt0133093
avengers endgame: tt4154796
watchmen: tt0409459
parks and recreation: tt1266020
*/

//GET By Search
  var options2 = {
    method: 'GET',
    url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
    params: {s: 'Avengers Endgame', page: '1', r: 'json'},
    headers: {
      'x-rapidapi-key': 'af67125161mshe02963b2dce7b50p162f53jsne1e573bdb96d',
      'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
    }
  };

//RESULTADO BUSQUEDA
axios.request(options).then(function (response) {
      console.log(response.data);
  }).catch(function (error) {
      console.error(error);
  });