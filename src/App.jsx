import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import "./App.css";
function App() {
  const [todos, setTodos] = useState([]);
  const [currentTab, setCurrentTab] = useState("all");
  const [newTodo, setNewTodo] = useState("");
  const [showAddSection, setShowAddSection] = useState(true);
  const [selectedTab, setSelectedTab] = useState("all");

  useEffect(() => {
    if (todos.length === 0) return;
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    setTodos(todos || []);
  }, []);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem = {
        id: Date.now(),
        text: newTodo,
        completed: false,
      };

      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const deleteTodo = (todoId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
  };

  const toggleTodoStatus = (todoId) => {
    if (currentTab === "completed" || currentTab === "active") {
      const updatedTodos = todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);
    }
  };

  const showTab = (tab) => {
    setCurrentTab(tab);
    setSelectedTab(tab);
    if (tab === "completed") {
      setShowAddSection(false);
    } else {
      setShowAddSection(true);
    }
  };

  const clearCompleted = () => {
    const updatedTodos = todos.filter((todo) => !todo.completed);
    setTodos(updatedTodos);
  };

  const filteredTodos =
    currentTab === "all"
      ? todos
      : currentTab === "active"
      ? todos.filter((todo) => !todo.completed)
      : currentTab === "completed"
      ? todos.filter((todo) => todo.completed)
      : [];

  return (
    <div className="App">
      <h1>#todo</h1>

      <div className="tabs">
        <a
          className={selectedTab === "all" ? "selected" : ""}
          onClick={() => showTab("all")}
        >
          ALL
        </a>
        <a
          className={selectedTab === "active" ? "selected" : ""}
          onClick={() => showTab("active")}
        >
          Active
        </a>
        <a
          className={selectedTab === "completed" ? "selected" : ""}
          onClick={() => showTab("completed")}
        >
          Completed
        </a>
      </div>

      {showAddSection && (
        <div className="add-todo">
          <input
            className="input"
            type="text"
            placeholder="Add a new todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <Button className="btn-1" as="a" variant="primary" onClick={addTodo}>
            Add
          </Button>
        </div>
      )}

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            <label>
              <input
                className="check"
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodoStatus(todo.id)}
              />
              {todo.text}
            </label>
            {currentTab === "completed" && (
              <Button
                className="btn-2"
                variant="danger"
                onClick={() => deleteTodo(todo.id)}
              >
                <RiDeleteBin6Line />
              </Button>
            )}
          </li>
        ))}
      </ul>

      {currentTab === "completed" && (
        <div className="actions">
          <Button variant="danger" onClick={clearCompleted}>
            <RiDeleteBin6Line />
            delete all
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;
