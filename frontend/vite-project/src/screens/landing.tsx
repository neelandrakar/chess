import { useNavigate } from 'react-router-dom';
import { PlayButton } from '../components/play_button';

export const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center">
      <div className="pt-8 max-w-screen lg">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex justify-center">
            <img src={'/chess_img.png'} className="max-w-150" />
          </div>
          <div className="p-16">
            <div className="flex justify-center">
              <h1 className="text-4xl font-bold text-white">Play Chess online on the #2 site</h1>
            </div>
            <div className="mt-4 flex justify-center">
              <PlayButton
                onClick={() => {
                  navigate('/chess');
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
