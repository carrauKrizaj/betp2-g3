const express = require('express');
const router = express.Router();
const dataResenias = require('../data/crud_resenias');

router.post('/add-review', async (req, res)=>{
    //Averiguar como hacer la validacion correctamente
    let review = req.body;

    review = await dataResenias.addResenia(review);
    res.json(review);
});

router.get('/reviews', async (req, res)=>{
    const reviews = await dataResenias.getResenias();
    res.json(reviews);
});

router.get('/reviews/:id', async (req, res)=>{
    const review = await dataResenias.getResenia(req.param.id);
    res.json(review);
});

router.get('/user-reviews/:id', async (req, res)=>{
    const reviews = await dataResenias.getReseniasUsuario(req.params.id);
    res.json(reviews);
});

router.get('/title-reviews/:id', async (req, res)=>{
    const reviews = await dataResenias.getReseniasTitulo(req.params.id);
    res.json(reviews);
});

router.put('/:id', async (req, res)=>{
    //Averiguar como hacer la validacion correctamente
    let id = req.params.id;
    let review = req.body;
    review._id = id;
    review = await dataResenias.updateResenia(review);
    res.json(review);
});

router.delete('/:id', async (req, res)=>{
    let id = req.params.id;
    await dataResenias.deleteResenia(id);
    res.send('Reseña eliminada');
});

module.exports = router;