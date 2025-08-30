import mongoose from "mongoose";

export const connectDb=async ()=>{
    try{
    return true;
    let connectionInstance=await mongoose.connect(process.env.URI);

    console.log(`🗄️  Database connected: ${connectionInstance.connection.host}`);

    }catch(err){
        console.log("Error occured while connecting to db");
        console.log("Error meassage from file src/db/index.js line no 8");
        console.log("❌ Database connection failed:", err);
        process.exit(1);  // node functionality exits process with code 1
    }
}