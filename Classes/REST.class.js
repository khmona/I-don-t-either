'use strict';
var dummyGen = require("../dummyGen.js");
var populator = require("../populator.js")

module.exports = class REST {
  constructor(express) {
    this.settings = g.settings.REST;
    this.DB = new g.classes.DB(); 
    this.app = express;

    this.router();
  }

  router() {
    var me = this;
    this.app.all(this.settings.route, function(req, res) {
      if(req.params.model == "ny"){
        dummyGen();
        res.end();

      }
      else if(req.params.model == "populate"){
        
        res.json(populator(me.DB));

      }
      else {
        var model = me.DB.getModel(req.params.model);
        if (!me[req.method] || !model || !model == "ny") {
          res.sendStatus(404);
          res.json({'err':'Undefined model'});
          return;
        }

        var params = req.body || {};
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
    }).populate("damages")
    .populate("sparePartsUsed")
    .populate("customer")
    .populate("hasWorkedOn")
    .populate("vacation")
    .exec(function(err,results){
      res.json(results);
    })

    if(!params.modelID){
      model.find(function(err, result){
        res.json(result)
      })
    }  
    else{
      model.findById(params.modelID, function(err, result){
        res.json(result)
        res.end()
      })
    }

  }
  
  
  PUT(model, params, req, res) {
    if (!params.modelID) { this.error({error: 'Missing ID!'}, res); return; }

    var me = this;
    model.findByIdAndUpdate(params.modelID, params, {new: true}, function (err, result) {
      if (err) { console.log(err) }
      res.json(result);
    });
  }

  DELETE(model, params, req, res) {
    if (!params.modelID) { this.error({error: 'Missing ID!'}, res); return; }

    var me = this;
    model.findByIdAndRemove(params.modelID, function(err, result) {
      if (err) { console.log(err) }
      res.json({'ok': 'raderat'}); 
    });
  }

  error(err, res) {
    res.status(400);
    res.json(err);
  }
};