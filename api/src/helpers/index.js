const {Pokemon} = require('../db');
const axios = require('axios');
const cache = require('../cache');

async function getPokemonsOwn(){
    // Consulta y devuelve todos los registros de la DB.
    console.log('Traigo Pokemons desde BBDD!');

    // Eager loading (incluye los tipos adentro de cada registro)
    cache.own = (await Pokemon.findAll({include: 'types', required: false})).map(({dataValues}) => {
        dataValues.types = dataValues.types.map(el => el.dataValues.name);
        if (!dataValues.types.length) dataValues.types.push('unknown');
        return dataValues;
    });

    return cache.own;
}

async function getPokemonsApi(cantidad){
    // Consulta a la api para obtener (cantidad) registros nuevos y agregarlos limpios al cache. Devuelve todo el cache de Api.
    let response = {next: cache.lastApiUrl};
    let results = [];

    console.log(`Tengo ${cache.api.length} Pokemons. Necesito otros ${cantidad} desde Api!`);
    while ((results.length < cantidad) && (response.next)) {
        response = (await axios.get(response.next)).data;
        cache.lastApiUrl = response.next;
        results.push(...response.results.map(el => el.url));
    } 
    console.log(`Se descargaron ${results.length} Pokemons`);

    results = (await Promise.all(results.map(el => axios.get(el, {timeout: 10000})))).map(el => el.data);

    return cache.api = cache.api.concat(clean(results));
}

async function getCache({only, apiRegs = cache.api.length || 40}){
    // Devuelve desde los caches, los registros con los que voy a trabajar (el orden, paginado y el filtrado). Por defecto, devuelve todos los de Api, o 40 en caso de que no haya cache, más los de Own
    let results = [];

    if (only !== 'api')
        results.push(...(await getPokemonsOwn()));

    if (only !== 'own')
        results.push(...((cache.api.length >= apiRegs) ? cache.api.slice(0, apiRegs) : await getPokemonsApi(apiRegs - cache.api.length)));

    return results
}

function clean(pokemons){
    return pokemons.map(({id, name, height, weight, stats, sprites, types}) => (
        {
            id,
            name,
            height,
            weight,
            hp: stats[0]?.base_stat,
            attack: stats[1]?.base_stat,
            defense: stats[2]?.base_stat,
            speed: stats[3]?.base_stat,
//            image: sprites?.other.home.front_default,
            image: sprites.other.home.front_default?.split('/').slice(0, sprites.other.home.front_default?.split('/').length - 1).join('/') ||
            sprites.other['official-artwork'].front_default?.split('/').slice(0, sprites.other['official-artwork'].front_default?.split('/').length - 1).join('/'),
            types: types?.map(types => types.type.name)
        }
    ))
}

async function getDetail(param, cachedPokemons){
    let finded = cachedPokemons.find(el => (el.name.toLowerCase() === param.toLowerCase()) || (el.id.toString().toLowerCase() == param.toLowerCase()));


    if (!finded){
        console.log(`Busco Pokemon ${param} en Api!`);
        finded = (await (axios.get(`https://pokeapi.co/api/v2/pokemon/${param}`)))?.data;
        finded = finded && clean([finded])[0];
        cache.api.push(finded);
    }

    return finded;
}

function orderBy (arr, by){ // arr = array de objetos ; by = "PropiedadA" (ascendente) o "PropiedadD" (descendente)
    if (!by) return arr;
    let prop = by.slice(0, by.length - 1);
    let order = (by.slice(by.length - 1) === 'A') ? 1 : -1;

    if (!prop || !arr || !order) throw new Error('Error on arguments')

    return [...arr].sort((a, b) => (a[prop] > b[prop]) ? order : -order);
}

module.exports = {getPokemonsOwn, getPokemonsApi, getCache, clean, getDetail, orderBy};