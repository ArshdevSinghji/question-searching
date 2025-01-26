const mongoose = require("mongoose");

const contentOnlySchema = new mongoose.Schema({
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

module.exports = mongoose.model("ContentOnly", contentOnlySchema);