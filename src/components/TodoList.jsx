// import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import {
//   currentTodo,
//   deleteTodo,
//   fetchTodos,
//   toggleTodo,
// } from "../redux/async/todosSlice";

import {
  currentTodo,
  deleteTodo,
  toggleTodo,
} from "../redux/slices/todosSlice";

const TodoList = () => {
  // const { todos, loading, error, isSuccess } = useSelector(
  //   (state) => state.todos
  // );

  const todos = useSelector((state) => state.todos.todos);
  const { lang } = useSelector((state) => state.lang);
  const dispatch = useDispatch();

  const handleDelete = (e, id) => {
    e.stopPropagation();
    dispatch(deleteTodo(id));
  };

  const handleCurrentTodo = (e, todo) => {
    e.stopPropagation();
    dispatch(currentTodo(todo));
  };

  // useEffect(() => {
  //   dispatch(fetchTodos());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (isSuccess) {
  //     dispatch(fetchTodos());
  //   }
  // }, [dispatch, isSuccess]);

  // if (loading) {
  //   return <p className="alert alert-secondary text-center">Loading...</p>;
  // }

  // if (error) {
  //   return <p className="alert alert-danger text-center">{error}</p>;
  // }

  if (todos.length === 0) {
    return (
      <p className="alert alert-secondary text-center" cy-data="no-tasks">
        {lang === "en" ? "No tasks found" : "Tugas tidak ditemukan"}.
      </p>
    );
  }

  return (
    <ul className="list-group">
      {todos?.map((todo) => (
        <li
          key={todo.id}
          className={`list-group-item d-flex justify-content-between align-items-center ${
            todo.completed ? "list-group-item-secondary" : ""
          }`}
          onClick={() => dispatch(toggleTodo(todo.id))}
        >
          <span
            style={{
              cursor: "pointer",
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}
          </span>
          <div className="d-flex gap-3">
            <button
              className="btn btn-warning btn-sm"
              onClick={(e) => handleCurrentTodo(e, todo)}
              cy-data="edit-button"
            >
              {lang === "en" ? "Edit" : "Perbarui"}
            </button>

            <button
              className="btn btn-danger btn-sm"
              onClick={(e) => handleDelete(e, todo.id)}
              cy-data="delete-button"
            >
              {lang === "en" ? "Delete" : "Hapus"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
