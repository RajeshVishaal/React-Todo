import React, { useEffect, useRef } from "react";
import { useState } from "react";
import EditTodo from "./EditTodo";

export default function Todo() {
  const [inputText, setInputText] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editFlag, setEditFlag] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [view, setView] = useState({
    completed: false,
    pending: false,
    all: false,
  });

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    setTodoList([
      ...todoList,
      {
        text: inputText,
        id: "id" + Math.random().toString(16).slice(2),
        completed: false,
      },
    ]);
    setInputText("");
  };

  const updateTodo = (props) => {
    setTodoList(props);
  };

  const cancelEdit = (props) => {
    setEditFlag(editFlag.filter((item) => item !== props));
  };

  const deleteTodo = (props) => {
    console.log(props);
    const updatedTodo = todoList.filter((todo) => todo.id !== props);
    setTodoList(updatedTodo);
  };

  const completedTodos = (props) => {
    const updateCompletedTodos = todoList
      .filter((todo) => todo.id === props && !completedList.includes(props))
      .map((todo) => todo.id);
    setCompletedList([...completedList, ...updateCompletedTodos]);
  };

  const getDataFromLocalStorage = () => {
    const items = JSON.parse(localStorage.getItem("todolist"));
    setTodoList([...items]);
  };
  const saveDataToLocalStorage = () => {
    localStorage.setItem("todolist", JSON.stringify(todoList));
  };

  return (
    <div>
      {/* Add Handler */}
      <div>
        <h2>Create Todo </h2>
        <form onSubmit={addTodo}>
          <input
            type="text"
            ref={inputRef}
            placeholder="Things to do.."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button className="buttonMargin" onClick={addTodo}>
            Add
          </button>
        </form>
      </div>
      <button className="buttonMargin" onClick={getDataFromLocalStorage}>
        Get todos
      </button>
      <button className="buttonMargin" onClick={saveDataToLocalStorage}>
        Save todos
      </button>
      {/* Checkbox  */}
      <div>
        <label htmlFor="All">
          <input
            type="checkbox"
            id="All"
            onClick={() => setView({ ...view, all: !view })}
          />{" "}
          All
        </label>
        <label htmlFor="pending">
          <input
            type="checkbox"
            id="pending"
            onClick={() => setView({ ...view, pending: !view })}
          />{" "}
          Pending
        </label>
        <label htmlFor="completed">
          <input
            type="checkbox"
            id="completed"
            onClick={() => setView({ ...view, completed: true })}
          />{" "}
          Completed
        </label>
      </div>

      <h2> Todos</h2>
      {todoList.map((todo) => {
        return editFlag.includes(todo.id) ? (
          // Input field for updating the value
          <EditTodo
            todo={todo}
            todoList={todoList}
            updateTodo={updateTodo}
            cancelEdit={cancelEdit}
          />
        ) : (
          // Renders Todo List
          <div key={todo.id}>
            <span>{todo.text}</span>
            <button
              className="buttonMargin"
              onClick={() => setEditFlag([...editFlag, todo.id])}
            >
              Update
            </button>
            <button
              className="buttonMargin"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
            <button
              className="buttonMargin"
              onClick={() => completedTodos(todo.id)}
            >
              Completed
            </button>
          </div>
        );
      })}
    </div>
  );
}
