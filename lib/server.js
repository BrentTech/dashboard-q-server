'use strict';

const Server = require('socket.io');

class Queue {
  constructor(q) {
    this.name = q;
    this.events = new Set();
    this.q = Queue.io.of(`/${q}`);
    this.q.on('connection', this.connection.bind(this));
  }

  monitorEvents(event) {
    this.events.add(event);
    console.log('monitoring event:', event)
  }

  clients(room) {
    return Object.keys(this.q.adapter.rooms[room].sockets);
  }

  connection (socket) {
    socket.on('subscribe', (event, callback) => {
      if( this.events.has(event) ) {
        console.log('subscription happened on event:', event)
        socket.join(event);
        callback && callback(undefined, `Subscribed to ${event} in ${this.name}`);
      }
    });
  }

  static publish(message) {
    let {queue, event, payload} = message;
    Queue.io.of(queue).to(event).emit('trigger', payload);
    console.log('event published: ', event)
  }

  static start() {
    const PORT = process.env.PORT;
    Queue.io = new Server(PORT);
    Queue.io.on('connection', socket => {
      socket.on('publish', Queue.publish(message));
    });
    console.log(`Q Server up on ${PORT}`);
  }
}

module.exports = Queue;
