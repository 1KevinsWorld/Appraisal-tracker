import { useSelector } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import "./Styles/Auth.css";
import emailicon from "../assets/email.png";
import passwordicon from "../assets/password.png";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import ButtonLoader from "./Loaders/ButtonLoader";
import { useDispatch } from "react-redux";
import { setLoggedIn, setToken, setSwipedIn } from "../Slices/AuthSlice";
import { setEmployee } from "../Slices/EmployeeSlice";

const Login = () => {
  const axiosBaseURL = "https://employee-management-server-f7k2.onrender.com/api";
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const setSwipeStatus = async (token) => {
    try {
      const options = {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "" },
      };
      const swipeResponse = await axios.post(
        `${axiosBaseURL}/user/attendance/swipestatus`,
        {},
        options
      );

      const swipedInStatus = swipeResponse.data.swipedIn;
      const totalTime = swipeResponse.data.totalTime || 0;
      localStorage.setItem("totalTime", totalTime);
      localStorage.setItem("swipedIn", JSON.stringify(swipedInStatus));
      dispatch(setSwipedIn(JSON.stringify(swipedInStatus)));
      console.log(localStorage.getItem("swipedIn"));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEmployee = async () => {
    try {
      const options = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(
        `${axiosBaseURL}/user/getemployee`,
        options
      );
      dispatch(setEmployee(response.data.employee));
      console.log(response.data.employee);
    } catch (error) {
      console.error("Error fetching employee:", error);
    }
  };

  const handleGuestLogin = async () => {
    const guestCredentials = {
      email: "mukeshkj2912@gmail.com",
      password: "Mukesh@123",
    };
    await handleLogin(guestCredentials);
  };

  const handleLogin = async (values) => {
    try {
      setLoading(true);

      const options = {
        email: values.email.trim(),
        password: values.password.trim(),
      };

      const res = await axios.post(`${axiosBaseURL}/user/login`, options, {
        validateStatus: (status) => {
          return status < 500; //Reject only if the status code is greater than or equal to 500
        },
      });

      if (res.status === 200) {
        dispatch(setLoggedIn(true));
        localStorage.setItem("loggedIn", true);
        dispatch(setToken(res.data.token));
        localStorage.setItem("authToken", res.data.token);
        toast.success("Login successful", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        await setSwipeStatus(res.data.token); // await used because it's an async function that involves an api call
        await fetchEmployee();
        setLoading(false);
        navigate("/dashboard");
      } else {
        setLoading(false);
        setError(res.data.message || "An error occurred");
        toast.error(error || "An error occurred", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: 0,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("A network error occurred. Please try again.");
      toast.error("A network error occurred. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: true,
        progress: 0,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        <Form className="container d-flex flex-column justify-content-center align-items-center form">
          <div className="col-12 my-4 fs-5 d-flex flex-column justify-content-center align-items-center">
            <div className="d-flex col-12">
              <label htmlFor="email" className="col-1">
                <img src={emailicon} alt="emailicon" className="icon" />
              </label>
              <Field
                type="email"
                className="ms-4 col-10 rounded p-1 ps-2"
                name="email"
                placeholder="email"
              ></Field>
            </div>
            <ErrorMessage
              name="email"
              component="span"
              className="text-danger"
            ></ErrorMessage>
          </div>
          <div className="col-12 my-4 fs-5 d-flex flex-column justify-content-center align-items-center">
            <div className="d-flex col-12">
              <label htmlFor="email" className="col-1">
                <img src={passwordicon} alt="emailicon" className="icon" />
              </label>
              <Field
                type="password"
                className="col-10 ms-4 rounded p-1 ps-2"
                name="password"
                placeholder="password"
              ></Field>
            </div>
            <ErrorMessage
              name="password"
              component="p"
              className="text-danger"
            ></ErrorMessage>
          </div>
          <div className="col-12 d-flex justify-content-center gap-4 align-items-center">
            <button
              type="submit"
              className="col-4 align-self-center btn btn-custom my-2"
            >
              {loading ? <ButtonLoader /> : <p className="fs-5 m-0">Login</p>}
            </button>
            <button
              type="button"
              className="col-4 align-self-center btn btn-custom my-2"
              onClick={handleGuestLogin}
            >
              {loading ? (
                <ButtonLoader />
              ) : (
                <p className="fs-5 m-0">Demo</p>
              )}
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default Login;
