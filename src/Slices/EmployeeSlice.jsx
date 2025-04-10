import { createSlice } from "@reduxjs/toolkit";

// Define the employee slice
const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employee: {}, // Change to an object to hold employee details
    profilePicture: null,
  },
  reducers: {
    // Action to set the employee details
    setEmployee: (state, action) => {
      state.employee = action.payload;
    },
    // Action to set the profile picture
    setProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
    },
  },
});

// Export the actions
export const { setEmployee, setProfilePicture } = employeeSlice.actions;

// Selectors to access state
export const selectEmployee = (state) => state.employee.employee;
export const selectProfilePicture = (state) => state.employee.profilePicture;

// Export the reducer to be used in the store configuration
export default employeeSlice.reducer;
