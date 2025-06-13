import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import RandomImage from "./Randomimage";

const App = () => {
  const [task, setTask] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const inputRef = useRef(null);

  function handleAddTask() {
    if (newTaskText.trim() !== "") {
      setTask([...task, { text: newTaskText.trim(), completed: false }]);
      setNewTaskText("");
      setIsPopupOpen(false);
    }
  }

  function toggleTask(index) {
    const updatedTasks = [...task];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTask(updatedTasks);
  }

  useEffect(() => {
    if (isPopupOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isPopupOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsPopupOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="App">
      <div className="background-image">
        <RandomImage />
        <div className="blur-overlay" />
      </div>

      <div className="center-content">
        <div className="todo-base">
          <div className="title">
            <h1>Todo Buddy</h1>
          </div>

          <div className="task-list">
            {task.map((t, index) => (
              <div className="task-item" key={index}>
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggleTask(index)}
                />
                <span
                  style={{
                    textDecoration: t.completed ? "line-through" : "none",
                    color: t.completed ? "#999" : "#000",
                  }}
                >
                  {t.text}
                </span>
              </div>
            ))}

            {task.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  color: "#666",
                  marginTop: "10px",
                }}
              >
                No tasks yet. Add one!
              </div>
            )}
          </div>

          <div className="add-task">
            <button onClick={() => setIsPopupOpen(true)}>ADD NEW TASK</button>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <>
          <div
            className="popup-overlay"
            onClick={() => setIsPopupOpen(false)}
          />
          <div className="pop-up animated-popup">
            <input
              ref={inputRef}
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddTask();
              }}
              placeholder="Add a new task"
            />
            <button onClick={handleAddTask}>ADD</button>
            <button onClick={() => setIsPopupOpen(false)}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
