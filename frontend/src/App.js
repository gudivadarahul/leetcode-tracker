import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [problems, setProblems] = useState([]);
  const [newProblem, setNewProblem] = useState({ title: "", difficulty: "" });

  useEffect(() => {
    axios
      .get("/problems")
      .then((response) => setProblems(response.data))
      .catch((error) => console.error("Error fetching the problems!", error));
  }, []);

  const addProblem = () => {
    axios
      .post("/problems", newProblem)
      .then((response) => setProblems([...problems, response.data]))
      .catch((error) =>
        console.error("There was an error adding the problem!", error)
      );
  };

  return (
    <div>
      <h1>LeetCode Tracker</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newProblem.title}
          onChange={(e) =>
            setNewProblem({ ...newProblem, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Difficulty"
          value={newProblem.difficulty}
          onChange={(e) =>
            setNewProblem({ ...newProblem, difficulty: e.target.value })
          }
        />
        <button onClick={addProblem}>Add Problem</button>
      </div>
      <ul>
        {problems.map((problem) => (
          <li key={problem._id}>
            {problem.title} - {problem.difficulty}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
