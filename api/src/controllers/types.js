const axios = require('axios');
let {types} = require('../cache');
const {Tipo} = require('../db');

async function getTypes(req, res) {
    try{
        if (!types){
            console.log('Se descargarán tipos desde Api!');
            await Tipo.bulkCreate((await axios.get('https://pokeapi.co/api/v2/type')).data.results.map(({name}) => ({name})));
            types = (await Tipo.findAll()).map(el => el.dataValues);
        }
        res.send(types);
    }
    catch(err){
        console.error(err);
        res.status(err.status || 500).send(err.message || err);
    }
}

module.exports = {getTypes};