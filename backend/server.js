import exress from "express";
import authRoutes from "./routes/auth.router.js";
import connectMongoDb from "./db/connectMongoDb.js";

const app = exress();
const PORT = 5000;

app.use("api/auth", authRoutes);

app.get('/' ,(req,res) => {
  res.send('hello')
})

app.listen(PORT || 8000, () => {
  console.log("Server is Running Sucessfully");
  connectMongoDb()
});

