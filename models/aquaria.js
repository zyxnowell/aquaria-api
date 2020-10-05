const mongoose = require("mongoose");

const mongoosePaginate = require("mongoose-paginate-v2");

const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  scientificName: {
    type: String,
  },
  minimumTankSize: {
    type: String,
  },
  temperament: {
    type: String,
  },
  details: {
    type: String,
  },
});
schema.plugin(mongoosePaginate);

const Aquaria = mongoose.model("Aquaria", schema);

module.exports = {
  Aquaria,
};