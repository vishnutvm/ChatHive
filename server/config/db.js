import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

// handling mongoose strictQuery warning
mongoose.set('strictQuery', true);

// connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`mongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
