import React, { useEffect, useState } from "react";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import axios from "axios";
import loginBg from "../assets/loginBg.png";
import signupBg from "../assets/signupBg.png";
import "../components/Styles/Auth.css";

const Auth = () => {
  const [action, setAction] = useState("Login");
  const [animate, setAnimate] = useState("slide-in");
  const axiosBaseURL = "https://employee-management-server-f7k2.onrender.com"
  const firstFetch = async () => {
    const res = await axios.get(`${axiosBaseURL}/`);
    console.log(res.data.message);
  };

  const toggleAction = (newAction) => {
    setAnimate("slide-out"); // Start slide-out animation
    setTimeout(() => {
      setAction(newAction);
      setAnimate("slide-in"); // Start slide-in animation after timeout
    }, 500); // Match this duration with your animation-duration
  };

  useEffect(() => {
    firstFetch();
    setAction("Login");
  }, []);

  return (
    <>
      <div
        className={`Auth-blob-bg col-12 d-flex justify-content center align-itemns-center ${
          action === "Login" ? "flex-row-reverse" : ""
        }`}
      >
        <div className="container auth-page col-12 col-md-6 col-lg-4 d-flex flex-column justify-content-center align-items-center">
          <div className="col-12 border border-dark p-3 rounded">
            <div className="col-12 d-flex">
              <div
                className={`col-6 btn fs-4 text-center ${
                  action == "Login" ? "text-secondary" : "active-action-btn"
                }`}
                onClick={() => toggleAction("SignUp")}
              >
                Sign Up
              </div>
              <div
                className={`col-6 btn fs-4 border-bottom-primary text-center ${
                  action == "Login" ? "active-action-btn" : "text-secondary"
                }`}
                onClick={() => toggleAction("Login")}
              >
                Login
              </div>
            </div>
            <div className={`col-12 my-3 Auth ${animate}`}>
              {action == "Login" ? <Login /> : <Signup />}
            </div>
          </div>
        </div>
        <img
          src={action === "Login" ? loginBg : signupBg}
          alt="Auth image"
          className={`container img-fluid col-md-6 d-none d-md-block ${
            action === "Login" ? "me-0" : "ms-0"
          }`}
        />
      </div>
    </>
  );
};

export default Auth;
