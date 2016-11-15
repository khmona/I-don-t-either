var s = g.settings;

module.exports = class Login {
  constructor(express) {
    this.app = express;
    this.settings = s.Login;
    this.DB = new g.classes.DB(); 
    this.model = this.DB.getModel('User');

    this.router();
  }

  
  router() {
    var me = this;
    this.app.all(this.settings.route, function(req, res) {

      if (!me[req.method]) {
        res.sendStatus(404);
        res.end();      
        return;
      }

      me[req.method](req, res);
    });
  }


  POST(req, res) {

    var params = req.body || {};

    if (!params.name || !params.pass) {

      res.sendStatus(400);
      res.end();
      return;
    }


    this.model.findOne(params, function(err, result) {
      if (result) {
        req.session.loggedIn = result._id;
      }


      res.json(true);
    });
  }


  GET(req, res) {
    res.json(!!req.session.loggedIn);
  }


  DELETE(req, res) {

    delete req.session.loggedIn;

    res.json(true);
  }
}