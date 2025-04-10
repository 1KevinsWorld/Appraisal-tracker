import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import LeaveRecords from "./LeaveRecords";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";



const ApplyLeave = () => {
  const axiosBaseURL = "https://employee-management-server-f7k2.onrender.com/api";

  const initialValues = {
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
  };

  const validationSchema = Yup.object().shape({
    leaveType: Yup.string().required("type of leave required"),
    reason: Yup.string().required("reason for leave required"),
    fromDate: Yup.date().required("from date required"),
    toDate: Yup.date().required("to date required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const options = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        }
      };
      const data = {
        "startDate": values.fromDate,
        "endDate": values.toDate,
        "leaveType": values.leaveType,
        "reason": values.reason
      }
      const response = await axios.post(
        `${axiosBaseURL}/user/attendance/applyleave`,
        data,
        options
      );
      if (response.status == 200) {
        toast.success("Leave Applied Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        resetForm();
      } else {
        toast.error(response.data.message, {
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
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log(error);
    }
  };

  return (
    <>
      <div className="container px-4 my-5 d-md-flex">
        <div className="col col-md-6 col-lg-4">
          <p className="px-2 mb-4 fw-bold text-center">Applying Leave</p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="d-flex flex-column align-items-start justidy-content-center p-2">
              <div className="mb-4 col-12">
                <label htmlFor="leaveType" className="col-12 col-sm-4">
                  Leave type
                </label>
                <Field
                  as="select"
                  name="leaveType"
                  className="rounded border border-secondary p-2 col-12"
                >
                  <option
                    value=""
                    className="text-muted"
                    disabled
                    defaultValue
                    hidden
                  >
                    select an option
                  </option>
                  <option value="WFH">Work From Home</option>
                  <option value="On Duty">On Duty</option>
                  <option value="Privilege">Privilege</option>
                  <option value="Casual">Casual Leave</option>
                  <option value="Maternity">Maternity Leave</option>
                </Field>
                <ErrorMessage
                  name="leaveType"
                  component="span"
                  className="text-danger"
                ></ErrorMessage>
              </div>
              <div className="mb-4 col-12">
                <label htmlFor="fromDate" className="col-12 col-sm-4">
                  From date
                </label>
                <Field
                  type="date"
                  name="fromDate"
                  className="rounded border border-secondary p-2 col-12"
                ></Field>
                <ErrorMessage
                  name="fromDate"
                  component="span"
                  className="text-danger"
                ></ErrorMessage>
              </div>
              <div className="mb-4 col-12">
                <label htmlFor="toDate" className="col-12 col-sm-4">
                  To date
                </label>
                <Field
                  type="date"
                  name="toDate"
                  className="rounded border border-secondary p-2 col-12"
                ></Field>
                <ErrorMessage
                  name="toDate"
                  component="span"
                  className="text-danger"
                ></ErrorMessage>
              </div>
              <div className="mb-2 col-12">
                <label htmlFor="reason">Reason</label>
                <Field
                  as="textarea"
                  name="reason"
                  className="rounded border border-secondary p-2 col-12"
                ></Field>
                <ErrorMessage
                  name="reason"
                  component="span"
                  className="text-danger"
                ></ErrorMessage>
              </div>
              <button
                className="mb-1 btn btn-custom col-4 align-self-center"
                type="submit"
              >
                Apply
              </button>
            </Form>
          </Formik>
        </div>
        <div className="col col-md-6 col-lg-8">
          <p className="fw-bold fs-5 mb-0 text-center">LEAVE RECORDS</p>
          <LeaveRecords />
        </div>
      </div>
    </>
  );
};

export default ApplyLeave;
