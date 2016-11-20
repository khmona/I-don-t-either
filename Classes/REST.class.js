'use strict';

module.exports = class REST {
  constructor(express) {
    this.settings = g.settings.REST;
    this.DB = new g.classes.DB();
    this.app = express;
    this.SQL = new g.classes.SQL;
    this.router();
  }

  router() {
    var me = this;
    this.app.all(this.settings.route, function(req, res) {
      if(req.params.type == "rest"){
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
      }
      else {
        if(req.method == "GET"){me.READ(req.params.modelID, req.params.model, function(err, rows, fields){
            console.log(rows)  
            res.json(rows)
          })
        }
        if(req.method == "POST"){me.CREATE(req.body, req.params.model, function(err, rows, fields){
            res.json(rows)
          })
        }
        if(req.method == "PUT"){me.UPDATE(req.params.modelID, req.body, req.params.model, function(err, rows, fields){
            res.json(rows)   
          })
        }
        if(req.method == "DELETE"){me.DELEETEE(req.params.modelID, req.params.model, function(err, rows, fields){
            res.json({"Deleted id: ": req.params.modelID})
          })
        }
      }  
    });  
  }

  POST(model, params, req, res) {
    var me = this,
      toSave = new model(params);

    toSave.save(function (err, result) {
      if (err) { me.error(err, res); return; }
      res.json(result);
    });
  }

  GET(model, params, req, res) {

    if (!params.modelID) {
      model.find(function (err, result) {

      }).populate("damages").populate("customer")
        .populate("hasWorked").populate("sparePartsUsed")
        .populate("vacation").exec(function (err, resss) {
          res.json(resss)
        })
    }
    else {
      model.findById(params.modelID, function (err, result) {

      }).populate("damages").populate("customer")
        .populate("hasWorked").populate("sparePartsUsed")
        .populate("vacation").exec(function (err, ressss) {
          res.json(ressss)
        })
    }
  }

  PUT(model, params, req, res) {
    if (!params.modelID) {
      res.json({ "ERROR": "Inget eller ogiltigt modelID" })
    }

    model.findByIdAndUpdate(params.modelID, params, { new: true }, function (err, result) {
      if (err) { console.log(err) }

      res.json(result);
    });
  }

  DELETE(model, params, req, res) {
    if (!params.modelID) {
      res.json({ "ERROR": "Inget eller ogiltigt modelID" })
    }

    model.findByIdAndRemove(params.modelID, function (err, result) {
      if (err) { console.log(err) }
      res.json({ 'ok': 'raderat' });
    });
  }

  READ(id, table, callback) {
    if(id){
      this.SQL.connect().query("SELECT * FROM " + table + " WHERE id = ?", id, (err, rows, fields) => {
        callback(err, rows, fields);
      });
    }else{
      this.SQL.connect().query("SELECT * FROM " + table, (err, rows, fields) => {
        callback(err, rows, fields);
      });
    }
  }

  CREATE(data, table, callback) {
    this.SQL.connect().query("INSERT INTO " + table + " SET ?", data, (err, status) => {
      callback(err, status);
    });
  }

  UPDATE(id, data, table, callback) {
    this.SQL.connect().query("UPDATE " + table + " SET ? WHERE id = ?", [data, id], (err, status) => {
      callback(err, status);
    });
  }

  DELEETEE(id, table, callback) {
    this.SQL.connect().query("DELETE FROM " + table + " WHERE id = ?", id, (err, status) => {
      callback(err, status);
    });
  }
};