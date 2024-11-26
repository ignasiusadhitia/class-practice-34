import React from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { useDispatch, useSelector } from "react-redux";
import { setLang } from "./redux/slices/langSlice";

const App = () => {
  const { lang } = useSelector((state) => state.lang);
  const dispatch = useDispatch();

  const toggleLang = () => {
    dispatch(setLang(lang === "en" ? "id" : "en"));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <div className="d-flex justify-content-end gap-3 mb-5">
                <button
                  className="btn btn-sm btn-dark"
                  onClick={toggleLang}
                  cy-data="lang-button"
                >
                  {lang === "en" ? "ID" : "EN"}
                </button>
              </div>
              <h1 className="card-title text-center mb-4" cy-data="app-title">
                {lang === "en" ? "To-Do List" : "Daftar to-Do"}
              </h1>
              <TodoInput />
              <TodoList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
