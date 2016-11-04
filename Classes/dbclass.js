var connection;

module.exports = class DB {
	constructor(){
		if(connection){return; }
	
			this.settings = g.settings.DB;
	
			this.connect();

			this.loadModels();
	}
	
	connect(){

		m.mongoose.connect('mongodb://'+this.settings.host+'/'+this.settings.db);

		connection = m.mongoose.connection;

		connection.once('open',() => {
			console.log("Model-Files:", modelFiles);
		}) 
    }

    getModel(name) {
    	return m.mongoose.model(name);
    }
    loadModel(){

    	var modelfiles = m.fs.readdirSync(this.settings.modelDir);

    	console.log( "Model-Files:",modelfiles);
    	modelfiles.forEach(funtion(fileName){

    		require(m.path.join(this.settingsmodelDir, fileName));
    	}, this); 
    }

};