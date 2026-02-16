import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//middleware
if (process.env.NODE_ENV === "production") {
    // production CORS settings
    app.use(cors({
        origin: "http://your-production-frontend.com"
    }));
} else {
    // development: allow local frontend
    app.use(cors({
        origin: "http://localhost:5173"
    }));
}

app.use(express.json()); // this middleware is used to parse the JSON bodies: req.body

app.use(rateLimiter); // Apply the rate limiter middleware to all routes


app.use((req,res,next) =>{
    console.log(`Req method is ${req.method} & Req URL is ${req.path}`);
    next();
});

//routes
app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req,res) =>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

connectDB().then(()=>{
    app.listen(PORT, () =>{
    console.log("Server is running on port", PORT);
});
});

