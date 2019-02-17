'use strict';

const Connection = require('../lib/subscriber.js');

const dbQueue = new Connection('database');

dbQueue.subscribe('delete', (payload) => {
  console.log('DELETE:', payload);
});

dbQueue.subscribe('create', (payload) => {
  console.log('CREATE:', payload);
});

console.log('logger is running');