const express = require('express');
const router = express.Router();
const dataPeliculas = require('../data/imdb8API');

router.get('/:movieName', async function (req, res) {
    const peliculas = await dataPeliculas.getPeliculas(req.params.movieName);
    res.json(peliculas);
  });


module.exports = router;