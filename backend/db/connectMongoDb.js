import mongoose from "mongoose";

const connectMongoDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log('Mongo DB connected sucessfully' );
        
    } catch (error) {
        console.error(`Error connect ${error.message}`)
        process.exit(1)
    }
}

export default connectMongoDb