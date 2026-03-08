"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Models } from "appwrite";
import ComponentUIGradientImage from "@/components/UI/GradientImage";

type WeddingGreetingsProps = {
  theme?: "light" | "dark";
};

type AttendanceOption = "Hadir" | "Tidak hadir";

type GreetingDocument = Models.Document & {
  name: string;
  content: string;
  kehadiran: AttendanceOption;
  createdAt?: string;
};

const dividerImage =
  "https://storage.googleapis.com/stateless-swalapatra-com/2022/12/345dfe2b-leaves-gold-divider-ptsd9ydbcwhhbb2jkonn21n0w8vtqyp4vffp5pvtba.png";
const INVITED_NAME_STORAGE_KEY = "invitedName";
const ATTENDANCE_SUBMITTED_PREFIX = "weddingAttendanceSubmitted";
const ATTENDANCE_ANSWER_PREFIX = "weddingAttendanceAnswer";

const getVisitorStorageId = (value: string) =>
  encodeURIComponent((value.trim() || "guest").toLowerCase());
const normalizePersonName = (value: string) =>
  value.trim().toLowerCase().replace(/\s+/g, " ");

const formatDate = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const getInitials = (fullName: string) =>
  fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

const requestJson = async <T,>(url: string, init?: RequestInit) => {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  const data = (await response.json().catch(() => null)) as
    | { message?: string }
    | T
    | null;

  if (!response.ok) {
    const message =
      typeof data === "object" && data && "message" in data
        ? (data as { message?: string }).message
        : undefined;
    throw new Error(message || "Terjadi kesalahan.");
  }

  return data as T;
};

const fetchGreetings = async () => {
  const data = await requestJson<{ documents: GreetingDocument[] }>("/api/comment");
  return data.documents ?? [];
};

