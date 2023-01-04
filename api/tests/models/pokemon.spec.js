const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate().catch(err => {console.error('Unable to connect to the database:', err)}));

  describe('Validators:', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('Should throw an error if name is null', (done) => {
        Pokemon.create({id: 'C1'})
          .catch(() => done());
      });

      it('Should work when its a valid name', async () => {
        await Pokemon.create({name: 'Pikachu', id: 'C1'});
      });
    });
  });
});