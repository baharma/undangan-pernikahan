"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  FaHeart,
  FaRing,
  FaImages,
  FaCalendarAlt,
  FaGift,
  FaComments,
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
};

export default function BottomNavigator({ theme = "light" }: BottomNavigatorProps) {
  const [activeSection, setActiveSection] = useState("couple");
  const isDark = theme === "dark";

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

  return (
    <nav
      className={clsx(
        "sticky bottom-0 z-50 border-t backdrop-blur-sm",
        isDark
          ? "border-neutral-800 bg-neutral-950/90 shadow-black/30"
          : "border-gray-200 bg-white/95 shadow-lg",
      )}
    >
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
                  isDark ? "hover:bg-amber-400/10" : "hover:bg-amber-50",
                  isActive ? (isDark ? "bg-amber-400/10" : "bg-amber-50/70") : "",
                )}
                title={item.label}
              >
                <Icon
                  className={clsx(
                    "text-base transition-colors duration-200",
                    isActive
                      ? isDark
                        ? "text-amber-300"
                        : "text-amber-600"
                      : isDark
                        ? "text-neutral-500"
                        : "text-gray-400",
                  )}
                />
                <span
                  className={clsx(
                    "text-[9px] font-medium tracking-wide transition-colors duration-200",
                    isActive
                      ? isDark
                        ? "text-amber-300"
                        : "text-amber-600"
                      : isDark
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
