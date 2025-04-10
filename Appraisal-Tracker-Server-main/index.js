

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./Database/dbConfig.js";
import userRouter from "./Routers/user.router.js";
import attendanceRouter from "./Routers/attendance.router.js";
import projectRouter from "./Routers/project.router.js";
import "./Schedulers/AttendanceScheduler.js";
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Express configuration
const app = express();
app.use(cors());
app.use(express.json());

// Database connection
dbConnect();

// Test route
app.get("/", (req, res) => {
    res.status(200).json({ message: "App is working fine" });
});

app.get('/test', (req, res) => {
    res.send('Test route working');
  });

// Routes configuration
app.use("/api/user", userRouter);
app.use("/api/user/attendance", attendanceRouter);
app.use("/api/user/project", projectRouter);





// Convert `import.meta.url` to the equivalent of `__dirname`
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the uploads folder where images are stored
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Log all loaded routes
app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
        console.log(`Loaded Route: ${r.route.stack[0].method.toUpperCase()} ${r.route.path}`);
    }
});


// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});












// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import dbConnect from "./Database/dbConfig.js";
// import userRouter from "./Routers/user.router.js";
// import attendanceRouter from "./Routers/attendance.router.js";
// import projectRouter from "./Routers/project.router.js";
// import "./Schedulers/AttendanceScheduler.js";
// import path from 'path';
// import { fileURLToPath } from 'url';

// dotenv.config();


// //express cofiguration
// const app = express();
// app.use(cors());
// app.use(express.json());

// //db connection
// dbConnect();

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "App is working fine" });
// });

// //routes configuration
// app.use("/api/user", userRouter);
// app.use("/api/user/attendance", attendanceRouter);
// app.use("/api/user/project", projectRouter);

// //Convert `import.meta.url` to the equivalent of `__dirname`
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Serve the uploads folder where images are stored
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// const PORT = process.env.PORT;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
