const router = require('express').Router();
const {getPokemons, getPokemonsParam, postPokemons} = require('../controllers/pokemons');

router.get('/', getPokemons);
router.get('/:param', getPokemonsParam);
router.post('/', postPokemons);

module.exports = router;