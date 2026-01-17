import express from "express";
import authRoutes from "./routes/auth.router.js";
import connectMongoDb from "./db/connectMongoDb.js";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.routes.js";
const app = express();
const PORT = 5000;

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

  console.log("DB URI is:", process.env.MONGO_DB_URI);
  connectMongoDb();

});
