"use client";

import clsx from "clsx";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type FloatingOrnamentsProps = {
  imageSrc: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const ornaments = [
  {
    id: "top-left",
    className: "-top-12 -left-10 md:-top-14 md:-left-12",
    flipX: false,
    flipY: false,
    rotate: -8,
    floatX: 6,
    floatY: 10,
    duration: 6.5,
    delay: 0,
  },
  {
    id: "top-right",
    className: "-top-12 -right-10 md:-top-14 md:-right-12",
    flipX: true,
    flipY: false,
    rotate: 8,
    floatX: -6,
    floatY: 10,
    duration: 7.2,
    delay: 0.3,
  },
  {
    id: "bottom-left",
    className: "-bottom-64 -left-12",
    flipX: false,
    flipY: true,
    rotate: 6,
    floatX: 6,
    floatY: -10,
    duration: 6.8,
    delay: 0.2,
  },
  {
    id: "bottom-right",
    className: "-bottom-64 -right-12",
    flipX: true,
    flipY: true,
    rotate: -6,
    floatX: -6,
    floatY: -10,
    duration: 7.5,
    delay: 0.5,
  },
];

export default function FloatingOrnaments({
  imageSrc,
  className,
  size = "md",
}: FloatingOrnamentsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sizeClass =
    size === "sm"
      ? "w-70 md:w-70"
      : size === "lg"
        ? "w-70 md:w-70 lg:w-70"
        : "w-70 md:w-70 lg:w-70";

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const items = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>("[data-ornament]"),
      );
      if (!items.length || prefersReduced) return;

      items.forEach((item) => {
        const baseRotate = Number(item.dataset.rotate ?? 0);
        const floatX = Number(item.dataset.floatX ?? 0);
        const floatY = Number(item.dataset.floatY ?? 0);
        const duration = Number(item.dataset.duration ?? 6);
        const delay = Number(item.dataset.delay ?? 0);

        gsap.set(item, { rotation: baseRotate });
        gsap.to(item, {
          x: floatX,
          y: floatY,
          rotation: baseRotate + 3,
          duration,
          delay,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className={clsx("pointer-events-none absolute inset-0", className)}
      aria-hidden="true"
    >
      {ornaments.map((item) => (
        <img
          key={item.id}
          src={imageSrc}
          alt=""
          className={clsx(
            "absolute opacity-80",
            sizeClass,
            item.className,
          )}
          style={{
            transform: `scaleX(${item.flipX ? -1 : 1}) scaleY(${
              item.flipY ? -1 : 1
            })`,
          }}
          data-ornament
          data-rotate={item.rotate}
          data-float-x={item.floatX}
          data-float-y={item.floatY}
          data-duration={item.duration}
          data-delay={item.delay}
        />
      ))}
    </div>
  );
}
