const mongoose = require("mongoose");

const anagramSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  anagramType: {
    type: String,
  },
  blocks: {
    type: [
      {
        text: {
          type: String,
        },
        showInOption: {
          type: Boolean,
        },
        isAnswer: {
          type: Boolean,
        },
      },
    ],
  },
  siblingId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  solution: {
    type: String,
  },
  title: {
    type: String,
  },
});

module.exports = mongoose.model("Anagram", anagramSchema);