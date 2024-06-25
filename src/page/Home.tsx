
import { useEffect, useState } from 'react';
import Coin from '/image/coin.svg';
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from '../context/GlobalContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";
import axios from 'axios';
import lock from '/image/lock.svg';
import spaceShip from '/image/spaceship.svg';
import { calculateRemainingTime } from '../utils/spaceship';

const Home = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { setUser } = useGlobalContext();
  const address = useTonAddress();

  const [wallet, setWalletAddress] = useState("");
  console.log("wallet: ", wallet)
  const [telUser, setTelUser] = useState<{ username: string; id: string }>({
    username: "",
    id: "",
  });
  const [accountInfo, setAccountInfo] = useState({
    coin: 0,
    lastScore: 0,
    currentTrial: 3
  });

  useEffect(() => {
    const webapp = (window as any).Telegram?.WebApp.initDataUnsafe;
    console.log("webapp-------- ", webapp)
    if (webapp && webapp["user"]) {
      setTelUser({
        username: webapp["user"]["username"],
        id: webapp["user"]["id"],
      });
      setUser({
        username: webapp["user"]["username"],
        id: webapp["user"]["id"],
      })
      console.log("=========>webapp", webapp["user"]);
    }

  }, []);

  const [chargeHour, setChargeHour] = useState({
    resMins: "59",
    resSeconds: "59",
  })
  async function fetchData(walletAddress: string) {
    try {
      axios.post(`${backendUrl}/user/login`, {
        wallet: walletAddress,
        telID: telUser.id,
        username: telUser.username,
      }).then(data => {
        console.log("GetData: ", data.data.data);
        setAccountInfo(data.data.data);
        let intervalId;
        if (data.data.currentTrial === 0) {
          intervalId = setInterval(() => {
            const remainingTime = calculateRemainingTime(data.data.ridTime);
            setChargeHour(remainingTime);
          }, 1000);
        } else {
          clearInterval(intervalId);
        }
      })
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      toast.error("Internal Server Error");
    }
  }

  useEffect(() => {
    if (address) {
      setWalletAddress(address);
      fetchData(address)
    }
  }, [address])

  const navigate = useNavigate();

  const handlePlay = () => {
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }
    navigate('/Tap')
  }
  return (
    <div className="w-full h-full flex flex-col py-[5%] px-3 ">
      <ToastContainer />
      <div className={`ml-auto text-right flex flex-row gap-3 justify-between items-center`}>
        <div className='flex flex-row gap-5 border-2 border-white bg-black rounded-full px-3 py-1 '>
          <img src={Coin} alt='Coin'></img>
          <div>{accountInfo.coin}</div>
        </div>
        <TonConnectButton className="absolute left-3" />
      </div>
      <div className='text-center mt-[6%] text-black font-press-start' style={{ WebkitTextStrokeColor: 'white' }}>
        <div className='text-[32px]' style={{ WebkitTextStrokeWidth: 2 }}>record</div>
        <div className='text-[84px]' style={{ WebkitTextStrokeWidth: 5 }}>{accountInfo.lastScore}</div>
      </div>
      <div className='flex justify-center items-center mt-[0%]'>
        <img src={spaceShip} alt='space-ship'></img>
      </div>
      {
        accountInfo.currentTrial ?
          <div className='flex flex-col justify-center items-center mt-[8%] font-press-start'>
            <div
              className='text-[28px] text-black bg-[#43E0F7] py-6 px-7 rounded-full blur-outline-all'
              onClick={() => { handlePlay() }}
            >
              Play now
            </div>
            <div className='text-[12px] text-black mt-[4vh]'
              style={{ WebkitTextStrokeColor: 'white', WebkitTextStrokeWidth: 0.5 }}>{accountInfo?.currentTrial} trials available</div>
          </div> :
          <div
            className='text-[28px] text-black bg-[#CBEFF9] py-6 px-7 rounded-full blur-outline-all flex flex-row gap-5'
          >
            <img src={lock}></img> New Trials in {chargeHour.resMins + ' : ' + chargeHour.resSeconds}
          </div>
      }
    </div>
  );
}

export default Home;
