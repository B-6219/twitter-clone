import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectMongoDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.mongodb_uri )
        console.log(`Mongo DB connected sucessfully ${conn.connection.host}`);
        
    } catch (error) {
        console.error(`Error connect ${error.message}`)
        process.exit(1)
    }
}

export default connectMongoDb