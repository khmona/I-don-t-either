var Schema = m.mongoose.Schema({
  uName: {type: String, required: true},
  passW: {type: String, required: true}
});

module.exports = m.mongoose.model("users", Schema);