'use strict';
var s = g.settings;

module.exports = class REST {
  constructor(express) {
    this.settings = s.REST;
    this.DB = new g.classes.DB(); // DB connection & models
    this.app = express;

    this.router();
  }

  // setup standard CRUD for route
  router() {
    var me = this;
    this.app.all(this.settings.route, function(req, res) {
      var model = me.DB.getModel(req.params.model);
      // do we have a 404?
      if (!me[req.method] || !model) {
        res.sendStatus(404);
        res.end();
        return;
      }

      // combine any data sent in the request body with
      // any data sent in the request URL
      var params = req.body || {};
      params.model = req.params.model;
      if (req.params.modelID) {
        params.modelID = req.params.modelID;
      }

      // and call the appropriate method
      me[req.method](model, params, req, res);
    });
  }

  // CREATE
  POST(model, params, req, res) {
    var me = this,
        toSave = new model(params); // new model instance with data
      
    // write data to DB
    toSave.save(function(err, result) {
      if (err) { me.error(err, res); return; }
      res.json(result); // respond with result
    });
  }

  // READ
  GET(model, params, req, res) {
    // pick a mongoose query function and parameters for it
    var me = this,
        func = params.modelID ? 'findById' : 'find',
        q = params.modelID ? params.modelID : {};

    // call the query function (find || findById)
    model[func](q, function(err, result) {
      if (err) { me.error(err, res); return; }
      res.json(result); // respond with result
    });
  }
  
  // UPDATE
  PUT(model, params, req, res) {
    if (!params.modelID) { this.error({error: 'Missing ID!'}, res); return; }

    var me = this;
    model.findByIdAndUpdate(params.modelID, params, {new: true}, function (err, result) {
      if (err) { me.error(err, res); return; }
      res.json(result); // respond with result
    });
  }

  // DELETE
  DELETE(model, params, req, res) {
    if (!params.modelID) { this.error({error: 'Missing ID!'}, res); return; }

    var me = this;
    model.findByIdAndRemove(params.modelID, function(err, result) {
      if (err) { me.error(err, res); return; }
      res.json(true); // respond with result
    });
  }

  error(err, res) {
    res.status(400);
    res.json(err);
  }
};