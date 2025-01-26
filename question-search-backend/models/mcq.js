const mongoose = require("mongoose");

const mcqSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  options: {
    type: [
      {
        text: {
          type: String,
        },
        isCorrectAnswer: {
          type: Boolean,
        },
      },
    ],
  },
  siblingId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  title: {
    type: String,
  },
});

module.exports = mongoose.model("MCQ", mcqSchema);