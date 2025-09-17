import type { Color, PieceSymbol, Square } from 'chess.js';
import { useState } from 'react';
import { MOVE } from '../variables/variables';
import { IconChessBishopFilled, IconChessFilled, IconChessKingFilled, IconChessKnightFilled, IconChessQueenFilled, IconChessRookFilled } from '@tabler/icons-react';
import { FaChessBishop, FaChessKing, FaChessQueen, FaChessPawn, FaChessBoard, FaChessKnight, FaChessRook } from 'react-icons/fa';

export const Chessboard = ({
  board,
  socket,
  setBoard,
  chess,
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
  setBoard: any;
  chess: any;
}) => {
  const [from, setFrom] = useState<null | Square>(null);
  const [to, setTo] = useState<null | Square>(null);

  const getPieceIcon = (type: PieceSymbol, color: Color) => {
    const iconProps = {
      size: 45,
      className: `drop-shadow-[0_0_3px_#4e7837] ${color === 'w' ? 'text-gray-300' : 'text-black'}`,
    };
    switch (type) {
      case 'p':
        return <FaChessPawn {...iconProps} />; // Assuming you have this or use a fallback
      case 'r':
        return <FaChessRook {...iconProps} />;
      case 'n':
        return <FaChessKnight {...iconProps} />;
      case 'b':
        return <FaChessBishop {...iconProps} />;
      case 'q':
        return <FaChessQueen {...iconProps} />;
      case 'k':
        return <FaChessKing {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const squareName = square?.square || null;
              const squareRepresentation = (String.fromCharCode(97 + (j % 8)) + '' + (8 - i)) as Square;

              return (
                <div
                  onClick={() => {
                    if (!from) {
                      setFrom(squareRepresentation);
                    } else {
                      setTo(squareName);

                      const payload = {
                        from: from,
                        to: squareRepresentation,
                      };

                      socket.send(
                        JSON.stringify({
                          type: MOVE,
                          payload: {
                            move: {
                              from,
                              to: squareRepresentation,
                            },
                          },
                        })
                      );
                      chess.move({
                        from,
                        to: squareRepresentation,
                      });
                      setBoard(chess.board());

                      console.log(payload);
                      setFrom(null);
                      setTo(null);
                    }
                  }}
                  key={j}
                  className={`w-16 h-16 ${(i + j) % 2 == 0 ? 'bg-[#eeeed2]' : 'bg-[#4e7837]'}`}
                >
                  <div className="flex justify-center w-full h-full">
                    <div className="cursor-pointer h-full justify-center flex flex-col">{square && getPieceIcon(square.type, square.color)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
