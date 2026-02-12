import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


//middleware

app.use(cors({
    origin:"http://localhost:5173", // Allow requests from this origin
})); // Enable CORS for all routes

app.use(express.json()); // this middleware is used to parse the JSON bodies: req.body

app.use(rateLimiter); // Apply the rate limiter middleware to all routes


app.use((req,res,next) =>{
    console.log(`Req method is ${req.method} & Req URL is ${req.path}`);
    next();
});

//routes
app.use("/api/notes", notesRoutes);

connectDB().then(()=>{
    app.listen(PORT, () =>{
    console.log("Server is running on port", PORT);
});
});

