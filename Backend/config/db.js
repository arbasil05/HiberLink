import mongoose from "mongoose";

const connectDB = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB Connected successfully");

    } catch (error) {
        console.log(`An error occured connecting to db : ${error}`);

    }
}

export default connectDB;