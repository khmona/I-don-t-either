var connection;
module.exports = class SQL {
  if (connection) { return; }
  constructor(express){
    this.app = express;
    this.connect();
    // this.router();

  }
  
  connect() {
    this.connection = m.mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        password : 'demiraj62',
        database : 'wreckstad'
      });

    this.connection.connect((err) => {
      if(!err) {
        console.log("MySQL database is connected");
      } else {
      console.log("Error connecting database", err.stack);
      }
    });
    connection = this.connection;
    return this.connection
  }

  READ(id, table, callback) {
    if(id){
      this.connection.query("SELECT * FROM " + table + " WHERE id = ?", id, (err, rows, fields) => {
        callback(err, rows, fields);
      });
    }else{
      this.connection.query("SELECT * FROM " + table, (err, rows, fields) => {
        callback(err, rows, fields);
      });
    }
  }
  
  POST(data, table, callback) {
    this.connection.query("INSERT INTO " + table + " SET ?", data, (err, status) => {
      callback(err, status);
    });
  }

  UPDATE(id, data, table, callback) {
    this.connection.query("UPDATE " + table + " SET ? WHERE id = ?", [data, id], (err, status) => {
      callback(err, status);
    });
  }

  DELETE(id, table, callback) {
    this.connection.query("DELETE FROM " + table + " WHERE id = ?", id, (err, status) => {
      callback(err, status);
    });
  }
};