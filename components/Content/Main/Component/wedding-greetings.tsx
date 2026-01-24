"use client";

import { useState } from "react";

type WeddingGreetingsProps = {
  theme?: "light" | "dark";
};

type GreetingItem = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

export default function WeddingGreetings({
  theme = "light",
}: WeddingGreetingsProps) {
  const isDark = theme === "dark";
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [greetings, setGreetings] = useState<GreetingItem[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedMessage) return;

    setGreetings((prev) => [
      {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        name: trimmedName,
        message: trimmedMessage,
        createdAt: new Date().toLocaleString("id-ID", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
      },
      ...prev,
    ]);
    setName("");
    setMessage("");
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className={`space-y-4 rounded-2xl border p-6 shadow-lg ${
          isDark
            ? "border-neutral-800 bg-neutral-900/80"
            : "border-gray-100 bg-white"
        }`}
      >
        <div>
          <label
            className={`block text-sm font-medium ${
              isDark ? "text-neutral-200" : "text-gray-700"
            }`}
          >
            Nama
          </label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={`mt-2 w-full rounded-xl border px-4 py-2 focus:border-amber-400 focus:outline-none ${
              isDark
                ? "border-neutral-700 bg-neutral-900 text-neutral-100 placeholder:text-neutral-500"
                : "border-gray-200 text-gray-700 placeholder:text-gray-400"
            }`}
            placeholder="Nama Anda"
          />
        </div>
        <div>
          <label
            className={`block text-sm font-medium ${
              isDark ? "text-neutral-200" : "text-gray-700"
            }`}
          >
            Ucapan & Doa
          </label>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className={`mt-2 w-full rounded-xl border px-4 py-2 focus:border-amber-400 focus:outline-none ${
              isDark
                ? "border-neutral-700 bg-neutral-900 text-neutral-100 placeholder:text-neutral-500"
                : "border-gray-200 text-gray-700 placeholder:text-gray-400"
            }`}
            rows={4}
            placeholder="Tuliskan ucapan terbaik Anda"
          />
        </div>
        <button
          type="submit"
          className={`w-full rounded-full px-4 py-3 text-sm font-semibold shadow-md transition ${
            isDark
              ? "bg-amber-400 text-neutral-900 hover:bg-amber-300"
              : "bg-amber-500 text-white hover:bg-amber-600"
          }`}
        >
          Kirim Ucapan
        </button>
      </form>

      <div className="space-y-3">
        {greetings.length === 0 ? (
          <div
            className={`rounded-2xl border p-5 text-center text-sm ${
              isDark
                ? "border-neutral-800 bg-neutral-900/60 text-neutral-400"
                : "border-gray-100 bg-white text-gray-500"
            }`}
          >
            Belum ada ucapan. Jadilah yang pertama memberi doa.
          </div>
        ) : (
          greetings.map((greeting) => (
            <div
              key={greeting.id}
              className={`rounded-2xl border p-5 ${
                isDark
                  ? "border-neutral-800 bg-neutral-900/80"
                  : "border-gray-100 bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      isDark ? "text-neutral-100" : "text-gray-800"
                    }`}
                  >
                    {greeting.name}
                  </p>
                  <p
                    className={`mt-1 text-sm ${
                      isDark ? "text-neutral-400" : "text-gray-600"
                    }`}
                  >
                    {greeting.message}
                  </p>
                </div>
                <span
                  className={`text-xs ${
                    isDark ? "text-neutral-500" : "text-gray-400"
                  }`}
                >
                  {greeting.createdAt}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
