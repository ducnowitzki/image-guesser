var pokemon=require('../controllers/pokemon.server.controller');

module.exports=function(app) {
    app.get('/pokemon', pokemon.getPokemonInstructions);
    app.get('/pokemon/:pokeid', pokemon.getPokemonById);
    app.post('/pokemon/:pokeid', pokemon.setPokemonWithID);

    
}
