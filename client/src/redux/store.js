import { configureStore } from "@reduxjs/toolkit";
// Importa tus reducers aquí
import userReducer from "../redux/slices/auth.reducer"

const store = configureStore({
  reducer: {
    // Agrega tus reducers aquí
    user: userReducer,
  },
});

export default store;