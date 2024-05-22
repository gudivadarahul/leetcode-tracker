const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  timeSpent: { type: Number, required: true },
});

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  difficulty: { type: String, required: true },
  lastPracticed: { type: Date, default: Date.now },
  nextPractice: { type: Date, default: () => Date.now() },
  status: {
    type: String,
    enum: ["new", "in progress", "completed"],
    default: "new",
  },
  attempts: [attemptSchema],
});

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;


