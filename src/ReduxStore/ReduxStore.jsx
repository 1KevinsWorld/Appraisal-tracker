import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slices/AuthSlice.jsx";
import employeeReducer from "../Slices/EmployeeSlice.jsx";

const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
  },
});

export default store;
