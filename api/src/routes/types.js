const { Router, application } = require('express');
const axios = require('axios');
const router = Router();
const {Tipo} = require('../db');

let cachedTypes;

router.get('/', async (req, res) => {
    try{
        if (!cachedTypes){
            console.log('Se descargarán tipos desde Api!');
            await Tipo.bulkCreate((await axios.get('https://pokeapi.co/api/v2/type')).data.results.map(({name}) => ({name})));
            cachedTypes = (await Tipo.findAll()).map(el => el.dataValues);
        }

        res.send(cachedTypes);
    }
    catch(err){
        console.error(err);
        res.status(err.status || 500).send(err.message || err);
    }
});

module.exports = router;
