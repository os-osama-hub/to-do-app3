import { use, useEffect, useState } from "react";
import "./App.css";
import { Button, TextField } from "@mui/material";

function App() {
  const lightTheme = {
    background: "bg-gradient-to-r from-blue-50 to-indigo-100",
    text: "text-indigo-900",
    card: "bg-white",
    cardBorder: "border-indigo-200",
    button: "bg-indigo-600 hover:bg-indigo-700 text-white",
    inputBg: "bg-white",
    todoItem: "bg-white hover:bg-indigo-50 border-indigo-100",
  };

  const darkTheme = {
    background: "bg-gradient-to-r from-gray-900 to-indigo-950",
    text: "text-indigo-100",
    card: "bg-gray-800",
    cardBorder: "border-indigo-900",
    button: "bg-indigo-600 hover:bg-indigo-500 text-white",
    inputBg: "bg-gray-700 text-white",
    todoItem: "bg-gray-800 hover:bg-gray-700 border-indigo-800",
  };
  const [disabled, setDisabled] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState(() => {
    //defult value for todos its the value in local storage
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme");
  });
  const [err, setErr] = useState("");

  // Define theme color variables

  // Get current theme colors
  const colors = theme === "light" ? lightTheme : darkTheme;

  const handleAdd = () => {
    if (!name.trim() || !title.trim()) {
      setErr("Please enter both name and title");
      return;
    }
    setTodos((prev) => [
      ...prev,
      { name: name, title: title, completed: false },
    ]);
    setName("");
    setTitle("");
    setErr("");
  };

  const handleToggleComplete = (index) => {
    //افهمها
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed; //خلي عكس وضعها عشان يشتغل اللاين ع الانديكس المحدد
    setTodos(newTodos);
  };

  const handleDelItem = (index) => {
    setTodos(todos.filter((item) => item !== todos[index]));
  };

  const handleDelAll = () => {
    setTodos([]);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={`min-h-screen ${colors.background} ${colors.text} p-4`}>
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-end mb-4">
          <button
            className={`px-4 py-2 rounded-lg ${colors.button} transition-colors`}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>

        <div
          className={`rounded-xl ${colors.card} shadow-lg border ${colors.cardBorder} p-6`}
        >
          <h1 className="text-3xl font-bold text-center mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              Todo App
            </span>
          </h1>
          {err && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <span className="block sm:inline">{err}</span>
            </div>
          )}

          <div className="space-y-4 mb-8">
            <div>
              <label className="block mb-2 font-medium">Task Name</label>
              <TextField
                required
                fullWidth
                variant="outlined"
                placeholder="Enter task name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                InputProps={{
                  className: colors.inputBg,
                }}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Task Description</label>
              <TextField
                required
                fullWidth
                variant="outlined"
                placeholder="Enter task description"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()} //تكافئ الملاحظه ولكنها بطريقة افضل وهو المطلوب
                // onKeyDown={(e) => {if (e.key === "Enter") { handleAdd(); }
                InputProps={{
                  className: colors.inputBg,
                }}
              />
            </div>

            <div className="flex justify-center mt-6">
              <button
                disabled={disabled}
                onClick={handleAdd}
                className={`px-6 py-2 rounded-lg ${colors.button} transition-colors disabled:opacity-50`}
              >
                Add Task
              </button>
            </div>
          </div>

          {todos.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
              <div className="grid grid-cols-1 break-words md:grid-cols-2 lg:grid-cols-3 gap-4">
                {todos.map((item, index) => (
                  <div
                    key={index}
                    className={`rounded-lg border ${colors.todoItem} p-4 transition-all`}
                  >
                    <div
                      className="cursor-pointer"
                      onClick={() => handleToggleComplete(index)}
                    >
                      <h3
                        className={`font-medium mb-1 ${
                          item.completed ? "line-through opacity-60" : ""
                        }`}
                      >
                        {item.name}
                      </h3>
                      <p
                        className={`text-sm mb-3 ${
                          item.completed ? "line-through opacity-60" : ""
                        }`}
                      >
                        {item.title}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelItem(index)}
                      className="text-sm px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>

              {todos.length > 1 && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleDelAll}
                    className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
                  >
                    Delete All Tasks
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
