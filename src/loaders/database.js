import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

mongoose.connection.on('error', (err) => {
  console.log(`[💾 MONGODB] - Connection error: ${err}`);
  process.exit(-1);
});


export const connect = () => {
  try {
    console.log('[💾 MONGODB] - Connecting...');
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log('[💾 MONGODB] - Connected!'));
    return mongoose.connection;
  } catch (error) {
    console.log(`[💾 MONGODB] - Connection error: ${error}`);
    process.exit(-1);
  }
};