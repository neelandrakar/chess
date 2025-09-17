import { WebSocketServer } from 'ws';
import { GameManager } from './classes/GameManager.js';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Create an instance of GameManager
const gameManager = new GameManager();
const app = express();
// mongoose.connect(process.env.MONGO_URL)
//   .then(() => {
//     console.log('Connected Successfully');
//   })
//   .catch((e) => {
//     console.log(`Error while connecting. Error: ${e}`);
//   });


app.listen(process.env.PORT, `${process.env.IP}`, function () {
  console.log(`Connected at ${process.env.PORT}`);
});

const wss = new WebSocketServer({ port: 8080 });

wss.on('listening', () => {
  console.log('WebSocket server is running on ws://localhost:8080');
});

wss.on('connection', function connection(ws) {
  gameManager.addUser(ws); // Call addUser on the instance
  console.log('New client connected');
});