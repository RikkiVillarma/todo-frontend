import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [portfolio, setPortfolio] = useState([]);
  const API_URL = "https://todo-list-lb6g.onrender.com"; // updated to your todo-list backend

  // Fetch todos
  useEffect(() => {
    fetch(`${API_URL}/todos`)
      .then((res) => res.json())
      .then(setTodos)
      .catch((err) => console.error("Failed to fetch todos:", err));
  }, []);

  // Fetch portfolio projects
  useEffect(() => {
    fetch(`${API_URL}/projects`) // updated endpoint
      .then((res) => res.json())
      .then((data) => {
        // Handle both [] or {"projects": []} formats
        if (Array.isArray(data)) {
          setPortfolio(data);
        } else if (Array.isArray(data.projects)) {
          setPortfolio(data.projects);
        } else {
          setPortfolio([]); // fallback
        }
      })
      .catch((err) => {
        console.error("Failed to fetch projects:", err);
        setPortfolio([]); // fallback
      });
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
            <li key={p.id || p.name}>
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
