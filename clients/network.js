'use strict';

const Connection = require('../lib/subscriber.js');

const netQueue = new Connection('network');

netQueue.subscribe('attack', (payload) => {
  console.log('Shields Up!', payload);
});

console.log('logger is running');
