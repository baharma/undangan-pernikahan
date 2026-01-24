"use client";

import clsx from "clsx";
import { useEffect, useMemo, useRef } from "react";
import { StaticImageData } from "next/image";
import gsap from "gsap";
import ComponentUIGradientImage from "@/components/UI/GradientImage";

type BackgroundTransitionProps = {
  images: Array<string | StaticImageData>;
  intervalMs?: number;
  transitionMs?: number;
  className?: string;
  fitVariant?: "cover" | "contain";
  lazy?: boolean;
  unoptimized?: boolean;
};

const DEFAULT_INTERVAL = 7000;
const DEFAULT_TRANSITION = 1400;

export default function ComponentUIBackgroundTransition({
  images,
  intervalMs = DEFAULT_INTERVAL,
  transitionMs = DEFAULT_TRANSITION,
  className,
  fitVariant = "cover",
  lazy = true,
  unoptimized = false,
}: BackgroundTransitionProps) {
  const safeImages = useMemo(
    () => images.filter(Boolean),
    [images],
  );

  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nextIndexRef = useRef(0);

  useEffect(() => {
    if (safeImages.length < 2) return;

    // Preload all images
    safeImages.forEach((image) => {
      const src = typeof image === "string" ? image : image.src;
      if (typeof window !== "undefined") {
        const preloader = new window.Image();
        preloader.src = src;
      }
    });

    // Set initial opacity for all layers
    containerRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.set(ref, { opacity: index === 0 ? 1 : 0 });
      }
    });

    // Start transition loop
    const startTransition = () => {
      nextIndexRef.current = (nextIndexRef.current + 1) % safeImages.length;

      const currentLayer = containerRefs.current[nextIndexRef.current === 0 ? safeImages.length - 1 : nextIndexRef.current - 1];
      const nextLayer = containerRefs.current[nextIndexRef.current];

      if (currentLayer && nextLayer) {
        gsap.to(currentLayer, {
          opacity: 0,
          duration: transitionMs / 1000,
          ease: "power2.inOut",
        });

        gsap.to(nextLayer, {
          opacity: 1,
          duration: transitionMs / 1000,
          ease: "power2.inOut",
        });
      }
    };

    const intervalId = setInterval(startTransition, intervalMs);

    return () => {
      clearInterval(intervalId);
      gsap.killTweensOf(containerRefs.current);
    };
  }, [safeImages, intervalMs, transitionMs]);

  if (safeImages.length === 0) {
    return <div className={clsx("relative w-full h-full", className)} />;
  }

  return (
    <div className={clsx("relative w-full h-full overflow-hidden", className)}>
      {safeImages.map((image, index) => (
        <div
          key={index}
          ref={(el) => {
            containerRefs.current[index] = el;
          }}
          className="absolute inset-0"
        >
          <ComponentUIGradientImage
            fitVariant={fitVariant}
            lazy={lazy}
            unoptimized={unoptimized}
            priority={index === 0}
            src={image}
          />
        </div>
      ))}
    </div>
  );
}
