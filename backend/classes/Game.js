import { Chess } from 'chess.js'
import { type } from 'os';
import { GAME_OVER, INIT_GAME, MOVE } from '../variables/variables.js';

export class Game {
  constructor(player1, player2, board, moves, startTime) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess()
    this.moves = []
    this.moveCount = 0;
    this.startTime = new Date()

    this.player1.send(JSON.stringify({
      type: INIT_GAME,
      payload: {
        color: 'white'
      }
    }))
    this.player2.send(JSON.stringify({
      type: INIT_GAME,
      payload: {
        color: 'black'
      }
    }))
  }

  makeMove(socket, move) {


    if (this.moveCount % 2 == 0 && socket != this.player1) {
      console.log(`return 1`)
      return
    }

    if (this.moveCount % 2 == 1 && socket != this.player2) {
      console.log(`return 2`)
      return
    }

    try {
      this.board.move(move)

    } catch (e) {
      // Send an invalid move message to the client who attempted the move
      socket.send(JSON.stringify({
        type: INVALID_MOVE,
        payload: {
          message: 'Invalid move',
          move
        }
      }));
      console.log(`Invalid move attempted: ${JSON.stringify(move)}`);
      return;
    }

    if (this.board.isGameOver()) {


      this.player1.send(JSON.stringify({
        type: GAME_OVER,
        payload: {
          winner: this.board.turn() == 'w' ? 'black' : 'white'
        }
      }));

      this.player2.send(JSON.stringify({
        type: GAME_OVER,
        payload: {
          winner: this.board.turn() == 'w' ? 'black' : 'white'
        }
      }));
      return
    }

    console.log('hello')

    if (this.moveCount % 2 == 0) {
      this.player2.send(JSON.stringify({
        type: MOVE,
        payload: move
      }))
    } else {
      this.player1.send(JSON.stringify({
        type: MOVE,
        payload: move
      }))
    }

    this.moveCount++;
  }
}