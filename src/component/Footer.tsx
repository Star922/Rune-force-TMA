import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="flex justify-around items-center">
      <Link
        to="/rank"
        className="flex flex-col items-center mt-3 justify-center cursor-pointer transform origin-bottom transition"
      >
        <img
          src="/image/ranking.png"
          alt="ranking"
          className="w-12 h-12 p-[1px] rounded-lg"
        />
        <p className="text-md font-bold text-[#E5D0B3]">Ranking</p>
      </Link>
      <Link
        to="/"
        className="flex flex-col items-center mt-3 justify-center cursor-pointer transform origin-bottom transition"
      >
        <img
          src="/image/play.png"
          alt="play"
          className="w-12 h-12 p-[1px] rounded-lg"
        />
        <p className="text-md font-bold text-[#E5D0B3]">Play</p>
      </Link>
      <Link
        to="/tasks"
        className="flex flex-col items-center mt-3 justify-center cursor-pointer transform origin-bottom transition"
      >
        <img
          src="/image/quest.png"
          alt="tasks"
          className="w-12 h-12 p-[1px] rounded-lg"
        />
        <p className="text-md font-bold text-[#E5D0B3]">Tasks</p>
      </Link>
    </div>
  );
}
