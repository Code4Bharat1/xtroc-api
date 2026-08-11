import mongoose from 'mongoose';
import envConfig from './env.config.js';
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
const connectDB = async () => {
  try {
    await mongoose.connect(envConfig.mongodbUri);
    console.log('MongoDB connected successfully');

    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB Connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB Connection disconnected.');
    });
  } catch (error) {
    console.error(`MongoDB Connection failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
