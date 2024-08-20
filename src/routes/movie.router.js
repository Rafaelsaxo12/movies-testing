const { getAll, create, getOne, remove, update, setGenres, setActors, setDirectors } = require('../controllers/movie.controller');
const express = require('express');

const routerMovie = express.Router();

routerMovie.route('/')
    .get(getAll)
    .post(create);

//ruta para moviesGenres
routerMovie.route('/:id/genres')
    .post(setGenres)
//ruta para moviesActors
routerMovie.route('/:id/actors')
    .post(setActors)
//ruta para moviesDirectors
routerMovie.route('/:id/directors')
    .post(setDirectors)

routerMovie.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerMovie;