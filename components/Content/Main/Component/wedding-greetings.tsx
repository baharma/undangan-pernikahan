"use client";

import clsx from "clsx";
import { useState } from "react";
import ComponentUIGradientImage from "@/components/UI/GradientImage";

type WeddingGreetingsProps = {
  theme?: "light" | "dark";
};

type GreetingItem = {
  id: string;
  name: string;
  message: string;
  attendance: "Hadir" | "Tidak hadir";
  createdAt: string;
};

const dividerImage =
  "https://storage.googleapis.com/stateless-swalapatra-com/2022/12/345dfe2b-leaves-gold-divider-ptsd9ydbcwhhbb2jkonn21n0w8vtqyp4vffp5pvtba.png";

const getInitials = (fullName: string) =>
  fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

export default function WeddingGreetings({
  theme = "light",
}: WeddingGreetingsProps) {
  const isDark = theme === "dark";
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState("");
  const [greetings, setGreetings] = useState<GreetingItem[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    const trimmedAttendance = attendance.trim();
    if (!trimmedName || !trimmedMessage || !trimmedAttendance) return;

    setGreetings((prev) => [
      {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        name: trimmedName,
        message: trimmedMessage,
        attendance: trimmedAttendance as GreetingItem["attendance"],
        createdAt: new Date().toLocaleString("id-ID", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
      },
      ...prev,
    ]);
    setName("");
    setMessage("");
    setAttendance("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center gap-3">
        <div className="w-28">
          <ComponentUIGradientImage
            fitVariant="contain"
            lazy
            unoptimized
            src={dividerImage}
            alt="Divider"
          />
        </div>
        <p
          className={clsx(
            "text-sm uppercase tracking-[0.4em]",
            isDark ? "text-amber-200/80" : "text-amber-600/80",
          )}
        >
          Buku Tamu
        </p>
        <div
          className={clsx(
            "inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-semibold",
            isDark
              ? "bg-amber-400/10 text-amber-200"
              : "bg-amber-100 text-amber-700",
          )}
        >
          <span className="text-base">✦</span>
          {greetings.length} Wishes
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className={clsx(
          "space-y-4 rounded-2xl border p-6 shadow-lg",
          isDark
            ? "border-neutral-800 bg-neutral-900/80"
            : "border-gray-100 bg-white",
        )}
      >
        <div>
          <label
            className={clsx(
              "block text-sm font-medium",
              isDark ? "text-neutral-200" : "text-gray-700",
            )}
          >
            Nama
          </label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={clsx(
              "mt-2 w-full rounded-xl border px-4 py-2 focus:border-amber-400 focus:outline-none",
              isDark
                ? "border-neutral-700 bg-neutral-900 text-neutral-100 placeholder:text-neutral-500"
                : "border-gray-200 text-gray-700 placeholder:text-gray-400",
            )}
            placeholder="Nama Anda"
          />
        </div>
        <div>
          <label
            className={clsx(
              "block text-sm font-medium",
              isDark ? "text-neutral-200" : "text-gray-700",
            )}
          >
            Ucapan & Doa
          </label>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className={clsx(
              "mt-2 w-full rounded-xl border px-4 py-2 focus:border-amber-400 focus:outline-none",
              isDark
                ? "border-neutral-700 bg-neutral-900 text-neutral-100 placeholder:text-neutral-500"
                : "border-gray-200 text-gray-700 placeholder:text-gray-400",
            )}
            rows={3}
            placeholder="Tuliskan ucapan terbaik Anda"
          />
        </div>
        <div>
          <label
            className={clsx(
              "block text-sm font-medium",
              isDark ? "text-neutral-200" : "text-gray-700",
            )}
          >
            Konfirmasi Kehadiran
          </label>
          <select
            value={attendance}
            onChange={(event) => setAttendance(event.target.value)}
            className={clsx(
              "mt-2 w-full rounded-xl border px-4 py-2 focus:border-amber-400 focus:outline-none",
              isDark
                ? "border-neutral-700 bg-neutral-900 text-neutral-100"
                : "border-gray-200 text-gray-700",
            )}
          >
            <option value="" disabled>
              Pilih konfirmasi kehadiran
            </option>
            <option value="Hadir">Hadir</option>
            <option value="Tidak hadir">Tidak hadir</option>
          </select>
        </div>
        <button
          type="submit"
          className={clsx(
            "w-full rounded-full px-4 py-3 text-sm font-semibold shadow-md transition",
            isDark
              ? "bg-amber-400 text-neutral-900 hover:bg-amber-300"
              : "bg-amber-500 text-white hover:bg-amber-600",
          )}
        >
          Kirim Ucapan
        </button>
      </form>

      <div className="space-y-3">
        {greetings.length === 0 ? (
          <div
            className={clsx(
              "rounded-2xl border p-5 text-center text-sm",
              isDark
                ? "border-neutral-800 bg-neutral-900/60 text-neutral-400"
                : "border-gray-100 bg-white text-gray-500",
            )}
          >
            Belum ada ucapan. Jadilah yang pertama memberi doa.
          </div>
        ) : (
          greetings.map((greeting) => (
            <div
              key={greeting.id}
              className={clsx(
                "rounded-2xl border p-5",
                isDark
                  ? "border-neutral-800 bg-neutral-900/80"
                  : "border-gray-100 bg-white",
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className={clsx(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                    isDark
                      ? "bg-amber-400/10 text-amber-200"
                      : "bg-amber-100 text-amber-700",
                  )}
                >
                  {getInitials(greeting.name)}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p
                      className={clsx(
                        "text-sm font-semibold",
                        isDark ? "text-neutral-100" : "text-gray-800",
                      )}
                    >
                      {greeting.name}
                    </p>
                    <span
                      className={clsx(
                        "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                        greeting.attendance === "Hadir"
                          ? isDark
                            ? "bg-emerald-400/10 text-emerald-300"
                            : "bg-emerald-100 text-emerald-700"
                          : isDark
                            ? "bg-rose-400/10 text-rose-300"
                            : "bg-rose-100 text-rose-700",
                      )}
                    >
                      {greeting.attendance}
                    </span>
                    <span
                      className={clsx(
                        "text-[10px]",
                        isDark ? "text-neutral-500" : "text-gray-400",
                      )}
                    >
                      {greeting.createdAt}
                    </span>
                  </div>
                  <p
                    className={clsx(
                      "mt-2 text-sm leading-relaxed",
                      isDark ? "text-neutral-400" : "text-gray-600",
                    )}
                  >
                    {greeting.message}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
