'use strict';

var nyBil = require("../help-modules/bilGenerator.js")
module.exports = class Server {

	constructor(){

		this.setting = g.settings.Server;

		this.app = m.express();

		this.db = new g.classes.DB();


		this.model = this.db.getModel(this.settings.bilModel)

		this.setup();
	}

	setup(){

		this.app.use(m.bodyparser.Json());

		this.app.use(
			m.express.static(
				m.path.join(g.settings.appRoot, this.settings.webroot)
			)
		);

		this.app.use(m.compression());

		this.app.use(m.cookieparser());

		this.app.use(m.bodyparser.urlrncoded({extended: false}));

		var me = this;
	}
}