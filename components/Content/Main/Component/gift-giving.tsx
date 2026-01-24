"use client";

import { useState } from "react";
import clsx from "clsx";

const gifts = [
  {
    bank: "BCA",
    number: "123 456 7890",
    name: "Listia",
  },
  {
    bank: "Mandiri",
    number: "987 654 3210",
    name: "Dedi",
  },
];

type GiftGivingProps = {
  theme?: "light" | "dark";
};

export default function GiftGiving({ theme = "light" }: GiftGivingProps) {
  const isDark = theme === "dark";
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (number: string, id: string) => {
    try {
      const cleanNumber = number.replace(/\s/g, "");
      await navigator.clipboard.writeText(cleanNumber);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="space-y-5">
      <div
        className={clsx(
          "rounded-2xl border p-4 text-sm",
          isDark ? "border-neutral-800 bg-neutral-900/60 text-neutral-300" : "border-gray-100 bg-white text-gray-600",
        )}
      >
        Doa restu Anda adalah hadiah terbaik. Jika ingin memberi hadiah,
        silakan transfer ke rekening berikut.
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {gifts.map((gift) => {
          const isCopied = copiedId === gift.number;

          return (
            <div
              key={gift.number}
              className={clsx(
                "rounded-2xl border p-5 shadow-sm",
                isDark
                  ? "border-neutral-800 bg-neutral-900/80"
                  : "border-gray-100 bg-white",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p
                    className={clsx(
                      "text-xs font-semibold uppercase tracking-[0.2em]",
                      isDark ? "text-neutral-400" : "text-gray-500",
                    )}
                  >
                    Bank
                  </p>
                  <p
                    className={clsx(
                      "text-lg font-semibold",
                      isDark ? "text-neutral-100" : "text-gray-800",
                    )}
                  >
                    {gift.bank}
                  </p>
                  <p
                    className={clsx(
                      "mt-1 text-sm",
                      isDark ? "text-neutral-400" : "text-gray-500",
                    )}
                  >
                    {gift.name}
                  </p>
                </div>
                <div
                  className={clsx(
                    "rounded-xl px-3 py-1 text-xs font-semibold",
                    isDark
                      ? "bg-amber-400/10 text-amber-200"
                      : "bg-amber-100 text-amber-700",
                  )}
                >
                  Rekening
                </div>
              </div>

              <div
                className={clsx(
                  "mt-4 rounded-xl border px-4 py-3 font-mono text-base tracking-wider",
                  isDark
                    ? "border-neutral-800 bg-neutral-950 text-neutral-200"
                    : "border-gray-200 bg-white text-gray-700",
                )}
              >
                {gift.number}
              </div>

              <button
                type="button"
                onClick={() => copyToClipboard(gift.number, gift.number)}
                className={clsx(
                  "mt-4 w-full rounded-xl px-4 py-2 text-sm font-semibold transition",
                  isDark
                    ? "bg-amber-400 text-neutral-900 hover:bg-amber-300"
                    : "bg-amber-500 text-white hover:bg-amber-600",
                )}
              >
                {isCopied ? "Tersalin" : "Salin Nomor"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
