import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import profileIcon from "../assets/username.png";
import "./Styles/MyProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { setProfilePicture, setEmployee } from "../Slices/EmployeeSlice.jsx";
import userNameIcon from "../assets/employeeDetailsIcons/userName-icon.png";
import emailIcon from "../assets/employeeDetailsIcons/emailIcon.png";
import phoneIcon from "../assets/employeeDetailsIcons/phoneIcon.png";
import addressIcon from "../assets/employeeDetailsIcons/addressIcon.png";
import stateIcon from "../assets/employeeDetailsIcons/stateIcon.png";
import cityIcon from "../assets/employeeDetailsIcons/cityIcon.png";
import countryIcon from "../assets/employeeDetailsIcons/countryIcon.png";
import designationIcon from "../assets/employeeDetailsIcons/designationIcon.png";
import { toast } from "react-toastify";

const EmployeeForm = () => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const employee = useSelector((state) => state.employee.employee);
  const profilePicture = useSelector((state) => state.employee.profilePicture);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(profilePicture);
  const [isUploading, setIsUploading] = useState(false);
  const axiosBaseURL = "https://employee-management-server-f7k2.onrender.com/api";

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string().min(10, "Must be at least 10 characters").nullable(),
    address: Yup.object().shape({
      addressLine: Yup.string().nullable(),
      city: Yup.string().nullable(),
      state: Yup.string().nullable(),
      country: Yup.string().nullable(),
    }),
    role: Yup.string().oneOf(["employee", "admin"], "Invalid role"),
    designation: Yup.string().nullable(),
  });

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      console.log(values);
      const userDetails = {
        user: {
          name: values.name,
          email: values.email,
          phone: values.phone,
          address: {
            addressLine: values.address.addressLine,
            city: values.address.city,
            state: values.address.state,
            country: values.address.country,
          },
          designation: values.designation
        },
      };
      const response = await axios.post(
        `${axiosBaseURL}/user/updateemployee`,
        userDetails,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      dispatch(setEmployee(response.data.employee)); // Update Redux state
      setEditing(false); // Exit edit mode
      toast.success("Profile updated Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error updating employee:", error);
    } finally {
      setSubmitting(false); // Reset the submitting state
    }
  };

  const fetchProfilePicture = async () => {
    try {
      const options = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        responseType: "blob",
      };

      const response = await axios.get(
        `${axiosBaseURL}/user/getprofilepicture`,
        options
      );

      // Log response data to check if it's a Blob
      console.log("Response data:", response.data);
      console.log("Is Blob:", response.data instanceof Blob); // Check if it is a Blob

      if (response.data instanceof Blob) {
        const imageUrl = URL.createObjectURL(response.data);
        dispatch(setProfilePicture(imageUrl));
      } else {
        console.error("Error: Response is not a Blob");
      }
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    }
  };

  const handleImageChange = (e) => {
    setFile(e.target.files[0]); // Update the selected file
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select an image to upload.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    const formData = new FormData();
    console.log(file);
    formData.append("image", file); // Append the file to form data

    try {
      const options = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "multipart/form-data",
        },
      };

      // Send the POST request to upload the image
      const response = await axios.post(
        `${axiosBaseURL}/user/uploadprofilepicture`,
        formData,
        options
      );

      if (response.status === 200) {
        // Fetch the updated profile picture immediately after upload
        try {
          fetchProfilePicture();
        }
        catch (error) {
          toast.error("Failed to upload profile picture", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          
        }
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      toast.error("Failed to upload profile picture.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };


  useEffect(() => {
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
        console.log(response.data.user);
        dispatch(setEmployee(response.data.user));
        console.log(employee);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchProfilePicture();
    fetchEmployee();
  }, [dispatch, editing, isUploading]);

  return (
    <div className="container my-5">
      <div className="container d-flex gap-3 flex-column flex-md-row align-items-center align-items-md-start justify-content-start">
        <form
          onSubmit={handleImageUpload}
          className="my-4 col-12 col-md-2 d-flex flex-column align-items-center justify-content-center"
        >
          <label htmlFor="file-upload" className="custom-file-upload">
            <img
              src={profilePicture || profileIcon}
              alt=""
              className={profilePicture ? "profile-picture" : ""}
            />
          </label>

          <input
            type="file"
            label="Image"
            name="myFile"
            id="file-upload"
            accept=".jpeg, .png, .jpg"
            onChange={handleImageChange}
          />

          <button type="submit" className="col btn btn-custom my-3 ">
            update
          </button>
        </form>

        {editing ? (
          <Formik
            initialValues={{
              name: employee?.name || "",
              email: employee?.email || "",
              phone: employee?.phone || "",
              address: {
                addressLine: employee?.address?.addressLine || "",
                city: employee?.address?.city || "",
                state: employee?.address?.state || "",
                country: employee?.address?.country || "",
              },
              designation: employee?.designation || "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="col-12 col-md-10 d-flex flex-column">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <Field type="text" name="name" className="form-control" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field type="email" name="email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <Field type="text" name="phone" className="form-control" />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="addressLine">Address Line</label>
                  <Field
                    type="text"
                    name="address.addressLine"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="address.addressLine"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <Field
                    type="text"
                    name="address.city"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="address.city"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <Field
                    type="text"
                    name="address.state"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="address.state"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <Field
                    type="text"
                    name="address.country"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="address.country"
                    component="div"
                    className="text-danger"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="country">Designation</label>
                  <Field
                    type="text"
                    name="designation"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="designation"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="d-flex justify-content-center gap-5">
                  <button
                    type="submit"
                    className="btn btn-custom mt-3 align-self-center"
                    disabled={isSubmitting}
                  >
                    save
                  </button>
                  <button
                    className="btn btn-danger mt-3 align-self-center"
                    onClick={() => {
                      setEditing(false);
                    }}
                  >
                    cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <div className="col-12 col-md-10 d-flex flex-column my-5 my-sm-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div className="fs-1">Employee Details</div>
              <div
                className="btn btn-custom col-4 fs-5"
                onClick={() => setEditing(true)}
              >
                edit
              </div>
            </div>
            <div className="row d-flex flex-column flex-md-row">
              <div className="col-12 col-sm-6 form-group d-flex">
                <label className="muted col-2">
                  <img src={userNameIcon} alt="username input" />
                </label>
                <p className="fs-4">{employee?.name || "N/A"}</p>
              </div>

              <div className="col-12 col-sm-6 form-group d-flex">
                <label className="muted col-2">
                  <img src={emailIcon} alt="email input" />
                </label>
                <p className="fs-4">{employee?.email || "N/A"}</p>
              </div>

              <div className="col-12 col-sm-6 form-group d-flex">
                <label className="muted col-2">
                  <img src={phoneIcon} alt="mobile number input" />
                </label>
                <p className="fs-4">{employee?.phone || "N/A"}</p>
              </div>

              <div className="col-12 col-sm-6 form-group d-flex">
                <label className="muted col-2">
                  <img src={addressIcon} alt="address Line input" />
                </label>
                <p className="fs-4">
                  {employee?.address?.addressLine || "N/A"}
                </p>
              </div>

              <div className="col-12 col-sm-6 form-group d-flex">
                <label className="muted col-2">
                  <img src={cityIcon} alt="city input" />
                </label>
                <p className="fs-4">{employee?.address?.city || "N/A"}</p>
              </div>

              <div className="col-12 col-sm-6 form-group d-flex">
                <label className="muted col-2">
                  <img src={stateIcon} alt="state" />
                </label>
                <p className="fs-4">{employee?.address?.state || "N/A"}</p>
              </div>

              <div className="col-12 col-sm-6 form-group d-flex">
                <label className="muted col-2">
                  <img src={countryIcon} alt="country" />
                </label>
                <p className="fs-4">{employee?.address?.country || "N/A"}</p>
              </div>

              <div className="col-12 col-sm-6 form-group d-flex">
                <label className="muted col-2">
                  <img src={designationIcon} alt="designation" />
                </label>
                <p className="fs-4">{employee?.designation || "N/A"}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeForm;
