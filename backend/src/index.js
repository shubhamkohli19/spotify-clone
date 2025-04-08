import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import songsRoutes from "./routes/songs.route.js";
import albumsRoutes from "./routes/albums.route.js";
import statsRoutes from "./routes/stats.route.js";
import { connectDB } from "./lib/db.js";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());

app.use(clerkMiddleware());
app.use(fileUpload.single({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits:{
        fileSize: 10 * 1024 * 1024 // 10 MB limit
    }
}));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songsRoutes);
app.use("/api/albums", albumsRoutes);
app.use("/api/stats", statsRoutes);

app.use((error, req, res, next) => {
    res.status(500).json({ message: process.env.NODE_ENV === "production" ? "Something went wrong" : error.message });
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
    connectDB();
});