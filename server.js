'use strict';

const Q = require('./lib/server.js');
Q.start();

const db = new Q('database');
db.monitorEvents('create');
db.monitorEvents('read');
db.monitorEvents('update');
db.monitorEvents('delete');