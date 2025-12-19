import express from "express";
import authRoutes from "./routes/auth.router.js";
import connectMongoDb from "./db/connectMongoDb.js";

const app = express();
const PORT = 5000;

app.use(express.json())

app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log("Server is running successfully");
  connectMongoDb();
});
