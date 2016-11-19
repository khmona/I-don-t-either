'use strict';
var connection;

module.exports = class DB {
  constructor() {
    
    if (connection) { return; }

    this.settings = g.settings.SQL;
    this.connection();

    this.loadSomething();
  }

  connection() {
   database: function(){

    var connection = mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: 'admin',
      database: 'wreckstadSql'
    });
    return connection 
  }

  loadSomething() {

  }
};