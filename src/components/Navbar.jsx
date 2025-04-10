import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import "./Styles/Navbar.css";
import profileIcon from "../assets/profile-image.png";
import profile24 from "../assets/profileIcon-24.png";
import logoutIcon from "../assets/logout.png";
import dashboardIcon from "../assets/dashboard.png";
import attendanceIcon from "../assets/attendance.png";
import leaveRecordIcon from "../assets/leaveRecord.png";
import leaveIcon from "../assets/leave.png";
import employeesIcon from "../assets/employees.png";
import projectsIcon from "../assets/projects.png";
import hamIcon from "../assets/hamburger-icon.png";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoggedIn, setToken } from "../Slices/AuthSlice";
import { setEmployee, setProfilePicture } from "../Slices/EmployeeSlice";
import axios from "axios";
import MyScaleLoader from "./Loaders/ScaleLoader.jsx";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const profilePicture = useSelector((state) => state.employee.profilePicture);
  const employee = useSelector((state) => state.employee.employee);
  const axiosBaseURL =
    "https://employee-management-server-f7k2.onrender.com/api";

  const handleLogout = () => {
    dispatch(setLoggedIn(false));
    dispatch(setToken(null));
    localStorage.setItem("loggedIn", false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("totalTime");
    localStorage.removeItem("swipedIn");
    navigate("/");
  };

  useEffect(() => {
    // Fetch employee details and profile picture when the component mounts
    const fetchEmployeeDetails = async () => {
      try {
        const options = {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };

        // Fetch employee details
        const employeeResponse = await axios.get(
          `${axiosBaseURL}/user/getemployee`,
          options
        );
        dispatch(setEmployee(employeeResponse.data.user));
        console.log(employeeResponse.data.user);

        // Fetch profile picture
        const profileResponse = await axios.get(
          `${axiosBaseURL}/user/getprofilepicture`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            responseType: "blob",
          }
        );

        if (profileResponse.data instanceof Blob) {
          const imageUrl = URL.createObjectURL(profileResponse.data);
          dispatch(setProfilePicture(imageUrl));
        }

        // Stop loading after fetching data
        setLoading(false);
      } catch (error) {
        console.error(
          "Error fetching employee details or profile picture:",
          error
        );
        setLoading(false);
      }
    };

    if (localStorage.getItem("authToken")) {
      fetchEmployeeDetails();
    } else {
      setLoading(false); // Stop loading if not authenticated
    }

    return () => {
      if (profilePicture) {
        URL.revokeObjectURL(profilePicture);
      }
    };
  }, [dispatch]);

  if (loading) {
    return (
      // Show a loading indicator while fetching data
      <>
        <div className="col-12 text-center">
          <MyScaleLoader />
        </div>
      </>
    );
  }

  return (
    <nav className="navbar bg-body-tertiary sticky-top">
      <div className="container">
        <button
          className="btn"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span>
            <img src={hamIcon} alt="menus" />
          </span>
        </button>
        <div className="d-flex align-items-center justify-content-center">
          <Link
            className="navbar-brand d-flex align-items-center justify-content-around gap-3"
            to="/myprofile"
          >
            <div className="profile-icon">
              <img
                src={profilePicture || profileIcon}
                alt=""
                className="nav-profile-picture"
              />
            </div>
            <div className="d-flex flex-column">
              <span>{employee.name}</span>
              <span className="fs-6 muted">{employee.designation}</span>
            </div>
          </Link>
          <div className="btn me-3 fs-5" onClick={handleLogout}>
            <img src={logoutIcon} alt="" /> Logout
          </div>
        </div>
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Navbar
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav align-items-start m-auto justify-content-end flex-grow-1 text-start">
              <li className="nav-item mx-2 mb-3 fs-5 col-12">
                <Link
                  className={`nav-link ${(isActive) => {
                    isActive ? "btn-custom" : "";
                  }}`}
                  aria-current="page"
                  to="/dashboard"
                >
                  <img src={dashboardIcon} alt="logout-icon" className="me-3" />
                  Dashboard
                </Link>
              </li>
              <li className="nav-item mx-2 mb-3 fs-5 col-12">
                <Link
                  className={`nav-link ${(isActive) => {
                    isActive ? "btn-custom" : "";
                  }}`}
                  to="/myprofile"
                >
                  <img src={profile24} alt="logout-icon" className="me-3" />
                  My Profile
                </Link>
              </li>
              <li className="nav-item mx-2 mb-3 fs-5 col-12">
                <Link
                  className={`nav-link ${(isActive) => {
                    isActive ? "btn-custom" : "";
                  }}`}
                  to="/Attendance"
                >
                  <img
                    src={attendanceIcon}
                    alt="logout-icon"
                    className="me-3"
                  />
                  Attendance
                </Link>
              </li>
              <li className="nav-item mx-2 mb-3 fs-5 col-12">
                <Link
                  className={`nav-link ${(isActive) => {
                    isActive ? "btn-custom" : "";
                  }}`}
                  to="LeaveRecords"
                >
                  <img
                    src={leaveRecordIcon}
                    alt="logout-icon"
                    className="me-3"
                  />
                  Leave Records
                </Link>
              </li>
              <li className="nav-item mx-2 mb-3 fs-5 col-12">
                <Link
                  className={`nav-link ${(isActive) => {
                    isActive ? "btn-custom" : "";
                  }}`}
                  to="/Applyleave"
                >
                  <img src={leaveIcon} alt="logout-icon" className="me-3" />
                  Apply Leave
                </Link>
              </li>
              <li className="nav-item mx-2 mb-3 fs-5 col-12">
                <Link
                  className={`nav-link ${(isActive) => {
                    isActive ? "btn-custom" : "";
                  }}`}
                  to="/Employees"
                >
                  <img src={employeesIcon} alt="logout-icon" className="me-3" />
                  Employees
                </Link>
              </li>
              <li className="nav-item mx-2 mb-3 fs-5 col-12">
                <Link
                  className={`nav-link ${(isActive) => {
                    isActive ? "btn-custom" : "";
                  }}`}
                  to="/Projects"
                >
                  <img src={projectsIcon} alt="logout-icon" className="me-3" />
                  Projects
                </Link>
              </li>
              <li className="nav-item mx-2 mb-3 fs-5 col-12">
                <button
                  className="nav-link col-12 text-start"
                  onClick={handleLogout}
                >
                  <img src={logoutIcon} alt="logout-icon" className="me-3" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
