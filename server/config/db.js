import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

// Custom DNS is a dev-environment workaround (common on some networks/WSL).
// Never override DNS in production — it can break resolution of internal/VPC hosts.
if (!isProduction) {
  try {
    dns.setDefaultResultOrder('ipv4first');
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  } catch (e) {
    // Ignore if custom DNS servers fail
  }
}

let isConnected = false;
let dbType = 'local';

export const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    if (isProduction) {
      // Never allow local-DB fallback in production — fail loudly instead
      throw new Error('MONGO_URI is not set. Refusing to start in production without a database.');
    }
    console.warn('\n⚠️  No MONGO_URI found. Using local JSON DB fallback (development only).\n');
    process.env.USE_LOCAL_DB = 'true';
    dbType = 'local';
    return { isConnected: false, type: 'local' };
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // slightly more forgiving than 3s for prod networks
    });

    console.log(`\n🚀 MongoDB Connected: ${conn.connection.host}\n`);
    isConnected = true;
    dbType = 'mongodb';
    process.env.USE_LOCAL_DB = 'false';

    // Track connection health after the initial connect too
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err.message);
      isConnected = false;
    });
    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
      isConnected = false;
    });
    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
      isConnected = true;
    });

    return { isConnected: true, type: 'mongodb' };
  } catch (error) {
    if (isProduction) {
      // In production, a failed DB connection should stop the app, not degrade silently
      console.error(`MongoDB connection failed: ${error.message}`);
      throw error;
    }
    console.warn(`\n⚠️  MongoDB Connection Error: ${error.message}`);
    console.warn('⚠️  Using local JSON DB fallback (development only).\n');
    process.env.USE_LOCAL_DB = 'true';
    dbType = 'local';
    return { isConnected: false, type: 'local' };
  }
};

// Graceful shutdown — close the connection cleanly instead of leaving it hanging
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed (SIGINT)');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed (SIGTERM)');
  process.exit(0);
});

export const getDbType = () => dbType;
export const getIsConnected = () => isConnected;