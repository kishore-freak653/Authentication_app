import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import { notFound, errorHandler } from "./Middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import path from 'path'
// Connect to the database
connectDB();

const app = express();

// Middleware to parse JSON and form data
app.use(express.json()); // Parses application/json
app.use(express.urlencoded({ extended: true })); // Parses application/x-www-form-urlencoded


// Initialize cookie parser
app.use(cookieParser());

// Setup CORS
app.use(
  cors({
    origin: ["http://localhost:5173"], 
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

// Routes
app.use("/api/users", userRoute);

if(process.env.NODE_ENV === 'production'){
  const __dirname = path.resolve();

  app.use(express.static(path.join(__dirname,'client/dist')));

  app.get('*',(req,res) => res.sendFile(path.resolve(__dirname,'client','dist','index.html')));



}else{
  // Home route for server status check
  app.get("/", (req, res) => {
    res.send("Server is Running in the Backend");
  });
}


// Custom error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
const PORT = 5000;
app.listen(PORT, (err) => {
  if (err) {
    console.log("Error Connecting Server");
  } else {
    console.log(`Server Connected and Running on Port ${PORT}`);
  }
});
