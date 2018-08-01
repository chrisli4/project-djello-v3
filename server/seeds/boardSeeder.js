const mongoose = require('mongoose');
const mongooseeder = require('mongooseeder');
const Board = require('../models/board');
const List = require('../models/list');
const Card = require('../models/card');

const faker = require('faker')

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

mongooseeder.seed({
  mongodbUrl: 'mongodb://chris:djellon1@ds051933.mlab.com:51933/djello',
  models: { Board, List, Card },
  clean: true,
  mongoose: mongoose,
  seeds: () => {

    console.log('Creating Boards');
    var boards = [];
    for (let i = 1; i < 6; i++) {
      var board = new Board({
        _id: `foo${ i }`,
        userId: 'test1',
        title: faker.name.title(),
        description: faker.name.jobDescriptor(),
      })
    boards.push(board);
    }

    

    console.log('Saving...');
    var promises = [];
    [
      boards
    ].forEach(collection => {
      collection.forEach(model => {
        promises.push(model.save());
      });
    });
    return Promise.all(promises);
  }

});
