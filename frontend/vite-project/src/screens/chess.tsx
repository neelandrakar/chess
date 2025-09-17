import { useEffect } from 'react';
import { Chessboard } from '../components/chessboard';
import { PlayButton } from '../components/play_button';
import { useSocket } from '../hooks/useSocket';
import { GAME_OVER, INIT_GAME, MOVE } from '../variables/variables';

export const Game = () => {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) {
      return;
    } else {
      ('currently_connected');
    }

    socket.onmessage = event => {
      const message = JSON.parse(event.data);
      console.log(`message: `, message);
      switch (message.type) {
        case INIT_GAME:
          console.log('GAME INITIALIZED');
          break;
        case MOVE:
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
    <div className="justify-center flex">
      <div className="pt-8 max-w-screen-lg w-full">
        <div className="grid grid-cols-6 gap-4 w-full">
          <div className="cols-span-4 bg-red-200 w-full">
            <Chessboard />
          </div>
          <div>
            <div className="cols-span-2 bg-green-200 w-full">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
