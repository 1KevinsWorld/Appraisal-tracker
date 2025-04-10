// import express from "express";
// import {
//   applyLeave,
//   attendanceRecordLastNDays,
//   getAllEmployeeLeaves,
//   getEmployeeLeaves,
//   getSwipeStatus,
//   manageLeave,
//   pendingLeaves,
//   swipeToggle,
// } from "../Controller/attendance.controller.js";

// const Router = express.Router();

// // Removed userAuth() and roleAuth("admin") for testing
// Router.post("/swipetoggle", swipeToggle);
// Router.post("/swipestatus", getSwipeStatus);
// Router.post("/attendancerecord", attendanceRecordLastNDays);
// Router.post("/applyleave", applyLeave);
// Router.post("/getmyleaves", getEmployeeLeaves);
// Router.get("/getallemployeeleaves", getAllEmployeeLeaves);
// Router.get("/getpendingleaves", pendingLeaves);
// Router.put("/manageleave", manageLeave);

// export default Router;





//temporarily removed
import express from "express";
import { userAuth, roleAuth } from "../Middleware/userAuth.js";
import {
  applyLeave,
  attendanceRecordLastNDays,
  getAllEmployeeLeaves,
  getEmployeeLeaves,
  getSwipeStatus,
  manageLeave,
  pendingLeaves,
  swipeToggle,
} from "../Controller/attendance.controller.js";

const Router = express.Router();

Router.post("/swipetoggle", userAuth(), swipeToggle);
Router.post("/swipestatus", userAuth(), getSwipeStatus);
Router.post("/attendancerecord", userAuth(), attendanceRecordLastNDays);
Router.post("/applyleave", userAuth(), applyLeave);
Router.post("/getmyleaves", userAuth(), getEmployeeLeaves);
Router.get("/getallemployeeleaves", roleAuth("admin"), getAllEmployeeLeaves);
Router.get("/getpendingleaves", roleAuth("admin"), pendingLeaves);
Router.put("/manageleave", roleAuth("admin"), manageLeave);

export default Router;
