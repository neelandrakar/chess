import { useNavigate } from 'react-router-dom';

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
              <button
                onClick={() => {
                  navigate('/chess');
                }}
                className="px-8 py-4 text-2xl bg-green-600 hover:bg-green-700 text-white font-bold rounded cursor-pointer"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
