'use strict';

module.exports = function(DB) {

  var carModel = DB.getModel("cars");
  
  carModel.find(function(error, result){
    
    if(error){console.log(error)}
 
  }).populate("damages").exec(function(err, res){
    return res
  })
  return
};




