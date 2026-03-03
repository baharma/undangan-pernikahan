"use client";

import { useEffect, useState } from "react";

const INITIAL_TIME_LEFT = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

function getTimeLeft() {
  const now = new Date();
  const targetDate = new Date(now.getFullYear(), 3, 4, 0, 0, 0, 0); // 4 April
  const diff = Math.max(targetDate.getTime() - now.getTime(), 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

type DateCountDownProps = {
  theme?: "light" | "dark";
};

export default function DateCountDown({ theme = "light" }: DateCountDownProps) {
  const isDark = theme === "dark";
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME_LEFT);

  useEffect(() => {
    const tick = () => {
      setTimeLeft(getTimeLeft());
    };

    const initialTimeoutId = window.setTimeout(tick, 0);
    const intervalId = window.setInterval(tick, 1000);

    return () => {
      window.clearTimeout(initialTimeoutId);
      window.clearInterval(intervalId);
    };
  }, []);

  const countdownItems = [
    { label: "Days", value: String(timeLeft.days) },
    { label: "Hours", value: pad(timeLeft.hours) },
    { label: "Minutes", value: pad(timeLeft.minutes) },
    { label: "Seconds", value: pad(timeLeft.seconds) },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {countdownItems.map((item) => (
        <div
          key={item.label}
          className={`rounded-2xl px-4 py-6 text-center shadow-md ${
            isDark
              ? "bg-neutral-900/70 border border-neutral-800"
              : "bg-white/80"
          }`}
        >
          <div
            className={`text-3xl font-semibold ${
              isDark ? "text-neutral-100" : "text-gray-800"
            }`}
          >
            {item.value}
          </div>
          <div
            className={`text-xs uppercase tracking-[0.25em] mt-2 ${
              isDark ? "text-neutral-400" : "text-gray-500"
            }`}
          >
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
