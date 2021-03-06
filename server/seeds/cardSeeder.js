const mongoose = require('mongoose');
const mongooseeder = require('mongooseeder');
const Board = require('../models/board');
const Card = require('../models/card');

const faker = require('faker')

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

mongooseeder.seed({
  mongodbUrl: 'mongodb://chris:djellon1@ds051933.mlab.com:51933/djello',
  useNewUrlParser: true,
  models: { Card },
  clean: true,
  mongoose: mongoose,
  seeds: () => {

    console.log('Creating Cards');
    var cards = [];
    for(let i = 1; i < 131; i++) {

      let genRan = getRandomInt(1, 39);

      var card = new Card({
        _id: `foobar${ i }`,
        userId: `test1`,
        listId: `bar${ genRan }`,
        title: faker.name.title(),
        description: faker.company.bs(),
      })

    cards.push(card);
    }

    for(let i = 132; i < 142; i++) {

      let genRan = getRandomInt(40, 50);
      let genRanId = getRandomInt(2, 4);

      var card = new Card({
        _id: `foobar${ i }`,
        userId: `test${genRanId}`,
        listId: `bar${ genRan }`,
        title: faker.name.title(),
        description: faker.company.bs(),
        members: ['test1']
      })

    cards.push(card);
    }

    console.log('Saving...');
    var promises = [];
    [
      cards
    ].forEach(collection => {
      collection.forEach(model => {
        promises.push(model.save());
      });
    });
    return Promise.all(promises);
  }

});
