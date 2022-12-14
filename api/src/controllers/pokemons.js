const {orderBy, getPokemonsOwn, getCache, getDetail} = require('../helpers');
const {Pokemon} = require('../db');
const cache = require('../cache');

async function getPokemons(req, res) { // req.query = {only, apiRegs = 40, name, order, page, ipp}
    try{
        let results = await getCache(req.query);

        if (req.query.name) return res.send(await getDetail(req.query.name, results));

        //////// Orden /////////
        if (req.query.order) results = orderBy(results, req.query.order);

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
}

async function getPokemonsParam (req, res) { // req.query = {only, apiRegs = 40}
    try{
        return res.send(await getDetail(req.params.param, await getCache(req.query)));
    }
    catch(err){
        console.error(err);
        res.status(err.response?.status || 500).send(err.response?.statusText || err);
    }
}

async function postPokemons(req, res) { // req.query = {apiRegs = 40}
    try{
        await getCache({apiRegs: req.query.apiRegs});

        if (cache.api.findIndex(el => el.name.toLowerCase() === req.body.name.toLowerCase()) + 1) return res.status(409).send('Ya existe en BD');

        let [instance, created] = await Pokemon.findOrCreate({
            where: {name: req.body.name},
            defaults: {id: ('C' + ((await getPokemonsOwn()).length - -1)), ...req.body.defaults}
        });

        if (!created) return res.status(409).send('Ya existe en BD');

        await instance.setTypes(req.body.types);

        cache.own.push({...instance.dataValues, types: req.body.types});

        res.send(cache.own[cache.own.length - 1]);
    }
    catch(err){
        console.error(err);
        res.status(err.status || 500).send(err.message || err);
    }
}

module.exports = {getPokemons, getPokemonsParam, postPokemons};