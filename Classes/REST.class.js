'use strict';
var s = g.settings;
var dummyGen = require("../dummyGen.js");

module.exports = class REST {
  constructor(express) {
    this.settings = s.REST;
    this.DB = new g.classes.DB(); 
    this.app = express;

    this.router();
  }

  router() {
    var me = this;
    this.app.all(this.settings.route, function(req, res) {
      if(req.params.model == "ny"){
        dummyGen();
        res.json(dummyGen())
      }
      else {
        var model = me.DB.getModel(req.params.model);
        if (!me[req.method] || !model || !model == "ny") {
          res.sendStatus(404);
          res.end();
          return;
        }

        var params = req.body || {};  // VARFÖR TOMT OBJEKT!
        params.model = req.params.model; 
        if (req.params.modelID) {
          params.modelID = req.params.modelID;
        }

        me[req.method](model, params, req, res);
      }
    });
  }

  
  POST(model, params, req, res) {
    var me = this,
        toSave = new model(params); 
      
    toSave.save(function(err, result) {
      if (err) { me.error(err, res); return; }
      res.json(result);
    });
  }

  GET(model, params, req, res) {
    
    var me = this,
        func = params.modelID ? 'findById' : 'find',
        q = params.modelID ? params.modelID : {};

    model[func](q, function(err, result) {
      if (err) { me.error(err, res); return; }
      res.json(result); 
    });
  }
  
  
  PUT(model, params, req, res) {
    if (!params.modelID) { this.error({error: 'Missing ID!'}, res); return; }

    var me = this;
    model.findByIdAndUpdate(params.modelID, params, {new: true}, function (err, result) {
      if (err) { me.error(err, res); return; }
      res.json(result);
    });
  }

  DELETE(model, params, req, res) {
    if (!params.modelID) { this.error({error: 'Missing ID!'}, res); return; }

    var me = this;
    model.findByIdAndRemove(params.modelID, function(err, result) {
      if (err) { me.error(err, res); return; }
      res.json(true); 
    });
  }

  error(err, res) {
    res.status(400);
    res.json(err);
  }
};