export default function WeddingGreetings({
  theme = "light",
}: WeddingGreetingsProps) {
  const isDark = theme === "dark";
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [attendance, setAttendance] = useState("");
  const [prefilledName, setPrefilledName] = useState("");
  const [isNameLocked, setIsNameLocked] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [hasSubmittedLocally, setHasSubmittedLocally] = useState(false);
  const [shouldVerifyStoredAttendance, setShouldVerifyStoredAttendance] =
    useState(false);
  const [submittedAttendance, setSubmittedAttendance] =
    useState<AttendanceOption | null>(null);
  const queryClient = useQueryClient();

  const {
    data: greetings = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["wedding-greetings"],
    queryFn: fetchGreetings,
  });

  useEffect(() => {
    try {
      const storedInvitedName =
        localStorage.getItem(INVITED_NAME_STORAGE_KEY)?.trim() ?? "";
      const storageId = getVisitorStorageId(storedInvitedName);
      const submittedKey = `${ATTENDANCE_SUBMITTED_PREFIX}:${storageId}`;
      const attendanceKey = `${ATTENDANCE_ANSWER_PREFIX}:${storageId}`;
      const isAlreadySubmitted = localStorage.getItem(submittedKey) === "1";
      const storedAttendance = localStorage.getItem(attendanceKey);

      if (storedInvitedName) {
        setName(storedInvitedName);
        setPrefilledName(storedInvitedName);
        setIsNameLocked(true);
      }

      if (storedAttendance === "Hadir" || storedAttendance === "Tidak hadir") {
        setAttendance(storedAttendance);
        setSubmittedAttendance(storedAttendance);
      }

      setHasSubmittedLocally(isAlreadySubmitted);
      setShouldVerifyStoredAttendance(isAlreadySubmitted);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const createMutation = useMutation({
    mutationFn: async (payload: {
      name: string;
      content: string;
      kehadiran: AttendanceOption;
      createdAt: string;
      localStorageId: string;
    }) => {
      return requestJson<{ document: GreetingDocument }>("/api/comment", {
        method: "POST",
        body: JSON.stringify({
          name: payload.name,
          content: payload.content,
          kehadiran: payload.kehadiran,
          createdAt: payload.createdAt,
        }),
      });
    },
    onSuccess: (_data, variables) => {
      const submittedKey = `${ATTENDANCE_SUBMITTED_PREFIX}:${variables.localStorageId}`;
      const attendanceKey = `${ATTENDANCE_ANSWER_PREFIX}:${variables.localStorageId}`;

      try {
        localStorage.setItem(submittedKey, "1");
        localStorage.setItem(attendanceKey, variables.kehadiran);
      } catch {
        // ignore localStorage failures
      }

      queryClient.invalidateQueries({ queryKey: ["wedding-greetings"] });
      setHasSubmittedLocally(true);
      setShouldVerifyStoredAttendance(false);
      setSubmittedAttendance(variables.kehadiran);
      setContent("");
      setAttendance("");
      setName(isNameLocked ? prefilledName : "");
    },
  });

  useEffect(() => {
    if (!isHydrated || !shouldVerifyStoredAttendance) return;
    if (isLoading || isError) return;

    const visitorName = (prefilledName || name).trim();
    const normalizedVisitorName = normalizePersonName(visitorName);
    const isVisitorInGreetings = greetings.some(
      (greeting) => normalizePersonName(greeting.name) === normalizedVisitorName,
    );

    if (visitorName && isVisitorInGreetings) {
      setShouldVerifyStoredAttendance(false);
      return;
    }

    const storageId = getVisitorStorageId(visitorName);
    const submittedKey = `${ATTENDANCE_SUBMITTED_PREFIX}:${storageId}`;
    const attendanceKey = `${ATTENDANCE_ANSWER_PREFIX}:${storageId}`;

    try {
      localStorage.removeItem(submittedKey);
      localStorage.removeItem(attendanceKey);
    } catch {
      // ignore localStorage failures
    }

    setHasSubmittedLocally(false);
    setSubmittedAttendance(null);
    setAttendance("");
    setShouldVerifyStoredAttendance(false);
  }, [
    greetings,
    isError,
    isHydrated,
    isLoading,
    name,
    prefilledName,
    shouldVerifyStoredAttendance,
  ]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedContent = content.trim();
    const trimmedAttendance = attendance.trim();
    if (
      !trimmedName ||
      !trimmedContent ||
      (trimmedAttendance !== "Hadir" && trimmedAttendance !== "Tidak hadir")
    )
      return;

    createMutation.mutate({
      name: trimmedName,
      content: trimmedContent,
      kehadiran: trimmedAttendance,
      createdAt: new Date().toISOString(),
      localStorageId: getVisitorStorageId(trimmedName),
    });
  };

  const isSaving = createMutation.isPending;
  const totalLabel = isLoading ? "..." : greetings.length;

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
          {totalLabel} Wishes
        </div>
      </div>

      {!isHydrated ? (
        <div
          className={clsx(
            "rounded-2xl border p-5 text-center text-sm",
            isDark
              ? "border-neutral-800 bg-neutral-900/60 text-neutral-400"
              : "border-gray-100 bg-white text-gray-500",
          )}
        >
          Memuat status kehadiran...
        </div>
      ) : hasSubmittedLocally ? (
        <div
          className={clsx(
            "rounded-2xl border p-5 text-center text-sm",
            isDark
              ? "border-emerald-500/30 bg-emerald-400/10 text-emerald-200"
              : "border-emerald-200 bg-emerald-50 text-emerald-700",
          )}
        >
          Terima kasih, Anda sudah mengisi kehadiran
          {submittedAttendance ? ` (${submittedAttendance})` : ""}.
        </div>
      ) : (
        <div
          className={clsx(
            "rounded-2xl border p-5 text-center text-sm",
            isDark
              ? "border-neutral-800 bg-neutral-900/60 text-neutral-300"
              : "border-gray-100 bg-white text-gray-600",
          )}
        >
          <p>Isi buku tamu jika berkenan. Tidak wajib saat pertama membuka undangan.</p>
        </div>
      )}

      <div className="space-y-3">
        {isError ? (
          <div
            className={clsx(
              "rounded-2xl border p-5 text-center text-sm",
              isDark
                ? "border-neutral-800 bg-neutral-900/60 text-neutral-400"
                : "border-gray-100 bg-white text-gray-500",
            )}
          >
            {(error as Error)?.message || "Gagal memuat ucapan."}
          </div>
        ) : isLoading ? (
          <div
            className={clsx(
              "rounded-2xl border p-5 text-center text-sm",
              isDark
                ? "border-neutral-800 bg-neutral-900/60 text-neutral-400"
                : "border-gray-100 bg-white text-gray-500",
            )}
          >
            Memuat ucapan...
          </div>
        ) : greetings.length === 0 ? (
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
              key={greeting.$id}
              className={clsx(
                "rounded-2xl border p-5",
                isDark
                  ? "border-neutral-800 bg-neutral-900/80"
                  : "border-gray-100 bg-white",
              )}
            >
              <div className="space-y-2">
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
                  <p
                    className={clsx(
                      "text-sm font-semibold",
                      isDark ? "text-neutral-100" : "text-gray-800",
                    )}
                  >
                    {greeting.name}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={clsx(
                        "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                        greeting.kehadiran === "Hadir"
                          ? isDark
                            ? "bg-emerald-400/10 text-emerald-300"
                            : "bg-emerald-100 text-emerald-700"
                          : isDark
                            ? "bg-rose-400/10 text-rose-300"
                            : "bg-rose-100 text-rose-700",
                      )}
                    >
                      {greeting.kehadiran}
                    </span>
                    <span
                      className={clsx(
                        "text-[10px]",
                        isDark ? "text-neutral-500" : "text-gray-400",
                      )}
                    >
                      {formatDate(greeting.createdAt ?? greeting.$createdAt)}
                    </span>
                  </div>
                </div>
                <p
                  className={clsx(
                    "text-sm leading-relaxed",
                    isDark ? "text-neutral-400" : "text-gray-600",
                  )}
                >
                  {greeting.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div
        className={clsx(
          "rounded-2xl border p-5",
          isDark
            ? "border-neutral-800 bg-neutral-900/80 text-neutral-100"
            : "border-gray-100 bg-white text-gray-800",
        )}
      >
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Konfirmasi Kehadiran</h3>
          <p className={clsx("mt-1 text-sm", isDark ? "text-neutral-400" : "text-gray-500")}>
            Form ini opsional dan sekarang bisa diisi kapan saja.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
                "mt-2 w-full rounded-lg border px-4 py-2.5 focus:border-amber-400 focus:outline-none",
                isDark
                  ? "border-neutral-700 bg-neutral-900 text-neutral-100 placeholder:text-neutral-500"
                  : "border-gray-300 text-gray-700 placeholder:text-gray-400",
              )}
              // disabled={isSaving}
              // readOnly={isNameLocked}
              maxLength={100}
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
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className={clsx(
                "mt-2 w-full rounded-lg border px-4 py-2.5 focus:border-amber-400 focus:outline-none",
                isDark
                  ? "border-neutral-700 bg-neutral-900 text-neutral-100 placeholder:text-neutral-500"
                  : "border-gray-300 text-gray-700 placeholder:text-gray-400",
              )}
              disabled={isSaving}
              maxLength={102}
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
                "mt-2 w-full rounded-lg border px-4 py-2.5 focus:border-amber-400 focus:outline-none",
                isDark
                  ? "border-neutral-700 bg-neutral-900 text-neutral-100"
                  : "border-gray-300 text-gray-700",
              )}
              disabled={isSaving}
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
              "w-full rounded-lg px-5 py-2.5 text-sm font-medium",
              isDark
                ? "bg-amber-400 text-neutral-900 hover:bg-amber-300"
                : "bg-amber-500 text-white hover:bg-amber-600",
            )}
            disabled={isSaving}
          >
            {isSaving ? "Menyimpan..." : "Kirim"}
          </button>

          {createMutation.isError ? (
            <p className={clsx("text-xs", isDark ? "text-rose-300" : "text-rose-600")}>
              {(createMutation.error as Error)?.message || "Gagal mengirim ucapan."}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
