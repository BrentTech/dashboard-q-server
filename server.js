'use strict';

const Q = require('./lib/server.js');
Q.start();


const db = new Q('database');

db.monitorEvents('create');
db.monitorEvents('update');
db.monitorEvents('delete');


const network = new Q('network');

network.monitorEvents('attack');
network.monitorEvents('no-service');
