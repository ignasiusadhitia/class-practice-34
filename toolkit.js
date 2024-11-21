import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      // pengganti action
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

const loggerMiddleware = (store) => (next) => (action) => {
  console.log("Action", action);
  next(action);
  console.log("State sekarang", store.getState());
};

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
  // middleware mengembalikan array middleware, untuk menambahkan middleware tinggal concat
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

store.subscribe(() => {
  //   console.log("State sekarang", store.getState());
});

store.dispatch(counterSlice.actions.increment());
store.dispatch(counterSlice.actions.increment());
store.dispatch(counterSlice.actions.decrement());
