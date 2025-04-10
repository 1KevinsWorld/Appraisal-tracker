import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnect = async () => {
    try {
        const dbString = process.env.MONGO_URI;  // ✅ Use MONGO_URI instead of DBSTRING
        if (!dbString) {
            throw new Error("MongoDB URI is missing! Check your .env file.");
        }

        await mongoose.connect(dbString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("✅ DB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1); // Stop the app if DB connection fails
    }
};

export default dbConnect;



















// import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();

// const dbConnect = async () => {
//     try {
//         const dbString = process.env.DBSTRING;
//         const connection = await mongoose.connect(dbString);
//         console.log("DB connected successfully")
//         return connection;
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// export default dbConnect;