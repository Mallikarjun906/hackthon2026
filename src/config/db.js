import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("ENV MONGO:", process.env.MONGO_URI); // debug

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;