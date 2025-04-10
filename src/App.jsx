import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import "./App.css";
import ApplyLeave from "./components/ApplyLeave.jsx";
import Attendance from "./components/Attendance.jsx";
import Auth from "./components/Auth.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Employees from "./components/Employees.jsx";
import LeaveRecords from "./components/LeaveRecords.jsx";
import Projects from "./components/Projects.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyProfile from "./components/MyProfile.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          theme="colored"
        />
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route element={<Sidebar />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/ApplyLeave" element={<ApplyLeave />}></Route>
            <Route path="/LeaveRecords" element={<LeaveRecords />}></Route>
            <Route path="/Projects" element={<Projects />}></Route>
            <Route path="/Employees" element={<Employees />}></Route>
            <Route path="/Attendance" element={<Attendance />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
