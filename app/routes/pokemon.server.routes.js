var pokemon=require('../controllers/pokemon.server.controller');

module.exports=function(app) {
    app.get('/pokemon/:gens', pokemon.getPokemon);
    // app.post('/pokemon/:pokeid', pokemon.setPokemonWithID);
}
