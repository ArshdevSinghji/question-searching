const mongoose = require("mongoose");

const readAlongSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  siblingId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  title: {
    type: String,
  },
});

module.exports = mongoose.model("ReadAlong", readAlongSchema);
