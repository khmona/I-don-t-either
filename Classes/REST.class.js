'use strict';

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

      var model = me.DB.getModel(req.params.model);
      if (!me[req.method] || !model) {
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

    if(!params.modelID){
      model.find(function(err, result){
         
    }).populate("damages")
      .populate("sparePartsUsed")
      .populate("hasWorked") 
      .populate("customer")
      .populate("vacation").exec(function(err,results){
        res.json(results);
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
    if (!params.modelID) { 
      res.json({"ERROR": "Inget eller ogiltigt modelID"})
    }

    model.findByIdAndUpdate(params.modelID, params, {new: true}, function (err, result) {
      if (err) { console.log(err) }
      res.json(result);
    });
  }

  DELETE(model, params, req, res) {
    if (!params.modelID) { 
      res.json({"ERROR": "Inget eller ogiltigt modelID"})
    }

    model.findByIdAndRemove(params.modelID, function(err, result) {
      if (err) { console.log(err) }
      res.json({'ok': 'raderat'}); 
    });
  }
};