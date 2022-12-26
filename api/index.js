//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync(
  {
    force: true
//    alter: true
  }
)
.then(async () => {
  console.log('DB sincronized OK!');
  server.listen(3001, () => {
    console.log('Back server listening at 3001'); // eslint-disable-line no-console
  });
})
/*
// Inserts de prueba en DB
.then(async () => {
  const {Pokemon, Tipo} = conn.models;
  try{
      await Tipo.bulkCreate([{name: 'normal'}, {name: 'flying'}, {name: 'grass'}, {name: 'poison'}, {name: 'electric'}, {name: 'ground'}]);
      await Tipo.create({name: 'Pepe'});

    let insert = await Pokemon.create({
      id: 'C1',
      name: 'yamil',
      hp: 10,
      attack: 10,
      defense: 10,
      speed: 10,
      height: 10,
      weight: 10,
      image: 'www.image1.com'
    });

    insert.setTypes([4, 1]);

    (await Pokemon.create({
      id: 'C2',
      name: 'natalia',
      hp: 20,
      attack: 20,
      defense: 20,
      speed: 20,
      height: 20,
      weight: 20,
      image: 'www.image2.com'
    })).setTypes([3,4]);

    let [instance, created] = await Pokemon.findOrCreate({
      where: {name: 'anacleto'},
      defaults: {
        id: 'C3',
        hp: 30,
        attack: 30,
        defense: 30,
        speed: 30,
        height: 30,
        weight: 30,
        image: 'www.image3.com'
      }
    });

    instance.setTypes([5, 2]);

    console.log('Mock agregados a DB!');
  }    
  catch(err){
    console.log(err);
  }
})
*/
.catch(err => console.log(err));
