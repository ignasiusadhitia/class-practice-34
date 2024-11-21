import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTodo, resetTodo, updateTodo } from "../redux/async/todosSlice";

const TodoInput = () => {
  const { isUpdate, todo, loading } = useSelector((state) => state.todos);
  const { lang } = useSelector((state) => state.lang);
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text.trim() !== "") {
      if (isUpdate) {
        dispatch(updateTodo({ ...todo, text }));
        dispatch(resetTodo());
      } else {
        dispatch(addTodo({ id: uuidv4(), text, completed: false }));
      }
      setText("");
    }
  };

  useEffect(() => {
    if (todo?.id) {
      setText(todo.text);
    }
  }, [todo]);

  return (
    <div className="mb-3">
      <form className="input-group" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder={
            lang === "en" ? "Add a new task" : "Tambahkan tugas baru"
          }
          value={text}
          required
          onChange={handleInputChange}
        />
        <button
          className={`btn ${isUpdate ? "btn-warning" : "btn-primary"} `}
          type="submit"
          disabled={loading}
        >
          {isUpdate
            ? lang === "en"
              ? "Update"
              : "Perbarui"
            : lang === "en"
            ? "Add"
            : "Tambahkan"}
        </button>
      </form>
    </div>
  );
};

export default TodoInput;
