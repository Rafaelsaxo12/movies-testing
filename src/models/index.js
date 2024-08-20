const Movie = require('./Movie')
const Actor = require('./Actor')
const Genre = require('./Genre')
const Director = require('./Director')

//relacionando movies con genres
Movie.belongsToMany(Genre, { through: 'moviesGenres'})
Genre.belongsToMany(Movie, { through: 'moviesGenres'})

//relacionando movies con los actores
Movie.belongsToMany(Actor, { through: 'moviesActors'})
Actor.belongsToMany(Movie, { through: 'moviesActors'})

//relacionando movies con directors
Movie.belongsToMany(Director, { through: 'moviesDirectors'})
Director.belongsToMany(Movie, { through: 'moviesDirectors'})