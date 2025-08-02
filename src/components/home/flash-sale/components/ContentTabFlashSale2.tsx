import { useEffect, useRef, useState } from "react";

const ContentTabFlashSale2 = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const deadlineRef = useRef(Date.now() + 1000 * (12 * 3600 + 49 * 60 + 36));

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = deadlineRef.current - Date.now();

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-x-4 px-4 py-2 rounded">
        <h3 className="text-white text-[1.2rem] font-bold">BẮT ĐẦU SAU:</h3>
        {["hours", "minutes", "seconds"].map((unit, index) => (
          <div key={unit} className="flex items-center gap-1">
            <div className="bg-white text-black px-2 py-1 rounded font-bold min-w-[40px] text-center">
              {timeLeft[unit as keyof typeof timeLeft]}
            </div>
            {index < 2 && (
              <span className="text-white font-bold text-lg">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentTabFlashSale2;
