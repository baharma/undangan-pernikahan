"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import {
  FaHeart,
  FaRing,
  FaImages,
  FaCalendarAlt,
  FaGift,
  FaComments,
  FaLightbulb,
  FaRegLightbulb,
  FaPause,
  FaPlay,
} from "react-icons/fa";

type NavItem = {
  id: string;
  label: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { id: "couple", label: "Mempelai", icon: FaHeart },
  { id: "story", label: "Kisah", icon: FaRing },
  { id: "gallery", label: "Galeri", icon: FaImages },
  { id: "event", label: "Acara", icon: FaCalendarAlt },
  { id: "gift", label: "Hadiah", icon: FaGift },
  { id: "greetings", label: "Ucapan", icon: FaComments },
];

type BottomNavigatorProps = {
  theme?: "light" | "dark";
  showLamp?: boolean;
  showMusic?: boolean;
  musicSrc?: string;
  isDark?: boolean;
  onToggleTheme?: () => void;
};

export default function BottomNavigator({
  theme = "light",
  showLamp = false,
  showMusic = false,
  musicSrc,
  isDark = false,
  onToggleTheme,
}: BottomNavigatorProps) {
  const [activeSection, setActiveSection] = useState("couple");
  const isDarkTheme = theme === "dark";
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const container = document.querySelector('[data-scroll-container="true"]');
    if (!container) return;

    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const containerScrollTop = container.scrollTop;
      const scrollPosition = containerScrollTop + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!musicSrc) return;
    audioRef.current = new Audio(musicSrc);
    audioRef.current.loop = true;
    audioRef.current.preload = "none";

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [musicSrc]);

  const handleToggleMusic = async () => {
    if (!audioRef.current) {
      setIsPlaying((prev) => !prev);
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <nav
      className={clsx(
        "sticky bottom-0 z-50 border-t backdrop-blur-sm relative",
        isDarkTheme
          ? "border-neutral-800 bg-neutral-950/90 shadow-black/30"
          : "border-gray-200 bg-white/95 shadow-lg",
      )}
    >
      {showMusic && (
        <button
          type="button"
          aria-pressed={isPlaying}
          onClick={handleToggleMusic}
          className={clsx(
            "absolute -top-[5.5rem] md:-top-[8.5rem] right-6 z-20 flex h-32 w-32 items-center justify-center rounded-full border-2 shadow-lg transition-all duration-300",
            "backdrop-blur-md will-change-transform",
            isDark
              ? "bg-neutral-900/90 text-amber-200 border-amber-600 shadow-amber-200/20"
              : "bg-white/90 text-amber-700 border-amber-600 shadow-amber-200/30",
          )}
          style={{ animation: "float-slow 5s ease-in-out infinite" }}
          title={isPlaying ? "Jeda musik" : "Putar musik"}
        >
          {isPlaying ? (
            <FaPause className="text-base" />
          ) : (
            <FaPlay className="text-base" />
          )}
        </button>
      )}
      {showLamp && onToggleTheme && (
        <button
          type="button"
          aria-pressed={isDark}
          onClick={onToggleTheme}
          className={clsx(
            "absolute -top-42 right-6 z-10 flex h-32 w-32 items-center justify-center rounded-full border-4 shadow-lg transition-all duration-300",
            "backdrop-blur-md will-change-transform",
            isDark
              ? "bg-amber-300/90 text-neutral-900 border-amber-600 shadow-amber-200/30"
              : "bg-white/90 text-amber-600 border-amber-600 shadow-amber-200/30",
          )}
          style={{ animation: "float-slow 6s ease-in-out infinite" }}
          title={isDark ? "Mode terang" : "Mode gelap"}
        >
          {isDark ? (
            <FaLightbulb className="text-lg" />
          ) : (
            <FaRegLightbulb className="text-lg" />
          )}
        </button>
      )}
      <div className="px-3">
        <div className="flex items-center justify-between gap-1 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={clsx(
                  "flex flex-col items-center justify-center gap-1 rounded-2xl px-2.5 py-2 transition-all duration-200",
                  isDarkTheme ? "hover:bg-amber-400/10" : "hover:bg-amber-50",
                  isActive
                    ? isDarkTheme
                      ? "bg-amber-400/10"
                      : "bg-amber-50/70"
                    : "",
                )}
                title={item.label}
              >
                <Icon
                  className={clsx(
                    "text-base transition-colors duration-200",
                    isActive
                      ? isDarkTheme
                        ? "text-amber-300"
                        : "text-amber-600"
                      : isDarkTheme
                        ? "text-neutral-500"
                        : "text-gray-400",
                  )}
                />
                <span
                  className={clsx(
                    "text-[9px] font-medium tracking-wide transition-colors duration-200",
                    isActive
                      ? isDarkTheme
                        ? "text-amber-300"
                        : "text-amber-600"
                      : isDarkTheme
                        ? "text-neutral-500"
                        : "text-gray-500",
                  )}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
