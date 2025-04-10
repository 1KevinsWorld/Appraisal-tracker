import React from "react";
import Displaycards from "./Displaycards.jsx";
import MarkAttendanceCard from "./MarkAttendanceCard.jsx";
import AttendanceChart from "./AttendanceChart.jsx";
import { useSelector } from "react-redux";

const Dashboard = () => {
  return (
    <>
      <div className="container-fluid">
        <Displaycards />
      </div>
        <div className="col-12 d-flex flex-column flex-sm-row justify-content-around align-items-center">
          <div className="col-12 col-sm-5 col-lg-4">
            <MarkAttendanceCard />
          </div>
          <div className="col-12 col-sm-7 col-lg-6">
            <AttendanceChart height={500} />
          </div>
        </div>
    </>
  );
};

export default Dashboard;
