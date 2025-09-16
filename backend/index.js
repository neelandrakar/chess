import { WebSocketServer } from 'ws';
import { GameManager } from './classes/GameManager.js';

// Create an instance of GameManager
const gameManager = new GameManager();

const wss = new WebSocketServer({ port: 8080 });

wss.on('listening', () => {
  console.log('WebSocket server is running on ws://localhost:8080');
});

wss.on('connection', function connection(ws) {
  gameManager.addUser(ws); // Call addUser on the instance
  console.log('New client connected');
});