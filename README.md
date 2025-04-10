
# Employee Management Frontend 🎯

This is the frontend application for the Employee Management System, built to manage employee profiles, attendance, leaves, and projects. The application interacts with the backend API to provide a seamless user experience.

## 🚀 Features

- **Employee Dashboard** 📊: View employee details, attendance, leave records, and projects at a glance.
- **Profile Management** 🖼️: Update your profile picture and personal details.
- **Attendance Management** ⏱️: Record and view attendance for each day.
- **Leave Records** 🏝️: Apply for leave, view leave history, and track approvals.
- **Employee Directory** 👥: Browse the list of all employees in the system.
- **Project Management** 📁: Track and manage ongoing projects.
- **User Authentication** 🔐: Secure login with JWT-based authentication.
- **Responsive Design** 📱: Optimized for all devices, including desktops and mobiles.

## 🛠️ Tech Stack

- **React** ⚛️: The entire frontend is built with React, leveraging hooks for state management.
- **Redux** 🗂️: Used for managing global state (authentication, employee data).
- **Axios** 📡: For making HTTP requests to the backend API.
- **React Router** 🛣️: To handle navigation and routing between different pages.
- **Bootstrap** 💄: Used for styling and responsive layout.
- **Netlify** 🌐: Deployed on Netlify for a fast and reliable hosting experience.


## 🔧 API Endpoints

This project interacts with a backend server deployed on Render. Below are the Major - key endpoints used:

- **Authentication**:
  - POST /api/auth/login: To log in and receive a JWT token.
- **Employee Management**:
  - GET /api/user/getemployee: Fetch employee data.
  - GET /api/user/getprofilepicture: Fetch the profile picture of the logged-in user.
- **Attendance Management**:
  - POST /api/user/attendance/attendancerecord: Get attendance records.
  - POST /api/user/attendance/toggleswipestatus: marks attendance for the user (toggles active state of the user in the site)
- **Leave Management**:
  - GET /api/user/leave: Fetch leave records for the logged-in user.
  - POST /api/user/applyleave: Apply leave for the user with provided details


You can visit the deployed website [here](https://employee-management-dashboard-dev-it.netlify.app)
