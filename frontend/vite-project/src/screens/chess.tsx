import { Chessboard } from './chessboard';

export const Game = () => {
  return (
    <div className="flex justify-center">
      <div className="pt-8 max-w-screen-lg">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Chessboard />
          </div>
          <div>
            <button className="cursor-pointer">Play</button>
          </div>
        </div>
      </div>
    </div>
  );
};
