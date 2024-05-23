const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Problem = require("./models/Problem");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.post("/problems", async (req, res) => {
  const problem = new Problem(req.body);
  await problem.save();
  res.send(problem);
});

app.get("/problems", async (req, res) => {
  const problems = await Problem.find();
  res.send(problems);
});

app.put("/problems/:id", async (req, res) => {
  const problem = await Problem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(problem);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
