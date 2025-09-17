export const PlayButton = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => {
  return (
    <button onClick={onClick} className="px-8 py-4 text-2xl bg-green-600 hover:bg-green-700 text-white font-bold rounded cursor-pointer">
      {children}
    </button>
  );
};
