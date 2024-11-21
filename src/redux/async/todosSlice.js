import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/todos";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  const response = await axios.post(API_URL, todo);
  return response.data;
});

export const toggleTodo = createAsyncThunk("todos/toggleTodo", async (todo) => {
  const response = await axios.patch(`${API_URL}/${todo.id}`, {
    completed: !todo.completed,
  });
  return response.data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

export const updateTodo = createAsyncThunk("todos/updateTodo", async (todo) => {
  const response = await axios.put(`${API_URL}/${todo.id}`, todo);
  return response.data;
});

const initialState = {
  todos: [],
  todo: {},
  isUpdate: false,
  loading: false,
  error: null,
  isSuccess: false,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    currentTodo: (state, action) => {
      state.isUpdate = true;
      state.todo = action.payload;
    },
    resetTodo: (state) => {
      state.isUpdate = false;
      state.todo = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = false;
      state.todos = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });
    // Add todo
    builder.addCase(addTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addTodo.fulfilled, (state) => {
      state.loading = false;
      state.isSuccess = true;
    });
    builder.addCase(addTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });
    // Toggle todo
    builder.addCase(toggleTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(toggleTodo.fulfilled, (state) => {
      state.loading = false;
      state.isSuccess = true;
    });
    builder.addCase(toggleTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });
    // Delete todo
    builder.addCase(deleteTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTodo.fulfilled, (state) => {
      state.loading = false;
      state.isSuccess = true;
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });
    // Update todo
    builder.addCase(updateTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTodo.fulfilled, (state) => {
      state.loading = false;
      state.isSuccess = true;
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });
  },
});

export const { currentTodo, resetTodo } = todosSlice.actions;
export default todosSlice.reducer;
