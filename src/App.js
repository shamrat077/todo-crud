import "./App.css";
import { useState } from "react";

function App() {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [isEditalbe, setIsEditable] = useState(false);
  const [toBeUpdatedTitle, setToBeUpDatedTitle] = useState(null);

  const createHandler = (event) => {
    event.preventDefault();
    if (todoTitle) {
      const newTodoTitle = {
        id: Date.now(),
        title: todoTitle,
      };
      setTodoList([newTodoTitle, ...todoList]);
      setTodoTitle("");
    }
  };

  const editHandler = (id) => {
    setIsEditable(true);
    const toBeEdited = todoList.find((task) => task.id === id);
    setToBeUpDatedTitle(toBeEdited);
    setTodoTitle(toBeEdited.title);
  };

  const upDateHadler = (event) => {
    event.preventDefault();
    toBeUpdatedTitle.title = todoTitle;
    setToBeUpDatedTitle(null);
    setTodoTitle("");
    setIsEditable(false);
  };

  const deleteHandler = (id) => {
    if (isEditalbe) {
      const newTodoList = todoList.filter((task) => task.id !== id);
      setTodoList(newTodoList);
      setIsEditable(false);
      setTodoTitle("");
    }
    const newTodoList = todoList.filter((task) => task.id !== id);
    setTodoList(newTodoList);
  };

  return (
    <div className="App">
      <form className="app__form">
        <input
          value={todoTitle}
          onChange={(event) => setTodoTitle(event.target.value)}
          type="text"
          name=""
          className="app__input form-control"
        />
        <button
          onClick={
            isEditalbe
              ? (event) => upDateHadler(event)
              : (event) => createHandler(event)
          }
          className={
            isEditalbe ? "app__btn btn btn-warning" : "app__btn btn btn-success"
          }
        >
          {isEditalbe ? "UPDATE" : "ADD"}
        </button>
      </form>

      <ul className="app__list">
        {todoList.map((task) => (
          <li>
            <span>{task.title}</span>
            <button
              onClick={() => editHandler(task.id)}
              className="app__btn--edit btn btn-info"
            >
              Edit
            </button>
            <button
              onClick={() => deleteHandler(task.id)}
              className="app__btn--delete btn btn-danger"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
