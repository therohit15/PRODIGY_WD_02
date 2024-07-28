import React, { useState, useEffect, useRef } from "react";

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  const start = () => {
    toggleButton();
    if (isRunning) {
      startButton.innerHTML = "Play";
      setIsRunning(false);
    } else {
      startButton.innerHTML = "Pause";
      setIsRunning(true);
      startTimeRef.current = Date.now() - elapsedTime;
    }
  };

  const toggleButton = () => {
    lapButton.classList.remove(`invisible`);
    resetButton.classList.remove(`invisible`);
  };

  function lap() {
    setIsRunning(false);
  }

  function clearAll() {
    setLaps([]);
    clearAllButton.classList.add(`invisible`);
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
    lapButton.classList.add(`invisible`);
    resetButton.classList.add(`invisible`);
    clearAllButton.classList.add(`invisible`);
    startButton.innerHTML = "Play";
    setLaps([]);
  }

  function formatTime() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }

  const lapTime = () => {
    setLaps([
      ...laps,
      {
        number: laps.length + 1,
        timestamp: formatTime(),
      },
    ]);

    clearAllButton.classList.remove(`invisible`);
  };

  return (
    <main className=" flex justify-center items-center w-full h-screen bg-black">
      <div className="flex justify-center items-center  -mt-96 w-[300px] h-[300px] rounded-full bg-white mb-56">
        <div className="text-[3rem] mr-14 mt-6 font-teko font-bold text-my-black mb-6 ">
          {formatTime()}
        </div>

        <div className="w-[250px] mt-96 flex justify-between items-center gap-6 text-[1.5rem] -ml-72 font-bold font-raleway m-1 min-w-[125px] rounded-lg text-my-black transition-duration-500 ease-in-out -ml-80">
          <button
            onClick={reset}
            id="resetButton"
            className="px-3 py-1 bg-wol-yellow hover:bg-yellow-300 border rounded-full border-yellow-200 invisible"
          >
            Reset
          </button>{" "}
          <button
            onClick={start}
            id="startButton"
            className="px-3 py-1 bg-dp-red hover:bg-red-500 rounded-full border border-yellow-200"
          >
            Play
          </button>{" "}
          <button
            onClick={lapTime}
            id="lapButton"
            className="px-3 py-1 bg-hulk-green hover:bg-green-800 rounded-full border border-green-300 invisible"
          >
            Lap
          </button>
        </div>
      </div>
      <ul className="laps -ml-64  h-[250px] overflow-auto text-white list-none w-[250px] relative py-8 mt-[30px] overflow-y-scroll no-scrollbar">
        {laps.map((lap, index) => (
          <li
            id="lap-item"
            className=" inline-block w-full p-2.5 text-center border border-gray-700 rounded-full mb-3.5"
          >
            <span id="number" className="text-white">
              {lap.number}
            </span>
            <span id="time-stamp" className=" inline-block ml-6">
              {lap.timestamp}
            </span>
          </li>
        ))}
        <button
          id="clearAllButton"
          onClick={clearAll}
          className="block fixed z-1000 bottom-[35px] left-1/2 transform -translate-x-1/2 w-[130px] py-2.5 rounded-full bg-slate-gray bg-opacity-90 border border-white font-raleway text-my-black font-bold text-[1.5rem] invisible"
        >
          Clear All
        </button>
      </ul>
    </main>
  );
}

export default Stopwatch;
