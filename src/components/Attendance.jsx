import React from "react";
import MarkAttendanceCard from "./MarkAttendanceCard";
import AttendanceChart from "./AttendanceChart";

const Attendance = () => {
  return (
    <>
      <div className="col-12 d-flex flex-column flex-sm-row justify-content-center align-items-center py-5">
      <div className="col-12 col-sm-6 col-lg-4">
        <MarkAttendanceCard />
      </div>
      <div className="col-12 col-sm-6 col-lg-8">
          <AttendanceChart height={600} />
      </div>
      </div>
    </>
  );
};

export default Attendance;
