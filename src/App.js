import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [portfolio, setPortfolio] = useState([]);
  const API_URL = "https://todo-backend-q3d3.onrender.com";

  // Fetch todos
  useEffect(() => {
    fetch(`${API_URL}/todos`)
      .then((res) => res.json())
      .then(setTodos);
  }, []);

  // Fetch portfolio items
  useEffect(() => {
    fetch(`${API_URL}/portfolio`)
      .then((res) => res.json())
      .then(setPortfolio);
  }, []);

  const addTodo = () => {
    const newTodo = { id: todos.length + 1, task, completed: false };
    fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    }).then(() => {
      setTodos([...todos, newTodo]);
      setTask("");
    });
  };

  return (
    <div style={{ padding: 20, color: "white", background: "#111" }}>
      <h1>Simple To-Do List</h1>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>{t.task}</li>
        ))}
      </ul>

      <hr style={{ margin: "40px 0", borderColor: "#444" }} />

      <h1>Portfolio Projects</h1>
      {portfolio.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        <ul>
          {portfolio.map((p) => (
            <li key={p.id}>
              <strong>{p.name}</strong>: {p.description}{" "}
              {p.link && (
                <a href={p.link} target="_blank" rel="noopener noreferrer">
                  Live Demo
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
