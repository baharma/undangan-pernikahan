"use client";

import { useState } from "react";
import clsx from "clsx";
import { FaRegCopy, FaCheck } from "react-icons/fa";
import FloatingOrnaments from "./floating-ornaments";

const gifts = [
  {
    bank: "Bank Mandiri",
    number: "1450014880492",
    name: "I MADE DEDI SETIAWAN",
    logo: "https://the.invisimple.id/wp-content/uploads/2024/10/mandiri.png",
  },
];

type GiftGivingProps = {
  theme?: "light" | "dark";
};

export default function GiftGiving({ theme = "light" }: GiftGivingProps) {
  const isDark = theme === "dark";
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chipImage =
    "https://the.invisimple.id/wp-content/uploads/2024/10/chip-ilustration.png";

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
    <div className="relative">
      <FloatingOrnaments
        imageSrc="https://the.invisimple.id/wp-content/uploads/2024/09/asset-01-01.png"
        size="sm"
        className="z-0"
      />
      <div className="relative z-10 space-y-5">
        <div
          className={clsx(
            "rounded-2xl border p-4 text-sm backdrop-blur-sm",
            isDark
              ? "border-neutral-800 bg-neutral-900/60 text-neutral-300"
              : "border-gray-200/80 bg-white/80 text-gray-600",
          )}
        >
          Doa restu Anda adalah hadiah terbaik. Jika ingin memberi hadiah,
          silakan transfer ke rekening berikut.
        </div>

        <div className="grid gap-4 md:grid-cols-1">
          {gifts.map((gift) => {
            const isCopied = copiedId === gift.number;

            return (
              <div
                key={gift.number}
                className={clsx(
                  "relative overflow-hidden rounded-3xl border p-6 shadow-sm",
                  isDark
                    ? "border-neutral-800 bg-neutral-900/80"
                    : "border-amber-100/70 bg-white/90",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={gift.logo}
                        alt={`${gift.bank} logo`}
                        className="h-8 w-auto"
                        loading="lazy"
                      />
                      <p
                        className={clsx(
                          "text-sm font-semibold",
                          isDark ? "text-neutral-200" : "text-gray-700",
                        )}
                      >
                        {gift.bank}
                      </p>
                    </div>
                    <div>
                      <p
                        className={clsx(
                          "text-[11px] font-semibold uppercase tracking-[0.2em]",
                          isDark ? "text-neutral-400" : "text-gray-500",
                        )}
                      >
                        No Rekening
                      </p>
                      <p
                        className={clsx(
                          "mt-1 text-lg font-semibold tracking-wider",
                          isDark ? "text-neutral-100" : "text-gray-800",
                        )}
                      >
                        {gift.number}
                      </p>
                    </div>
                    <div>
                      <p
                        className={clsx(
                          "text-[11px] font-semibold uppercase tracking-[0.2em]",
                          isDark ? "text-neutral-400" : "text-gray-500",
                        )}
                      >
                        Atas Nama
                      </p>
                      <p
                        className={clsx(
                          "mt-1 text-sm font-medium",
                          isDark ? "text-neutral-300" : "text-gray-700",
                        )}
                      >
                        {gift.name}
                      </p>
                    </div>
                  </div>

                  <img
                    src={chipImage}
                    alt=""
                    className="h-16 w-auto opacity-80"
                    aria-hidden="true"
                    loading="lazy"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => copyToClipboard(gift.number, gift.number)}
                  className={clsx(
                    "mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition",
                    isDark
                      ? "bg-amber-400 text-neutral-900 hover:bg-amber-300"
                      : "bg-amber-600 text-white hover:bg-amber-700",
                  )}
                >
                  {isCopied ? (
                    <>
                      <FaCheck className="text-xs" />
                      Tersalin
                    </>
                  ) : (
                    <>
                      <FaRegCopy className="text-xs" />
                      Salin
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
