const { Router } = require('express');
const axios = require('axios');
const router = Router();
const {ordenar} = require('../../../utils');
const {Pokemon, Tipo} = require('../db');

let cachedPokemons = {
    own: [],
    api: []
};
let lastApiUrl = 'https://pokeapi.co/api/v2/pokemon'; // Api. última URL de paginado visitada

async function getPokemonsOwn(){
    // Consulta y devuelve todos los registros de la DB.
    console.log('Traigo Pokemons desde BBDD!');

    // Eager loading (incluye los tipos adentro de cada registro)
    cachedPokemons.own = (await Pokemon.findAll({include: 'types'})).map(({dataValues}) => {
        dataValues.types = dataValues.types.map(el => el.dataValues.name);
        return dataValues;
    });

    return cachedPokemons.own;
}

async function getPokemonsApi(cantidad){
    // Consulta a la api para obtener (cantidad) registros nuevos y agregarlos limpios al cache. Devuelve todo el cache de Api.
    let response = {next: lastApiUrl};
    let results = [];

    console.log(`Tengo ${cachedPokemons.api.length} Pokemons. Necesito otros ${cantidad} desde Api!`);
    while ((results.length < cantidad) && (response.next)) {
        response = (await axios.get(response.next)).data;
        lastApiUrl = response.next;
        results.push(...response.results.map(el => el.url));
    } 
    console.log(`Se descargaron ${results.length} Pokemons`);
   
    results = (await Promise.all(results.map(el => axios.get(el)))).map(el => el.data);

    return cachedPokemons.api = cachedPokemons.api.concat(limpiar(results));
}

async function getCache({only, apiRegs = 40}){
    // Devuelve desde los caches, los registros con los que voy a trabajar (el orden, paginado y el filtrado). Por defecto, devuelve 40 de Api, más los de Own
    let results = [];

    if (only !== 'api')
        results.push(...(await getPokemonsOwn()));

    if (only !== 'own')
        results.push(...((cachedPokemons.api.length >= apiRegs) ? cachedPokemons.api.slice(0, apiRegs) : await getPokemonsApi(apiRegs - cachedPokemons.api.length)));

    return results
}

function limpiar(pokemons){
    return pokemons.map(({id, name, weight, stats, sprites, types}) => (
        {
            id,
            name,
            weight,
            hp: stats[0]?.base_stat,
            attack: stats[1]?.base_stat,
            defense: stats[2]?.base_stat,
            speed: stats[3]?.base_stat,
            image: sprites?.other.home.front_default,
            types: types?.map(types => types.type.name)
        }
    ))
}

async function getDetail(param, cache){
    let finded = cache.find(el => (el.name.toLowerCase() === param.toLowerCase()) || (el.id == param));

    if (!finded){
        console.log(`Busco Pokemon ${param} en Api!`);
        finded = (await (axios.get(`https://pokeapi.co/api/v2/pokemon/${param}`))).data;
        finded = limpiar([finded]);
    }

    return finded;
}

router.get('/', async (req, res) => { // req.query = {only, apiRegs = 40, name, order, page, ipp}
    try{
        let results = await getCache(req.query);

        if (req.query.name) return res.send(await getDetail(req.query.name, results));

        //////// Orden /////////
        if (req.query.order) results = ordenar(results, req.query.order);

        //////// Paginado ////////
        if (req.query.page){
            const {ipp = 12} = req.query;
            const init = req.query.page * ipp - ipp;

            if (init >= results.length) return res.status(404).send('Page out of range');
            
            results = results.slice(init, init - -ipp);
        }

        res.send(results);
    }
    catch(err){
        console.error(err);
        res.status(err.response?.status || 500).send(err.response?.statusText || err);
}
});

router.get('/:param', async (req, res) => { // req.query = {only, apiRegs = 40}
    try{
        return res.send(await getDetail(req.params.param, await getCache(req.query)));
    }
    catch(err){
        console.error(err);
        res.status(err.response?.status || 500).send(err.response?.statusText || err);
    }
});

router.post('/', async (req, res) => { // req.query = {apiRegs = 40}
    try{
        await getCache({apiRegs: req.query.apiRegs});

        if (cachedPokemons.api.findIndex(el => el.name.toLowerCase() === req.body.name.toLowerCase()) + 1) return res.status(409).send('Ya existe en BD');

        let [instance, created] = await Pokemon.findOrCreate({
            where: {name: req.body.name},
            defaults: {id: ('C' + ((await getPokemonsOwn()).length - -1)), ...req.body.defaults}
        });

        if (!created) return res.status(409).send('Ya existe en BD');

        await instance.setTypes(req.body.types);

        cachedPokemons.own.push({...instance.dataValues, types: req.body.types});

        res.send(cachedPokemons.own[cachedPokemons.own.length - 1]);
    }
    catch(err){
        console.error(err);
        res.status(err.status || 500).send(err.message || err);
    }
});

module.exports = router;