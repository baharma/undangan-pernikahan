"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import ComponentUIGradientImage from "@/components/UI/GradientImage";

const galleryItems = [
  {
    src: "/image/MRX09221.jpg",
    ratio: "portrait",
  },
  {
    src: "/image/MRX09232.jpg",
    ratio: "landscape",
  },
  {
    src: "/image/MRX09252.jpg",
    ratio: "landscape",
  },
  {
    src: "/image/MRX09245.jpg",
    ratio: "landscape",
  },
  {
    src: "/image/MRX09417.jpg",
    ratio: "portrait",
  },
  {
    src: "/image/MRX09433.jpg",
    ratio: "portrait",
  },
  {
    src: "/image/MRX09457.jpg",
    ratio: "portrait",
  },
  {
    src: "/image/MRX09474.jpg",
    ratio: "landscape",
  },
  {
    src: "/image/MRX09591.jpg",
    ratio: "portrait",
  },
  {
    src: "/image/MRX09514.jpg",
    ratio: "portrait",
  },
  {
    src: "/image/MRX09363.jpg",
    ratio: "landscape",
  },
  {
    src: "/image/MRX09312.jpg",
    ratio: "landscape",
  },
];

type GalleryProps = {
  theme?: "light" | "dark";
};

type PanOffset = {
  x: number;
  y: number;
};

