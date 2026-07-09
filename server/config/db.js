import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;
let dbType = 'local';

export const connectDB = async () => {
  // If no MONGO_URI is defined, immediately fallback
  if (!process.env.MONGO_URI) {
    console.warn('\n⚠️  No MONGO_URI variable found in environment. Switching to persistent JSON localDB fallback.\n');
    process.env.USE_LOCAL_DB = 'true';
    dbType = 'local';
    return { isConnected: false, type: 'local' };
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 3000 // Timeout after 3 seconds
    });
    console.log(`\n🚀 MongoDB Connected: ${conn.connection.host}\n`);
    isConnected = true;
    dbType = 'mongodb';
    process.env.USE_LOCAL_DB = 'false';
    return { isConnected: true, type: 'mongodb' };
  } catch (error) {
    console.warn(`\n⚠️  MongoDB Connection Error: ${error.message}`);
    console.warn('⚠️  Switching to persistent JSON localDB fallback. No action needed, the application is fully operational!\n');
    process.env.USE_LOCAL_DB = 'true';
    dbType = 'local';
    return { isConnected: false, type: 'local' };
  }
};

export const getDbType = () => dbType;
export const getIsConnected = () => isConnected;
