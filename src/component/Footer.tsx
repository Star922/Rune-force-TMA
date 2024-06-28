import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  return (
    <div className="flex justify-around items-center">
      <Link
        to="/rank"
        className={`flex flex-col items-center mt-3 transform origin-bottom justify-center cursor-pointer transform origin-bottom transition ${
          location.pathname === "/rank" ? "scale-[110%] opacity-100" : "opacity-40"
        }`}
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
        className={`flex flex-col items-center mt-3 transform origin-bottom justify-center cursor-pointer transform origin-bottom transition ${
          location.pathname === "/" ? "scale-[110%] opacity-100" : "opacity-40"
        }`}
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
        className={`flex flex-col items-center mt-3 transform origin-bottom justify-center cursor-pointer transform origin-bottom transition ${
          location.pathname === "/tasks" ? "scale-[110%] opacity-100" : "opacity-40"
        }`}
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
