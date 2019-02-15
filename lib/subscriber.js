'use strict';

const io = require('socket.io-client');

const SERVER = process.env.Q_SERVER || 'http://localhost:3333';

/**
 *
 *
 * @class ClientConnector
 */
class ClientConnector {
  constructor(q) {
    this.q = q;
    this.sockets = [];
  }

  /**
   *
   *
   * @param {*} event
   * @param {*} callback
   * @memberof ClientConnector
   */
  subscribe(event, callback) {
    this.sockets[event] = io.connect(`${SERVER}/${this.q}`);
    this.sockets[event].emit('subscribe', event, (err, status) => {
      if (err) { console.error(err); }
      else { console.log(status); }
    });
    this.socket[event].on('trigger', callback);
  }

  subscriptions() {
    return Object.keys(this.sockets);
  }
}

module.exports = ClientConnector;
