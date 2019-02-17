'use strict';

const io = require('socket.io-client');
const SERVER = process.env.Q_SERVER || 'http://localhost:3333';

class Publisher {

  constructor(q) {
    this.q = io.connect(`${SERVER}`);
  }

  publish(queue, event, payload) {
    let message = {queue, event, payload};
    this.q.emit('publish', message);
  }
}

module.exports = Publisher;