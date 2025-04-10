import axios from "axios";
import React, { useEffect, useState } from "react";

const LeaveRecords = () => {
  const [leaveRecords, setLeaveRecords] = useState([]); // Ensure it's always an array
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5); // Number of records per page
  const [loading, setLoading] = useState(true); // Loading state
  const axiosBaseURL = "https://employee-management-server-f7k2.onrender.com/api";

  // Fetch leave records
  const fetchLeaveRecords = async () => {
    setLoading(true); // Set loading to true when fetching data
    try {
      const options = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      };
      const leavesResponse = await axios.post(
        `${axiosBaseURL}/user/attendance/getmyleaves`,
        {},
        options
      );
      console.log(leavesResponse.data);
      const fetchedLeaves = (await leavesResponse.data.leaves) || []; // Ensure it's an array
      setLeaveRecords(fetchedLeaves);
    } catch (error) {
      console.error("Error fetching leave records:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  // Cancel leave
  const cancelLeave = async (leaveId) => {
    try {
      const options = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        `${axiosBaseURL}/user/attendance/cancelLeave`,
        { leaveId },
        options
      );
      // Update the list after cancellation
      fetchLeaveRecords();
    } catch (error) {
      console.error("Error canceling leave:", error);
    }
  };

  useEffect(() => {
    fetchLeaveRecords();
  }, []);

  // Calculate pagination indices
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = leaveRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  // Handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="container my-5">
        {loading ? (
          <p>Loading leave records...</p>
        ) : leaveRecords.length === 0 ? (
          <p>No leave records available.</p>
        ) : (
          <>
            <div className="accordion" id="leaveRecordsAccordion">
              {currentRecords.map((leave) => {
                const startDate = new Date(leave.startDate);
                const endDate = new Date(leave.endDate);
                const canCancel = startDate > new Date();

                return (
                  <div className="accordion-item" key={leave._id}>
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${leave._id}`}
                        aria-expanded="false"
                        aria-controls={`collapse${leave._id}`}
                      >
                        <div className="col-12 pe-4 d-flex justify-content-between align-items-center">
                          <div>
                            <strong className="fs-5">{leave.leaveType}</strong>
                            <p className="muted mt-1">
                              {startDate.toDateString()} -{" "}
                              {endDate.toDateString()}
                            </p>
                          </div>
                          <div
                            className={`badge text-dark ${
                              leave.status === "Pending"
                                ? "bg-warning-subtle"
                                : leave.status === "Rejected"
                                ? "bg-danger-subtle"
                                : "bg-success-subtle"
                            }`}
                          >
                            {leave.status}
                          </div>
                        </div>
                      </button>
                    </h2>
                    <div
                      id={`collapse${leave._id}`}
                      className="accordion-collapse collapse col-12"
                      data-bs-parent="#leaveRecordsAccordion"
                    >
                      <div className="accordion-body d-flex justify-content-between">
                        <div>
                          <p>
                            <strong>Reason:</strong> {leave.reason}
                          </p>
                          <p>
                            <strong>Status:</strong> {leave.status}
                          </p>
                          <p>
                            <strong>Start Date:</strong>{" "}
                            {startDate.toDateString()}
                          </p>
                          <p>
                            <strong>End Date:</strong> {endDate.toDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <nav className="mt-4">
              <ul className="pagination justify-content-center">
                {Array.from(
                  { length: Math.ceil(leaveRecords.length / recordsPerPage) },
                  (_, index) => (
                    <li
                      key={index + 1}
                      className={`page-item ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </nav>
          </>
        )}
      </div>
    </>
  );
};

export default LeaveRecords;
