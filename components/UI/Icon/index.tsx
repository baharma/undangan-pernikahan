"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";

type AnimationType = "bounce" | "spin" | "pulse" | "wiggle" | "float" | "none";

interface IconProps {
    children: React.ReactNode;
    className?: string; // Additional classes
    size?: string; // Tailwind text size classes e.g., "text-2xl" or custom styling
    color?: string; // CSS color string
    animation?: AnimationType;
    duration?: number; // Animation duration in seconds
}

export default function ComponentUIIcon({
    children,
    className,
    size,
    color,
    animation = "none",
    duration,
}: IconProps) {
    const iconRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!iconRef.current || animation === "none") return;

        // Clear previous animations if any (handled by useGSAP cleanup usually, but safe to be explicit if switching)
        gsap.killTweensOf(iconRef.current);

        switch (animation) {
            case "bounce":
                gsap.to(iconRef.current, {
                    y: -10,
                    duration: duration || 0.5,
                    yoyo: true,
                    repeat: -1,
                    ease: "power1.inOut",
                });
                break;
            case "float":
                gsap.to(iconRef.current, {
                    y: -6,
                    duration: duration || 1.5,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                });
                break;
            case "spin":
                gsap.to(iconRef.current, {
                    rotation: 360,
                    duration: duration || 1,
                    repeat: -1,
                    ease: "none",
                });
                break;
            case "pulse":
                gsap.to(iconRef.current, {
                    scale: 1.2,
                    duration: duration || 0.5,
                    yoyo: true,
                    repeat: -1,
                    ease: "power1.inOut",
                });
                break;
            case "wiggle":
                gsap.to(iconRef.current, {
                    rotation: 15,
                    duration: duration || 0.2,
                    yoyo: true,
                    repeat: -1,
                    ease: "power1.inOut",
                });
                break;
        }
    }, { scope: iconRef, dependencies: [animation, duration] });

    return (
        <div
            ref={iconRef}
            className={clsx(
                "inline-flex items-center justify-center",
                size,
                className
            )}
            style={{ color }}
        >
            {children}
        </div>
    );
}