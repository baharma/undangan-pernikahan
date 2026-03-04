"use client";
import clsx from "clsx";
import Image, { StaticImageData } from "next/image";
import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const fitVariants = {
  cover: "object-cover",
  contain: "object-contain",
} as const;

const MAX_IMAGE_QUALITY = 55;
const MIN_IMAGE_QUALITY = 30;
const DEFAULT_IMAGE_SIZES =
  "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px";

type FitVariant = keyof typeof fitVariants;

interface GradientImagePropsType {
  src: string | StaticImageData;
  fitVariant?: FitVariant;
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
  title?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  fallbackSrc?: string;
  lazy?: boolean;
  enableLightbox?: boolean;
  unoptimized?: boolean;
  lightboxTrigger?: boolean;
  onLightboxClose?: () => void;
}

function shouldBypassOptimization(src: string | StaticImageData) {
  if (typeof src !== "string") return false;

  return (
    src.startsWith("data:") ||
    src.startsWith("blob:") ||
    /\.svg(?:$|[?#])/i.test(src)
  );
}

function normalizeImageSrc(value: string | StaticImageData) {
  if (typeof value !== "string") return value;

  const trimmed = value.trim();
  if (!trimmed) return trimmed;

  if (
    trimmed.startsWith("/") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("blob:") ||
    /^(https?:)?\/\//i.test(trimmed)
  ) {
    return trimmed;
  }

  return `/${trimmed.replace(/^\.?\//, "")}`;
}

const SkeletonLoader = () => (
  <div className="absolute inset-0 animate-pulse">
    <div className="w-full h-full bg-gray-200">
      <div className="w-full h-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-gray-300 to-transparent bg-[length:200%_100%]" />
    </div>
  </div>
);

// Portal component for the lightbox
const LightboxPortal = ({
  src,
  alt,
  title,
  onClose,
}: {
  src: string | StaticImageData;
  alt: string;
  title?: string;
  onClose: () => void;
}) => {
  // Prevent scrolling when lightbox is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    // We'll use a fixed overlay with a high z-index
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50 p-2"
        aria-label="Close lightbox"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <div className="relative w-[150px] lg:w-[200px] h-full max-w-5xl max-h-[90vh] flex flex-col items-center justify-center">
        <div className="relative w-full h-full flex-1">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            quality={MAX_IMAGE_QUALITY}
            sizes="100vw"
            unoptimized={shouldBypassOptimization(src)}
            priority
          />
        </div>
        {title && (
          <p className="text-white text-center mt-4 text-lg md:text-xl font-plus-jakarta w-[200px] lg:w-[400px]">
            {title}
          </p>
        )}
      </div>
    </div>
  );
};

export default function ComponentUIGradientImage({
  src,
  fitVariant = "cover",
  className = "",
  style,
  alt = "",
  title,
  priority = false,
  quality = MAX_IMAGE_QUALITY,
  sizes,
  fallbackSrc,
  lazy = true,
  unoptimized = false,
  enableLightbox = false,
  lightboxTrigger,
  onLightboxClose,
}: GradientImagePropsType) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const [currentSrc, setCurrentSrc] = useState(() => normalizeImageSrc(src));
  const [fallbackAttempted, setFallbackAttempted] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Handle external lightbox trigger
  useEffect(() => {
    if (lightboxTrigger && enableLightbox) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLightboxOpen(true);
    }
  }, [lightboxTrigger, enableLightbox]);

  // Dynamic import for createPortal to avoid SSR issues or check for document
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    if (fallbackSrc && !fallbackAttempted) {
      setCurrentSrc(normalizeImageSrc(fallbackSrc));
      setFallbackAttempted(true);
      setIsLoading(true);
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  }, [fallbackSrc, fallbackAttempted]);

  const fitClass = useMemo(() => fitVariants[fitVariant], [fitVariant]);
  const resolvedQuality = useMemo(
    () =>
      Math.min(
        Math.max(Math.round(quality), MIN_IMAGE_QUALITY),
        MAX_IMAGE_QUALITY,
      ),
    [quality],
  );
  const resolvedSizes = sizes || DEFAULT_IMAGE_SIZES;
  const isBypassOptimization = useMemo(
    () => shouldBypassOptimization(currentSrc),
    [currentSrc],
  );
  const effectiveUnoptimized = useMemo(
    () => {
      // Force optimization for normal images so payload stays small.
      if (!isBypassOptimization && unoptimized) return false;
      return isBypassOptimization;
    },
    [isBypassOptimization, unoptimized],
  );

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setCurrentSrc(normalizeImageSrc(src));
    setHasError(false);
    setIsLoading(true);
    setFallbackAttempted(false);
    setIsInView(!lazy || priority);
  }, [src, lazy, priority]);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!lazy || priority || isInView || !containerRef.current) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observerRef.current.observe(containerRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [lazy, priority, isInView]);

  const shouldRenderImage = useMemo(
    () => currentSrc && !hasError && isInView,
    [currentSrc, hasError, isInView],
  );

  const showSkeleton = useMemo(
    () =>
      (isLoading && !hasError && currentSrc && isInView) ||
      !currentSrc ||
      hasError,
    [isLoading, hasError, currentSrc, isInView],
  );

  const imageClassName = useMemo(
    () =>
      clsx(
        "transition-opacity duration-300 ease-in-out",
        isLoading ? "opacity-0" : "opacity-100",
        fitClass,
        className,
        enableLightbox ? "cursor-pointer" : "",
      ),
    [isLoading, fitClass, className, enableLightbox],
  );

  const imageStyle = useMemo(
    () => ({
      transition: "opacity 0.3s ease-in-out",
      ...style,
    }),
    [style],
  );

  const handleImageClick = () => {
    if (enableLightbox && !isLoading && !hasError) {
      setIsLightboxOpen(true);
    }
  };

  const handleLightboxClose = () => {
    setIsLightboxOpen(false);
    onLightboxClose?.();
  };

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full h-full"
        onClick={handleImageClick}
      >
        {showSkeleton && <SkeletonLoader />}

        {shouldRenderImage && (
          <Image
            src={currentSrc}
            fill
            alt={alt}
            className={imageClassName}
            style={imageStyle}
            onLoad={handleLoad}
            onError={handleError}
            priority={priority}
            quality={resolvedQuality}
            unoptimized={effectiveUnoptimized}
            sizes={resolvedSizes}
            loading={priority ? "eager" : lazy ? "lazy" : "eager"}
            placeholder="empty"
          />
        )}
      </div>
      {/* Portal for lightbox */}
      {mounted &&
        isLightboxOpen &&
        enableLightbox &&
        createPortal(
          <LightboxPortal
            src={currentSrc}
            alt={alt}
            title={title}
            onClose={handleLightboxClose}
          />,
          document.body,
        )}
    </>
  );
}
