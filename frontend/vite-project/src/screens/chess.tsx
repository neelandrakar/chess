import { useEffect, useState } from 'react';
import { Chessboard } from '../components/chessboard';
import { PlayButton } from '../components/play_button';
import { useSocket } from '../hooks/useSocket';
import { GAME_OVER, INIT_GAME, MOVE } from '../variables/variables';
import { Chess } from 'chess.js';

export const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.onmessage = event => {
      const message = JSON.parse(event.data);
      console.log('message: ', message);
      switch (message.type) {
        case INIT_GAME:
          // setChess(new Chess());
          setBoard(chess.board());
          setStarted(true);
          console.log('GAME INITIALIZED');
          break;
        case MOVE:
          console.log('entering move');
          const move = message.payload;
          console.log(`move====> `, move);
          chess.move(move);
          setBoard(chess.board());
          console.log('MOVE MADE');
          break;
        case GAME_OVER:
          console.log('Game over');
          break;
      }
    };
  }, [socket]);

  if (!socket) return <div>Connecting...</div>;

  return (
    <div className="flex justify-center">
      <div className="pt-8 max-w-screen-lg w-full px-4">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-4 flex justify-center">
            <Chessboard chess={chess} setBoard={setBoard} socket={socket} board={board} />
          </div>
          <div className="col-span-2 bg-slate-900 flex justify-center w-full">
            <div className="pt-8">
              {!started && (
                <PlayButton
                  onClick={() => {
                    console.log("let's play");
                    socket.send(
                      JSON.stringify({
                        type: INIT_GAME,
                      })
                    );
                  }}
                >
                  Play
                </PlayButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
