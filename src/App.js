import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [portfolio, setPortfolio] = useState([]);

  // ✅ BACKEND URLS
  const TODO_API = "https://todo-list-lb6g.onrender.com";
  const PORTFOLIO_API = "https://portfolio-service-xyh2.onrender.com";

  // ✅ Fetch todos
  useEffect(() => {
    fetch(`${TODO_API}/todos`)
      .then((res) => res.json())
      .then(setTodos)
      .catch((err) => console.error("Failed to fetch todos:", err));
  }, []);

  // ✅ Fetch portfolio projects
  useEffect(() => {
    fetch(`${PORTFOLIO_API}/projects`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.projects)) {
          setPortfolio(data.projects);
        } else {
          setPortfolio([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch projects:", err);
        setPortfolio([]);
      });
  }, []);

  // ✅ Add todo
  const addTodo = () => {
    if (!task.trim()) return;

    const newTodo = {
      id: todos.length + 1,
      task,
      completed: false,
    };

    fetch(`${TODO_API}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    }).then(() => {
      setTodos([...todos, newTodo]);
      setTask("");
    });
  };

  return (
    <div style={{ padding: 20, color: "white", background: "#111", minHeight: "100vh" }}>
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
              <strong>{p.name}</strong> — {p.description}{" "}
              {p.live_url && (
                <a
                  href={p.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginLeft: 8 }}
                >
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
