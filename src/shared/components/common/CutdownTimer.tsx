"use client";

import { useState, useEffect } from "react";

function CutdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 8,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;

        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }

        if (minutes < 0) {
          minutes = 59;
          hours--;
        }

        if (hours < 0) {
          hours = 59;
          days--;
        }

        if (days < 0) {
          clearInterval(timer);
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return Object.entries(timeLeft).map(([unit, value]) => (
    <div key={unit} className="flex flex-col items-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white shadow-md sm:h-16 sm:w-16">
        <span className="text-xl font-bold text-blue-950 sm:text-2xl">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="mt-2 text-sm font-medium text-gray-700 capitalize sm:text-base">
        {unit}
      </span>
    </div>
  ));
}

export default CutdownTimer;
