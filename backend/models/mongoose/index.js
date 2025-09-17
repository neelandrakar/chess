require('dotenv').config()
import mongoose from 'mongoose';

const chessDB = mongoose.createConnection(process.env.MONGO_URL, {
  dbName: process.env.MONGO_DB_NAME,
});

chessDB.on('connected', () => {
  console.log('chessDB mongoose to the database!');
});
chessDB.on('error', error => {
  console.error('error on mongoose chessDB error:', error);
});
chessDB.on('disconnected', () => {
  console.log('disconnected mongoose chessDB from the database!');
});
if (chessDB.readyState === 1) {
  console.log('mongoose chessDB is open');
}