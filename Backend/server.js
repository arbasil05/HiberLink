import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import resourceRouter from "./routes/ResourceRoutes.js";
import authRouter from "./routes/AuthRoutes.js";
import cors from "cors";
import { handleErrors } from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(cookieParser())
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/resource", resourceRouter);
app.use("/api/auth", authRouter);

app.use(handleErrors);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`App started on port ${PORT}`);
    })
})
