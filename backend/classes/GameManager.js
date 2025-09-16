import { WebSocket } from 'ws';
import { MOVE, INIT_GAME } from '../variables/variables.js';
import { Game } from './Game.js'

export class GameManager {
  constructor() {
    this.games = [];
    this.pendingUser = null;
    this.users = [];
  }

  addUser(socket) {
    this.users.push(socket);
    this.addHandler(socket);

  }

  removeUser(socket) {
    this.users = this.users.filter(user => user !== socket);

    if (this.pendingUser === socket) {
      this.pendingUser = null;
    }

    this.games = this.games.filter(game => {
      if (game.player1 === socket || game.player2 === socket) {
        const otherPlayer = game.player1 === socket ? game.player2 : game.player1;
        if (otherPlayer && otherPlayer.readyState === WebSocket.OPEN) {
          otherPlayer.send(JSON.stringify({ type: 'opponent_disconnected' }));
        }
        return false;
      }
      return true;
    });
  }

  addHandler(socket) {
    socket.on('message', (data) => {
      try {
        const message = JSON.parse(data.toString());

        if (message.type == INIT_GAME) {

          if (this.pendingUser) {
            //start the game
            console.log(`player2 has joined`)
            const game = new Game(this.pendingUser, socket);
            this.games.push(game);
            this.pendingUser = null;
            console.log('game initiated')

          } else {
            this.pendingUser = socket;
            console.log(`player1 has joined`)
          }

        } else if (message.type == MOVE) {
          const game = this.games.find(game => game.player1 == socket || game.player2 == socket);
          if (game) {
            game.makeMove(socket, message.move);
          } else {
            console.log(`game is not found`)
          }
        }

      } catch (error) {
        console.error('Error processing message:', error);
      }
    });

    socket.on('close', () => {
      this.removeUser(socket);
    });

    socket.on('error', (error) => {
      console.error('WebSocket error:', error);
      this.removeUser(socket);
    });
  }
}

