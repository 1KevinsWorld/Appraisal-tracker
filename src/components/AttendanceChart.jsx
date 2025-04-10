import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Styles/Attendance.css"
import noRecordsIcon from "../assets/noRecords.jpg";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const AttendanceChart = ({ height }) => {
  const [attendanceRecord, setAttendanceRecord] = useState([]);
  const [noRecordsAvailable, setNoRecordsAvailable] = useState(false);
  const axiosBaseURL = "https://employee-management-server-f7k2.onrender.com/api"

  useEffect(() => {
    const getAttendanceRecord = async () => {
      try {
        const options = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        };

        const attendanceResponse = await axios.post(
          `${axiosBaseURL}/user/attendance/attendancerecord`,
          {}, // If no data is required in the body
          options
        );

        // Process the data after awaiting the result
        const attendanceData = attendanceResponse.data;
        const chartData = attendanceData.reverse().map((record) => {
          return {
            date: new Date(record.date).toLocaleDateString(),
            hoursWorked:
              record.attendance.length === 0
                ? 0
                : (record.attendance[0].totalTime / (1000 * 60 * 60)).toFixed(
                    2
                  ),
          };
        });
        console.log(chartData);

        const allZeros = chartData.every((entry) => entry.hoursWorked === 0.0);

        if (allZeros) {
          setNoRecordsAvailable(true); // State to track no records available
        } else {
          setAttendanceRecord(chartData);
        }
      } catch (error) {
        console.error("Error fetching attendance record:", error);
      }
    };

    getAttendanceRecord();
  }, []);

  return noRecordsAvailable ? (
    <>
      <div className="text-center">
        <img
          src={noRecordsIcon}
          alt="No records Available"
          className="no-records-icon"
        />
        <p className="lead">No Attendance Records available for the given period or employee</p>
      </div>
    </>
  ) : (
    <>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={attendanceRecord}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine
            y={8.0}
            label="8 HRS BAR"
            stroke="#D14D72"
            isFront={true}
            width={20}
            strokeWidth={2}
            strokeDasharray={8}
          />
          <Bar
            name="Hours Worked"
            dataKey="hoursWorked"
            fill="blueViolet"
            barSize={40}
            radius={[10, 10, 0, 0]}
            isFront={false}
          >
            {attendanceRecord.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.hoursWorked < 8.0 ? "#D14D72" : "blueViolet"} // Conditional coloring
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default AttendanceChart;
