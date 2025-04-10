import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import emailicon from "../assets/email.png";
import passwordicon from "../assets/password.png";
import usernameicon from "../assets/username.png";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const axiosBaseURL = "https://employee-management-server-f7k2.onrender.com/api";
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSignup = async (values, { resetForm }) => {
    try {
      setLoading(true);

      const options = {
        name: values.username.trim(),
        email: values.email.trim(),
        password: values.password.trim(),
      };

      const response = await axios.post(`${axiosBaseURL}/user/register`, options, {
        validateStatus: (status) => {
          return status < 500; //Reject only if the status code is greater than or equal to 500
        }
      });

      console.log(response);

      if (response.status === 201) {
        toast.success("user registered successfully, proceed to Login", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          pauseOnHover: false,
          draggable: true,
          proggress: 1,
          theme: "colored",
          transistion: "slide",
        });
        resetForm();
        setLoading(false)
      } else {
        setLoading(false)
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          pauseOnHover: false,
          draggable: true,
          progress: 0,
          theme: "colored",
        });
      }
    } catch (error) {
      setLoading(false)
      toast.error(error, {
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
        onSubmit={handleSignup}
      >
        <Form className="container d-flex flex-column justify-content-center align-items-center form">
          <div className="col-12 my-4 fs-5 d-flex flex-column justify-content-center align-items-center">
            <div className="d-flex col-12">
              <label htmlFor="username" className="col-1">
                <img src={usernameicon} alt="usernameicon" className="icon" />
              </label>
              <Field
                type="username"
                className="ms-4 col-10 rounded p-1 ps-2"
                name="username"
                placeholder="username"
              ></Field>
            </div>
            <ErrorMessage
              name="username"
              component="span"
              className="text-danger"
            ></ErrorMessage>
          </div>
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
          <div className="col-12 my-4 fs-5 d-flex justify-content-center align-items-baseline">
            <Field type="checkbox" className="me-2" name="checkbox"></Field>
            <div>Register me as Admin</div>
          </div>
          <button
            type="submit"
            className="col-6 align-self-center btn btn-custom my-2 fs-5"
          >
            Sign Up
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default Signup;
