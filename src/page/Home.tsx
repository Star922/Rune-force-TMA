import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";
import ProgressBar from "../component/ProgressBar";
import { Link } from "react-router-dom";

const Home = () => {
  const { setUser } = useGlobalContext();
  const address = useTonAddress();

  const [wallet, setWalletAddress] = useState("");
  console.log("wallet: ", wallet);

  useEffect(() => {
    const webapp = (window as any).Telegram?.WebApp.initDataUnsafe;
    console.log("webapp-------- ", webapp);
    if (webapp && webapp["user"]) {
      setUser({
        username: webapp["user"]["username"],
        id: webapp["user"]["id"],
      });
      console.log("=========>webapp", webapp["user"]);
    }
  }, []);

  useEffect(() => {
    if (address) {
      setWalletAddress(address);
    }
  }, [address]);

  return (
    <div className="w-full h-screen flex flex-col p-3">
      <ToastContainer />
      <div className="relative justify-center items-center w-full h-[50px]">
        <TonConnectButton className="absolute right-0" />
      </div>
      <div className="flex flex-col h-full relative items-center justify-around">
        <div
          className="text-center mt-[10%] text-black font-press-start"
          style={{ WebkitTextStrokeColor: "white" }}
        >
          <div
            className="text-[18px] font-[1000]"
            style={{ WebkitTextStrokeWidth: 1 }}
          >
            Rune Force Points
          </div>
          <div className="text-[64px]" style={{ WebkitTextStrokeWidth: 4 }}>
            0
          </div>
        </div>
        <div className="flex justify-center items-center relative mt-[0%]">
          <img
            src="/image/ellipse.png"
            alt="coin"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-auto"
          ></img>
          <img
            src="/image/HealthHero.png"
            alt="space-ship"
            className="relative z-10 w-64 h-auto"
          ></img>
        </div>
        <div className="w-full">
          <div className="flex flex-col items-center not-selectable w-full">
            <div className="w-full px-10">
              <div className="flex justify-between items-baseline w-full mb-2">
                <span className="font-press-start text-[#9E9E9E] text-[10px] font-bold">
                  Today’s Tap Limit
                </span>
                <h3 className="text-500 text-xl font-bold">2000</h3>
              </div>
              <ProgressBar value={100} />
            </div>

            <Link
              to=""
              className="flex flex-col items-center mt-3 justify-center cursor-pointer transform origin-bottom transition"
            >
              <img
                src="/image/play.png"
                alt="play"
                className="w-12 h-12 p-[1px] rounded-lg"
              />
              <p className="text-md font-bold text-[#E5D0B3]">Play</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
