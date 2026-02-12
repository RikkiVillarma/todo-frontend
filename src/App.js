import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const API_URL = "https://todo-backend-q3d3.onrender.com";//some comment

  useEffect(() => {
    fetch(`${API_URL}/todos`) // update after deployment
      .then((res) => res.json())
      .then(setTodos);
  }, []);

  const addTodo = () => {
    const newTodo = { id: todos.length + 1, task, completed: false };
    fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo)
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
    </div>
  );
}

export default App;
