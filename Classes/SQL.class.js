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
    connection.query("SELECT * FROM employees", function(err, rows, fields){
      console.log(rows)
    })
    return this.connection
  }
};