export default function Gallery({ theme = "light" }: GalleryProps) {
  const isDark = theme === "dark";
  const totalItems = galleryItems.length;
  const ZOOM_STEP = 0.25;
  const MIN_ZOOM = 1;
  const MAX_ZOOM = 3;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState<PanOffset>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [mounted, setMounted] = useState(false);
  const imageViewportRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  const clampPanOffset = useCallback((x: number, y: number, zoom: number) => {
    if (zoom <= 1 || !imageViewportRef.current) return { x: 0, y: 0 };

    const containerWidth = imageViewportRef.current.clientWidth;
    const containerHeight = imageViewportRef.current.clientHeight;
    const maxX = ((containerWidth * zoom) - containerWidth) / 2;
    const maxY = ((containerHeight * zoom) - containerHeight) / 2;

    return {
      x: Math.min(maxX, Math.max(-maxX, x)),
      y: Math.min(maxY, Math.max(-maxY, y)),
    };
  }, []);

  const closeModal = useCallback(() => {
    setActiveIndex(null);
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setIsDragging(false);
    dragStartRef.current = null;
  }, []);

  const showPrev = useCallback(() => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setIsDragging(false);
    dragStartRef.current = null;
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current - 1 + totalItems) % totalItems;
    });
  }, [totalItems]);

  const showNext = useCallback(() => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setIsDragging(false);
    dragStartRef.current = null;
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current + 1) % totalItems;
    });
  }, [totalItems]);

  const zoomIn = useCallback(() => {
    setZoomLevel((current) => Math.min(MAX_ZOOM, current + ZOOM_STEP));
  }, [MAX_ZOOM, ZOOM_STEP]);

  const zoomOut = useCallback(() => {
    setZoomLevel((current) => Math.max(MIN_ZOOM, current - ZOOM_STEP));
  }, [MIN_ZOOM, ZOOM_STEP]);

  const resetZoom = useCallback(() => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
      if (event.key === "+" || event.key === "=") zoomIn();
      if (event.key === "-" || event.key === "_") zoomOut();
      if (event.key === "0") resetZoom();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, closeModal, resetZoom, showNext, showPrev, zoomIn, zoomOut]);

  useEffect(() => {
    if (zoomLevel <= 1) {
      setPanOffset({ x: 0, y: 0 });
      setIsDragging(false);
      dragStartRef.current = null;
      return;
    }

    setPanOffset((current) => clampPanOffset(current.x, current.y, zoomLevel));
  }, [clampPanOffset, zoomLevel]);

  return (
    <>
      <div className="columns-2 gap-3 md:gap-4">
        {galleryItems.map((item, index) => (
          <div key={item.src} className="mb-3 md:mb-4 break-inside-avoid">
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`w-full overflow-hidden rounded-2xl border shadow-md transition-transform duration-200 hover:scale-[1.01] ${
                item.ratio === "portrait"
                  ? "aspect-[2/3]"
                  : item.ratio === "landscape"
                    ? "aspect-[4/3]"
                    : "aspect-square"
              } ${isDark ? "border-neutral-800 bg-neutral-900" : "border-gray-200 bg-white"}`}
              aria-label={`Lihat foto ${index + 1}`}
            >
              <ComponentUIGradientImage
                fitVariant="cover"
                lazy
                unoptimized
                src={item.src}
                alt={`Gallery wedding ${index + 1}`}
              />
            </button>
          </div>
        ))}
      </div>

      {mounted &&
        activeIndex !== null &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm p-4 md:p-6"
            onClick={(event) => {
              if (event.target === event.currentTarget) closeModal();
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image viewer"
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-3 right-3 md:top-5 md:right-5 z-20 rounded-full bg-white/15 px-3 py-1.5 text-xl text-white hover:bg-white/25"
              aria-label="Tutup galeri"
            >
              ×
            </button>

            <div className="absolute top-3 left-3 md:top-5 md:left-5 z-20 flex items-center gap-2 rounded-full bg-black/45 px-2 py-1 text-white">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  zoomOut();
                }}
                className="rounded-full bg-white/15 px-2 py-1 text-sm hover:bg-white/25"
                aria-label="Zoom out"
              >
                -
              </button>
              <span className="text-xs md:text-sm min-w-10 text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  zoomIn();
                }}
                className="rounded-full bg-white/15 px-2 py-1 text-sm hover:bg-white/25"
                aria-label="Zoom in"
              >
                +
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  resetZoom();
                }}
                className="rounded-full bg-white/15 px-2 py-1 text-[11px] md:text-xs hover:bg-white/25"
                aria-label="Reset zoom"
              >
                Reset
              </button>
            </div>

            <div className="relative mx-auto flex h-full w-full max-w-6xl items-center justify-center gap-2 md:gap-4">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showPrev();
                }}
                className="z-20 rounded-full bg-white/15 px-3 py-2 text-xl text-white hover:bg-white/25"
                aria-label="Foto sebelumnya"
              >
                &#8249;
              </button>

              <div
                ref={imageViewportRef}
                className="relative h-[75vh] w-full max-w-5xl md:h-[85vh] overflow-hidden"
                onWheel={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  if (event.deltaY < 0) {
                    zoomIn();
                    return;
                  }
                  zoomOut();
                }}
                onDoubleClick={(event) => {
                  event.stopPropagation();
                  setZoomLevel((current) => (current === 1 ? 2 : 1));
                }}
                onPointerDown={(event) => {
                  if (zoomLevel <= 1) return;
                  event.preventDefault();
                  event.stopPropagation();
                  dragStartRef.current = {
                    pointerId: event.pointerId,
                    startX: event.clientX,
                    startY: event.clientY,
                    originX: panOffset.x,
                    originY: panOffset.y,
                  };
                  setIsDragging(true);
                  event.currentTarget.setPointerCapture(event.pointerId);
                }}
                onPointerMove={(event) => {
                  if (!dragStartRef.current || zoomLevel <= 1) return;
                  if (dragStartRef.current.pointerId !== event.pointerId) return;

                  const deltaX = event.clientX - dragStartRef.current.startX;
                  const deltaY = event.clientY - dragStartRef.current.startY;
                  setPanOffset(
                    clampPanOffset(
                      dragStartRef.current.originX + deltaX,
                      dragStartRef.current.originY + deltaY,
                      zoomLevel,
                    ),
                  );
                }}
                onPointerUp={(event) => {
                  if (!dragStartRef.current) return;
                  if (dragStartRef.current.pointerId !== event.pointerId) return;
                  dragStartRef.current = null;
                  setIsDragging(false);
                  if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                    event.currentTarget.releasePointerCapture(event.pointerId);
                  }
                }}
                onPointerCancel={(event) => {
                  if (!dragStartRef.current) return;
                  if (dragStartRef.current.pointerId !== event.pointerId) return;
                  dragStartRef.current = null;
                  setIsDragging(false);
                  if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                    event.currentTarget.releasePointerCapture(event.pointerId);
                  }
                }}
                style={{
                  touchAction: zoomLevel > 1 ? "none" : "pan-y",
                  cursor: zoomLevel > 1 ? (isDragging ? "grabbing" : "grab") : "default",
                }}
              >
                <div
                  className={`relative h-full w-full ${isDragging ? "transition-none" : "transition-transform duration-200"}`}
                  style={{
                    transform: `translate3d(${panOffset.x}px, ${panOffset.y}px, 0)`,
                  }}
                >
                  <div
                    className={`relative h-full w-full ${isDragging ? "transition-none" : "transition-transform duration-200"}`}
                    style={{
                      transform: `scale(${zoomLevel})`,
                      transformOrigin: "center center",
                    }}
                  >
                    <Image
                      src={galleryItems[activeIndex].src}
                      alt={`Gallery wedding ${activeIndex + 1}`}
                      fill
                      priority
                      className="object-contain select-none"
                      sizes="100vw"
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showNext();
                }}
                className="z-20 rounded-full bg-white/15 px-3 py-2 text-xl text-white hover:bg-white/25"
                aria-label="Foto berikutnya"
              >
                &#8250;
              </button>
            </div>

            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/35 px-3 py-1 text-xs text-white md:text-sm">
              {activeIndex + 1} / {totalItems}
            </p>
          </div>,
          document.body,
        )}
    </>
  );
}
