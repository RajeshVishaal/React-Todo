import React, { useEffect, useState } from "react";

export default function EditTodo(props) {
  const [editInput, setEditInput] = useState({ text: "", id: "" });

  useEffect(() => {
    setEditInput({ id: props.todo.id, text: props.todo.text });
  }, []);

  const updateTodo = (editInput) => {
    console.log(editInput);
    const updatedTodo = props.todoList.map((todo) => {
      if (todo.id === editInput.id) {
        return { ...todo, text: editInput.text };
      }
      return todo;
    });
    props.updateTodo(updatedTodo);
    props.cancelEdit(editInput.id);
  };

  return (
    <div>
      <input
        type="text"
        value={editInput.text}
        onChange={(e) => setEditInput({ ...props.todo, text: e.target.value })}
      />
      <button className="buttonMargin" onClick={() => updateTodo(editInput)}>
        Update
      </button>
      <button
        className="buttonMargin"
        onClick={() => props.cancelEdit(editInput.id)}
      >
        Cancel
      </button>
    </div>
  );
}
