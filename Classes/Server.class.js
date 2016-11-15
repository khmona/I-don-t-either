'use strict';


module.exports = class Server {

	constructor(){

		this.settings = g.settings.Server;

		this.app = m.express();

		this.db = new g.classes.DB();

		this.setup();
	}

	setup(){

		this.app.use(m.bodyparser.json());

		this.app.use(
			m.express.static(
				m.path.join(g.settings.appRoot, this.settings.webroot)
			)
		);

		this.app.use(m.compression({threshold: 0}));

		this.app.use(m.cookieparser());

		this.app.use(m.bodyparser.urlencoded({extended: false}));

		this.app.use(m.expresssession({
			secret: 'Hublot',
			resave: false,
			saveUninitialized: true
		}));

		new g.classes.REST(this.app);

		var me = this;

		this.app.listen(this.settings.port, function(){
			console.log('Server listening on port ' + me.settings.port);
		});
	}
}

