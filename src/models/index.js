const Actor = require("./Actor.model");
const Movie = require("./Movie.model");
const Director = require("./Director.model");
const Genre = require("./Genre.model");

Movie.belongsToMany(Actor, { through:'moviesActors' })
Actor.belongsToMany(Movie, { through:'moviesActors' })

Movie.belongsToMany(Director, { through:'moviesDirectors' })
Director.belongsToMany(Movie, { through:'moviesDirectors' })

Movie.belongsToMany(Genre, { through:'moviesGenres' })
Genre.belongsToMany(Movie, { through:'moviesGenres' })