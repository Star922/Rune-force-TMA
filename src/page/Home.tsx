import { useEffect, useState, useRef } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";
import { isMobile } from "react-device-detect";
import ProgressBar from "../component/ProgressBar";
import { Link } from "react-router-dom";

const Home = () => {
  const { setUser } = useGlobalContext();
  const address = useTonAddress();
  console.log("address: ", address);
  const [token, setToken] = useState<number>(0);
  const [remainedEnergy, setRemainedEnergy] = useState(2000);

  const [modalVisible, setModalVisible] = useState(false);

  const buttonWrapperRef = useRef<HTMLDivElement>(null);

  const closeWalletModal = () => {
    setModalVisible(false);
  };

  const handleTonButtonClick = () => {
    if (buttonWrapperRef.current) {
      const tonConnectButton = (buttonWrapperRef.current as any).querySelector(
        "button"
      ); // Adjust selector if necessary
      if (tonConnectButton) {
        tonConnectButton.click();
      }
    }
  };

  function formatNumberWithCommas(number: number, locale = "en-US") {
    return new Intl.NumberFormat(locale).format(number);
  }

  const bodyRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (event: any) => {
    event.preventDefault();
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left; // x position within the target
    const y = event.clientY - rect.top; // y position within the target

    // Step 1: Create and append a <style> element
    const styleElement = document.createElement("style");
    document.head.appendChild(styleElement);

    // Step 2: Define the @keyframes animation
    styleElement.sheet &&
      styleElement.sheet.insertRule(
        "@keyframes  fade-out-top-right {0% {opacity: 1; transform: translateY(0); } 100% {opacity: 0;transform: translateY(-100%);}}",
        0
      );

    // Create a new div element
    const newDiv = document.createElement("div");
    newDiv.textContent = "+1";
    newDiv.style.position = "absolute";
    newDiv.style.left = `${x}px`;
    newDiv.style.top = `${y - 50}px`;
    newDiv.style.color = "white";
    newDiv.className =
      "dynamic-div animate-fadeouttopright transform max-sm:text-3xl text-5xl font-bold transition not-selectable"; // You can add Tailwind classes here if needed

    // Append the new div to the body

    bodyRef.current && bodyRef.current.appendChild(newDiv);
    const interval = setTimeout(() => newDiv && newDiv.remove(), 400);

    return () => clearTimeout(interval);
  };

  const handleTap = (event: any) => {
    if (!address) {
      setModalVisible(true);
      return;
    }
    if (remainedEnergy > 0) {
      setRemainedEnergy(remainedEnergy - 1);
      localStorage.setItem("remainedEnergy", String(remainedEnergy - 1));
      if (token === null) {
        setToken(1);
      } else {
        setToken(token + 1);
      }
      handleClick(event);
    }
  };

  const handleMultiTouchStart = (event: TouchEvent) => {
    // Iterate over each touch point
    Array.from(event.touches).forEach((touch) => {
      console.log("Touch's current position:", touch);
      // Call handleClick for each touch point
      handleClick({
        ...touch,
        target: event.target,
        preventDefault: () => {}, // Mock preventDefault for non-MouseEvent
        clientX: touch.clientX,
        clientY: touch.clientY,
        touches: [],
        targetTouches: [],
        changedTouches: [],
      });
    });
  };

  const handleTouch = (event: any) => {
    if (!address) {
      setModalVisible(true);
      return;
    }
    const length = event.touches.length;
    console.log(event, length);
    if (remainedEnergy - length >= 0 && length >= 1) {
      setRemainedEnergy(remainedEnergy - length);
      setToken(token + length);
      handleMultiTouchStart(event);
    }
  };

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

  return (
    <div className="w-full h-screen flex flex-col p-3">
      <div className="flex flex-col h-full relative items-center justify-around">
        <div
          className="relative justify-center items-center w-full h-[50px] mb-2"
          ref={buttonWrapperRef}
        >
          <TonConnectButton className="absolute right-0" />
        </div>
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
            {formatNumberWithCommas(token!)}
          </div>
        </div>

        <div
          className="flex justify-center items-center not-selectable relative"
          ref={bodyRef}
          onTouchStart={(e) => {
            if (!isMobile) return;
            handleTouch(e);
          }}
          onClick={(e) => {
            console.log("clickEvent: ", e);
            handleTap(e);
          }}
        >
          <img
            src="/image/ellipse.png"
            alt="coin"
            className="absolute scale-[1.3] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-auto"
          ></img>
          <img
            src="/image/HealthHero.png"
            alt="coin"
            className={`h-[45vh] z-10 ${
              remainedEnergy > 0
                ? "cursor-pointer"
                : "cursor-not-allowed opacity-50"
            }`}
          ></img>
        </div>
        <div className="w-full">
          <div className="flex flex-col items-center not-selectable w-full">
            <div className="w-full px-10">
              <div className="flex justify-between items-baseline w-full mb-2">
                <span className="font-press-start text-[#9E9E9E] text-[10px] font-bold">
                  Today’s Tap Limit
                </span>
                <h3 className="text-500 text-xl font-bold">{remainedEnergy}</h3>
              </div>
              <ProgressBar value={remainedEnergy * 0.05} />
            </div>
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
      {modalVisible && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center"
            onClick={() => setModalVisible(false)}
          ></div>

          <div className="fixed bottom-0 left-0 right-0 p-4 shadow-lg bg-[#1E3D4B] rounded-t-2xl flex flex-col justify-center gap-4 animate-slide-in-bottom transform transition-all max-h-[80vh] overflow-y-auto">
            <div className="flex justify-end w-full h-12">
              <button
                className="text-black bg-[#4F7383] p-1 rounded-full"
                onClick={closeWalletModal}
                style={{
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/image/icon/close_icon.svg"
                  alt="close"
                  className="w-4 h-4"
                />
              </button>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/image/icon/connect_wallet.svg"
                alt="connectButton"
                className="w-20 h-25"
              />
            </div>
            <p className="text-3xl font-bold text-center mb-2">
              Please connect the <br></br>wallet first!
            </p>
            <div
              className="flex text-xl justify-center items-center w-full h-16 px-2 py-1 bg-gradient-to-r from-[#07AEEA] to-[#D3984E] rounded-xl cursor-pointer gap-2"
              onClick={handleTonButtonClick}
            >
              <img src="/image/icon/union.svg" alt="tonbuttonicon" />
              Connnect TON Wallet
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
