import React, { useState, useEffect } from "react";
import markAttendance from "../assets/markAttendance.jpg";
import "./Styles/Attendance.css";
import { toast } from "react-toastify";
import axios from "axios";

const MarkAttendanceCard = () => {
  const [swipedIn, setSwipedIn] = useState(
    JSON.parse(localStorage.getItem("swipedIn"))
  );
  const [totalTime, setToatalTime] = useState(
    localStorage.getItem("totalTime")
  );
  const axiosBaseURL = "https://employee-management-server-f7k2.onrender.com/api";
  const options = {
    headers: {
      authorization: `Bearer ${localStorage.getItem("authToken")}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    const storedSwipedIn = localStorage.getItem("swipedIn");
    if (storedSwipedIn !== null) {
      setSwipedIn(JSON.parse(storedSwipedIn)); // Parse the string back to boolean
    }
    const storedTotalTime = localStorage.getItem("totalTime");
    if (storedTotalTime !== null) {
      setToatalTime(parseInt(storedTotalTime));
    }
  }, []);

  const progressPercentage = Math.min(
    (totalTime / (8 * 60 * 60 * 1000)) * 100,
    100
  ).toFixed(2);

  const handleSwipeToggle = async () => {
    // Determine the API endpoint and success message based on the swipe status
    const endpoint = `${axiosBaseURL}/user/attendance/swipetoggle`;
    const successMessage = swipedIn
      ? "You have swiped out successfully"
      : "You have swiped in successfully";

    try {
      // Perform the API call to toggle swipe status
      const swipeToggleResponse = await axios.post(endpoint, {}, options);

      if (swipeToggleResponse.status === 200) {
        // Update the swipe status state based on the current status
        setSwipedIn(!swipedIn);
        localStorage.setItem("swipedIn", JSON.stringify(!swipedIn));

        // Show the success toast
        toast.success(successMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: 0,
          theme: "colored",
        });
        setToatalTime(swipeToggleResponse.data.userAttendance.totalTime);
        localStorage.setItem("totalTime",swipeToggleResponse.data.userAttendance.totalTime)
      } else {
        // If the API call failed, show an error toast
        toast.error(
          `Something went wrong: ${swipeToggleResponse.data.message}`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: 0,
            theme: "colored",
          }
        );
      }
    } catch (error) {
      // Handle any errors from the API call
      console.error("Error while toggling swipe status:", error);

      // Show an error toast
      toast.error(`Something went wrong: ${error.response.data.message}`, {
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
  };
  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <img src={markAttendance} alt="mark attendance" className="img-fluid" />
        <div className="btn btn-custom fs-5 col-6" onClick={handleSwipeToggle}>
          {swipedIn ? "Swipe Out" : "Swipe In"}
        </div>
        <div className="col-10">
          <div
            className="progress col-12 mt-4"
            role="progressbar"
            aria-label="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ height: "1.2rem" }}
          >
            <div
              className="progress-bar btn-custom"
              style={{ width: `${progressPercentage}%` }}
            >
              {progressPercentage} %
            </div>
          </div>
          <p className="my-2 text-muted lead">
            Total working hours of today :{" "}
            <span className="text-custom">
              {(progressPercentage * 0.08).toFixed(2)} Hrs
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default MarkAttendanceCard;
