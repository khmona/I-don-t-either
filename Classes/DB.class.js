'use strict';
// our database connection
var connection;

module.exports = class DB {
  constructor() {
    // do not connect to mongodb multiple times!
    if (connection) { return; }

    // save our settings to this
    this.settings = g.settings.DB;

    // connect to db
    this.connect();

    // load all model files
    this.loadModels();
  }

  connect() {
    // connect
    m.mongoose.connect('mongodb://'+this.settings.host+'/'+this.settings.db);

    // store connection
    connection = m.mongoose.connection;

    // log successful connection
    connection.once('open', () => {
      console.log("Mongoose connected to "+this.settings.db);
      m.dummyGen();
    });
  }

  // gets a loaded model by name
  getModel(name) {
    return m.mongoose.model(name);
  }

  loadModels() {
    // find all files in the model directory,
    var modelFiles = m.fs.readdirSync(this.settings.modelDir);
    
    console.log("mf", modelFiles);

    // and require each of them
    modelFiles.forEach(function(fileName) {
      require(m.path.join(this.settings.modelDir, fileName));
    }, this);

    // check if the model loaded
    // console.log(m.mongoose.model('Message'));
  }
};