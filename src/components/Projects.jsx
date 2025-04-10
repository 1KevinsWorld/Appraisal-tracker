// frontend/components/Projects.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const Projects = ({ employeeId }) => {
  const [projects, setProjects] = useState([]); // Set initial state to null
  const [loading, setLoading] = useState(true); // Add a loading state
  const axiosBaseURL = "https://employee-management-server-f7k2.onrender.com/api"

  // Fetch project data for the specific employee
  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `${axiosBaseURL}/user/project/getemployeeprojects`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setProjects(response.data.projects); // Set fetched projects
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Render loading spinner or message while fetching data
  if (loading) {
    return <div>Loading projects...</div>;
  }

  // Render the component after projects are fetched
  return (
    <div className="container">
      <h2 className="mt-4">Assigned Projects</h2>
      <div className="row">
        {projects.length === 0 ? (
          <p>No projects assigned for this employee.</p>
        ) : (
          projects.map((project) => (
            <div className="col-md-4 mb-4" key={project._id}>
              <div className="card col-12 h-100">
                <div
                  className={`card-header d-flex align-items-center justify-content-between ${project.priority.toLowerCase()}`}
                >
                  <h5 className="card-title my-1">{project.projectName.toUpperCase()}</h5>
                  <span
                    className={`badge ${
                      project.status === "active"
                        ? "bg-success"
                        : "bg-secondary"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <div className="card-body">
                  <p className="card-text">{project.description}</p>
                  <p>
                    <strong>Priority: </strong> {project.priority}
                  </p>
                  <p>
                    <strong>Start Date: </strong>{" "}
                    {new Date(project.startDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>End Date: </strong>{" "}
                    {new Date(project.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="card-footer h-50">
                  <p className="mb-1">
                    <strong>Assigned By:</strong>{" "}
                    {project.assignedBy?.name || "N/A"}
                  </p>
                  <p className="mb-1">
                    <strong>Assigned Employees:</strong>{" "}
                    <ul className="ps-3 my-2">
                      {project.assignedEmployees.map((emp) => (
                        <li className="">{emp.name}</li>
                      ))}
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Projects;
