var pokemon=require('../controllers/pokemon.server.controller');

module.exports=function(app) {
    app.get('/pokemon/:pokeid/:obf', pokemon.getPokemon);
    // app.post('/pokemon/:pokeid', pokemon.setPokemonWithID);
}
