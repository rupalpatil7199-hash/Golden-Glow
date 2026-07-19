import app from './app.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5001;

// Connect to Database
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`===================================================`);
    console.log(`   Golden Glow Server Running on Port: ${PORT}`);
    console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`===================================================`);
  });
}).catch(err => {
  console.error('Failed to start server due to DB connection failure', err);
});
