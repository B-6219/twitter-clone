import dotenv from 'dotenv'
import express from "express";
import authRoutes from "./routes/auth.router.js";
import connectMongoDb from "./db/connectMongoDb.js";
import cookieParser from "cookie-parser";
import cors from 'cors'


import userRoutes from "./routes/user.routes.js";


dotenv.config()
const app = express();
const PORT = 4000;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log("Server is running successfully");
  console.log('http://localhost:4000');


  console.log("DB URI is:", process.env.MONGO_DB_URI);
  connectMongoDb();

});
