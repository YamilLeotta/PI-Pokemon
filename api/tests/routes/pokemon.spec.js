/* eslint-disable import/no-extraneous-dependencies */
const {expect} = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon,conn} = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
  id: 'C1'
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate().catch(err => {console.error('Unable to connect to the database:', err)}));
  beforeEach(() => Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon)));
  
  describe('GET /pokemons', () => {
    it('Responds with 200', async () => await agent.get('/pokemons').expect(200));

    it('Responds with 200 and object with name "pikachu"', async () => await agent.get('/pokemons/C1').expect(200).then(res => expect(res.body.name).equal('pikachu')));

    it('Responds query "name=pikachu" status 200 with {id: "C1", name: "pikachu"}', async () => 
      await agent.get('/pokemons?name=pikachu')
        .then(res => expect(res.body).includes({id: 'C1', name: 'pikachu'})));
  });
});
