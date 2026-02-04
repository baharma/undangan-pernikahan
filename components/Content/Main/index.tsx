"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ComponentUIBackgroundTransition from "@/components/UI/BackgroundTransition";
import ComponentUIGradientImage from "@/components/UI/GradientImage";
import ComponentUITitle from "@/components/UI/Title";
import ComponentUIIcon from "@/components/UI/Icon";
import BottomNavigator from "@/components/UI/BottomNavigator";
import BrideAndGroom from "./Component/bride-and-groom";
import FloatingOrnaments from "./Component/floating-ornaments";
import DateCountDown from "./Component/date-count-down";
import Story from "./Component/story";
import Gallery from "./Component/gallery";
import GiftGiving from "./Component/gift-giving";
import WeddingGreetings from "./Component/wedding-greetings";
import { FaHeart } from "react-icons/fa";
import {
  generateRandomHearts,
  type RandomHeart,
} from "@/utils/generateRandomHearts";

const MAIN_BG_IMAGES = [
  "https://i.pinimg.com/736x/79/e7/e9/79e7e9f5520a7384979880271f324692.jpg",
  "https://www.bcalife.co.id/storage//articles/wujudkan-pernikahan-sakral-dan-anti-boros-dengan-konsep-intimate-wedding-1718346697.png",
  "https://images.tokopedia.net/blog-tokopedia-com/uploads/2020/02/pernikahan-adat-bali-sumber-bridestory.jpg",
];

type Sparkle = {
  id: number;
  top: number;
  left: number;
  size: number;
  opacity: number;
};

export default function ComponentContentMain() {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? "dark" : "light";
  const leftHeroRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const leftHeroBgRef = useRef<HTMLDivElement>(null);
  const mobileHeroBgRef = useRef<HTMLDivElement>(null);
  const eventHeroBgRef = useRef<HTMLDivElement>(null);
  const [heroSparkles, setHeroSparkles] = useState<Sparkle[]>([]);
  const [mobileSparkles, setMobileSparkles] = useState<Sparkle[]>([]);
  const [hearts, setHearts] = useState<RandomHeart[]>([]);
  const [heartsMounted, setHeartsMounted] = useState(false);

  useEffect(() => {
    const createSparkles = (count: number, sizeMin: number, sizeRange: number) =>
      Array.from({ length: count }, (_, index) => ({
        id: index,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * sizeRange + sizeMin,
        opacity: Math.random() * 0.3 + 0.35,
      }));

    setHeroSparkles(createSparkles(16, 2, 3));
    setMobileSparkles(createSparkles(8, 1.5, 2.5));
  }, []);

  useEffect(() => {
    setHearts(generateRandomHearts(8));
    setHeartsMounted(true);
  }, []);

  useGSAP(
    () => {
      if (!leftHeroRef.current) return;
      const items = leftHeroRef.current.querySelectorAll<HTMLElement>(
        "[data-hero-item]",
      );
      if (!items.length) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const shimmer = leftHeroRef.current.querySelector<HTMLElement>(
        "[data-hero-shimmer]",
      );
      const sparkles = leftHeroRef.current.querySelectorAll<HTMLElement>(
        "[data-sparkle]",
      );

      if (prefersReduced) {
        gsap.set(items, { autoAlpha: 1, y: 0, filter: "none" });
        gsap.set(sparkles, { opacity: 0.6, y: 0, x: 0 });
        if (shimmer) gsap.set(shimmer, { opacity: 0 });
        return;
      }

      gsap.set(items, { autoAlpha: 0, y: 24, filter: "blur(4px)" });
      gsap.to(items, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.1,
      });

      if (shimmer) {
        gsap.fromTo(
          shimmer,
          { xPercent: -130, opacity: 0 },
          {
            xPercent: 130,
            opacity: 0.9,
            duration: 1.6,
            ease: "power2.out",
            delay: 0.35,
          },
        );
      }

      gsap.to(items, {
        y: "-=6",
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.2, from: "random" },
      });
    },
    { scope: leftHeroRef },
  );

  useEffect(() => {
    const root = scrollContainerRef.current;
    if (!root) return;

    const elements = Array.from(
      root.querySelectorAll<HTMLElement>("[data-animate='fade-up']"),
    );
    if (!elements.length) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      gsap.set(elements, { autoAlpha: 1, y: 0, scale: 1, filter: "none" });
      return;
    }

    gsap.set(elements, { autoAlpha: 0, y: 32, scale: 0.98, filter: "blur(6px)" });

    elements.forEach((element) => {
      const layers = element.querySelectorAll<HTMLElement>("[data-layer]");
      if (layers.length) {
        gsap.set(layers, { autoAlpha: 0, y: 18 });
      }
      const shimmer = element.querySelectorAll<HTMLElement>("[data-shimmer]");
      if (shimmer.length) {
        gsap.set(shimmer, { xPercent: -130, opacity: 0 });
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          gsap.to(element, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            overwrite: "auto",
          });

          const layers = element.querySelectorAll<HTMLElement>("[data-layer]");
          if (layers.length) {
            gsap.to(layers, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.12,
              delay: 0.12,
            });
          }

          const shimmer = element.querySelectorAll<HTMLElement>("[data-shimmer]");
          shimmer.forEach((node) => {
            gsap.fromTo(
              node,
              { xPercent: -130, opacity: 0 },
              {
                xPercent: 130,
                opacity: 0.85,
                duration: 1.4,
                ease: "power2.out",
                delay: 0.15,
              },
            );
          });

          if (element.dataset.float === "true") {
            gsap.to(element, {
              y: "-=4",
              duration: 10,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            });
          }
          observer.unobserve(element);
        });
      },
      {
        root,
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = scrollContainerRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const targets = [
      { element: leftHeroBgRef.current, range: 40 },
      { element: mobileHeroBgRef.current, range: 20 },
      { element: eventHeroBgRef.current, range: 26 },
    ];

    if (prefersReduced) {
      targets.forEach(({ element }) => {
        if (element) gsap.set(element, { y: 0 });
      });
      return;
    }

    let frame = 0;

    const updateParallax = () => {
      frame = 0;
      const maxScroll = root.scrollHeight - root.clientHeight;
      const progress = maxScroll > 0 ? root.scrollTop / maxScroll : 0;

      targets.forEach(({ element, range }) => {
        if (!element) return;
        const offset = (progress - 0.5) * range;
        gsap.set(element, { y: offset });
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateParallax);
    };

    onScroll();
    root.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      root.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const targets = [
      ...(leftHeroRef.current?.querySelectorAll<HTMLElement>("[data-sparkle]") ??
        []),
      ...(scrollContainerRef.current?.querySelectorAll<HTMLElement>(
        "[data-sparkle]",
      ) ?? []),
    ];

    if (!targets.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(targets, { opacity: 0.5, y: 0, x: 0 });
      return;
    }

    targets.forEach((sparkle, index) => {
      gsap.to(sparkle, {
        opacity: 0.1,
        y: -8,
        duration: 2.6 + (index % 4) * 0.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: (index % 5) * 0.4,
      });
      gsap.to(sparkle, {
        x: 5,
        duration: 4.5 + (index % 3) * 0.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: (index % 6) * 0.35,
      });
    });

    return () => {
      gsap.killTweensOf(targets);
    };
  }, [heroSparkles, mobileSparkles]);

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Half - Hero Section with Background */}
      <div className="hidden lg:flex lg:flex-1 relative lg:h-screen overflow-hidden order-1 lg:order-1">
        {/* Background Transition */}
        <div
          ref={leftHeroBgRef}
          className="absolute inset-0 will-change-transform"
        >
          <ComponentUIBackgroundTransition
            images={MAIN_BG_IMAGES}
            fitVariant="cover"
            lazy={false}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </div>

        {/* Centered Content - Wedding Info */}
        <div
          ref={leftHeroRef}
          className="relative z-10 lg:h-screen h-[50vh] flex flex-col items-center justify-center p-6 md:p-12 text-center text-white"
        >
          <div className="pointer-events-none absolute inset-0">
            <div
              data-hero-shimmer
              className="absolute -left-1/2 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-70 mix-blend-screen"
            />
            {heroSparkles.map((sparkle) => (
              <span
                key={`hero-sparkle-${sparkle.id}`}
                data-sparkle
                className="absolute rounded-full bg-white/80 blur-[1px]"
                style={{
                  top: `${sparkle.top}%`,
                  left: `${sparkle.left}%`,
                  width: `${sparkle.size}px`,
                  height: `${sparkle.size}px`,
                  opacity: sparkle.opacity,
                }}
              />
            ))}
          </div>
          {/* Wedding Announcement */}
          <div className="space-y-4 md:space-y-6 max-w-lg">
            {/* Pre-title */}
            <p
              data-hero-item
              className="text-sm md:text-xl lg:text-2xl font-light tracking-[0.2em] md:tracking-[0.3em] text-amber-200"
            >
              THE WEDDING OF
            </p>

            {/* Couple Names */}
            <div data-hero-item className="space-y-1 md:space-y-2">
              <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight">
                Listia & Dedi
              </h1>
            </div>

            {/* Divider */}
            <div data-hero-item className="flex items-center justify-center gap-4 py-2 md:py-4">
              <div className="w-12 md:w-16 h-px bg-amber-300/60" />
              <div className="text-amber-300 text-xl md:text-2xl">✦</div>
              <div className="w-12 md:w-16 h-px bg-amber-300/60" />
            </div>

            {/* Date & Time */}
            <div data-hero-item className="space-y-1 md:space-y-2">
              <p className="text-lg md:text-2xl lg:text-3xl font-light tracking-wide">
                Saturday, December 25, 2026
              </p>
              <p className="text-base md:text-xl lg:text-2xl font-light text-amber-200">
                09:00 AM - 13:00 PM
              </p>
            </div>

            {/* Venue */}
            <div data-hero-item className="pt-4 md:pt-6">
              <p className="text-base md:text-lg lg:text-xl font-light italic text-white/90">
                Grand Ballroom, Hotel Indonesia
              </p>
              <p className="text-sm md:text-base text-white/70 mt-1 md:mt-2">
                Jakarta, Indonesia
              </p>
            </div>

            {/* Countdown Timer Preview - Hide on mobile for space */}
            <div data-hero-item className="pt-4 md:pt-6 lg:pt-8 hidden md:block">
              <DateCountDown />
            </div>

            {/* Scroll Indicator - Hide on mobile */}
            <div data-hero-item className="pt-8 md:pt-12 animate-bounce hidden md:block">
              <svg
                className="w-6 h-6 mx-auto text-amber-300"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Right Half - Main Content */}
      <div
        className={clsx(
          "w-full lg:w-1/3 relative order-2 lg:order-2 transition-colors duration-300 flex flex-col overflow-hidden",
          isDark ? "bg-neutral-950 text-neutral-100" : "bg-white text-gray-900",
        )}
      >
        {heartsMounted && (
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            {hearts.map((heart) => (
              <div
                key={`main-heart-${heart.id}`}
                className="absolute"
                style={{
                  top: `${heart.top}%`,
                  left: `${heart.left}%`,
                  opacity: heart.opacity,
                }}
              >
                <ComponentUIIcon
                  size={heart.size}
                  color="#D4AF37"
                  animation="float"
                  duration={heart.duration}
                >
                  <FaHeart />
                </ComponentUIIcon>
              </div>
            ))}
          </div>
        )}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto relative z-10"
          data-scroll-container="true"
        >
          {/* Content Container */}
          <div className="max-w-2xl flex flex-col gap-30 mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 pb-28 space-y-12 md:space-y-16 pt-16 md:pt-20">
            {/* Mobile Mini Hero */}
            <div
              className={clsx(
                "relative overflow-hidden rounded-3xl border lg:hidden",
                isDark
                  ? "border-neutral-800 bg-neutral-950"
                  : "border-gray-200 bg-white",
              )}
              data-animate="fade-up"
              data-float="true"
            >
              <div
                ref={mobileHeroBgRef}
                className="absolute inset-0 will-change-transform"
              >
                <ComponentUIBackgroundTransition
                  images={MAIN_BG_IMAGES}
                  fitVariant="cover"
                  lazy={false}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/80" />
              </div>
              <div className="pointer-events-none absolute inset-0">
                <div
                  data-shimmer
                  className="absolute -left-1/2 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-70 mix-blend-screen"
                />
                {mobileSparkles.map((sparkle) => (
                  <span
                    key={`mobile-sparkle-${sparkle.id}`}
                    data-sparkle
                    className="absolute rounded-full bg-white/80 blur-[1px]"
                    style={{
                      top: `${sparkle.top}%`,
                      left: `${sparkle.left}%`,
                      width: `${sparkle.size}px`,
                      height: `${sparkle.size}px`,
                      opacity: sparkle.opacity,
                    }}
                  />
                ))}
              </div>
              <div className="relative z-10 px-6 py-8 text-center text-white">
                <p
                  className="text-xs tracking-[0.25em] text-amber-200"
                  data-layer
                >
                  THE WEDDING OF
                </p>
                <h2 className="mt-3 text-3xl font-bold" data-layer>
                  Listia & Dedi
                </h2>
                <div
                  className="mx-auto my-4 flex items-center justify-center gap-3"
                  data-layer
                >
                  <span className="h-px w-10 bg-amber-300/60" />
                  <span className="text-amber-300 text-lg">✦</span>
                  <span className="h-px w-10 bg-amber-300/60" />
                </div>
                <p className="text-sm text-white/90" data-layer>
                  Saturday, December 25, 2026
                </p>
                <p className="mt-1 text-xs text-amber-200" data-layer>
                  09:00 AM - 13:00 PM
                </p>
              </div>
            </div>
            {/* Bride & Groom Section */}
            <section
              id="couple"
              className="scroll-mt-20 relative"
              data-animate="fade-up"
              data-float="true"
            >
              <FloatingOrnaments imageSrc="https://the.invisimple.id/wp-content/uploads/2024/09/asset-01-01.png" />
              <div className="text-center mb-10" data-layer>
                <ComponentUITitle
                  className={clsx(
                    "text-3xl",
                    isDark ? "text-neutral-100" : "text-gray-800",
                  )}
                  font="pacifico"
                  as="h2"
                >
                  Mempelai
                </ComponentUITitle>
                <p
                  className={clsx(
                    "mt-2",
                    isDark ? "text-neutral-400" : "text-gray-500",
                  )}
                >
                  Pasangan pengantin
                </p>
              </div>
              <div data-layer>
                <BrideAndGroom theme={theme} />
              </div>
            </section>

            {/* Quote Section */}
            <section
              id="quote"
              className="scroll-mt-20"
              data-animate="fade-up"
              data-float="true"
            >
              {/* Flower Decoration - Top */}
              <div className="flex justify-center mb-8" data-layer>
                <img
                  src="https://storage.googleapis.com/stateless-swalapatra-com/2022/11/db822cc5-flower.png"
                  alt="Flower decoration"
                  className="w-40 h-auto opacity-90"
                />
              </div>

              {/* Quote Card */}
              <div
                className={clsx(
                  "relative rounded-3xl p-8 md:p-12 text-center overflow-hidden",
                  isDark
                    ? "bg-gradient-to-br from-neutral-900 via-neutral-900/95 to-neutral-800 border border-neutral-700/50 shadow-2xl"
                    : "bg-gradient-to-br from-amber-50 via-white to-orange-50 border border-amber-200/60 shadow-xl",
                )}
                data-layer
              >
                <div
                  data-shimmer
                  className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-70 mix-blend-screen"
                />
                {/* Decorative Background Pattern */}
                <div
                  className={clsx(
                    "absolute inset-0 opacity-5",
                    isDark ? "bg-amber-500" : "bg-amber-900",
                  )}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />

                {/* Opening Quote Mark */}
                <div
                  className={clsx(
                    "text-6xl md:text-8xl font-serif leading-none mb-4",
                    isDark ? "text-amber-500/30" : "text-amber-400/40",
                  )}
                >
                  ❝
                </div>

                {/* Sanskrit Quote */}
                <p
                  className={clsx(
                    "relative text-lg md:text-xl lg:text-2xl italic leading-relaxed font-light",
                    isDark ? "text-neutral-200" : "text-gray-800",
                  )}
                >
                  Ihaiva stam ma vi yaustam, visvam ayur vyasnutam, kridantau putrair naptrbhih, modamanau sve grhe.
                </p>

                {/* Closing Quote Mark */}
                <div
                  className={clsx(
                    "text-6xl md:text-8xl font-serif leading-none mt-4",
                    isDark ? "text-amber-500/30" : "text-amber-400/40",
                  )}
                >
                  ❞
                </div>

                {/* Decorative Divider */}
                <div className="flex items-center justify-center gap-4 my-6">
                  <div
                    className={clsx(
                      "w-16 md:w-24 h-px",
                      isDark ? "bg-amber-500/40" : "bg-amber-400/60",
                    )}
                  />
                  <div
                    className={clsx(
                      "text-xl md:text-2xl",
                      isDark ? "text-amber-400" : "text-amber-500",
                    )}
                  >
                    ✦
                  </div>
                  <div
                    className={clsx(
                      "w-16 md:w-24 h-px",
                      isDark ? "bg-amber-500/40" : "bg-amber-400/60",
                    )}
                  />
                </div>

                {/* Reference */}
                <p
                  className={clsx(
                    "text-sm md:text-base font-semibold tracking-wide uppercase",
                    isDark ? "text-amber-400" : "text-amber-600",
                  )}
                >
                  Rg Veda X.85.42
                </p>

                {/* Translation */}
                <p
                  className={clsx(
                    "mt-8 text-sm md:text-base leading-relaxed max-w-xl mx-auto",
                    isDark ? "text-neutral-400" : "text-gray-600",
                  )}
                >
                  Wahai pasangan suami-istri, semoga kalian tetap bersatu dan tidak pernah terpisahkan.
                  Semoga kalian mencapai hidup penuh kebahagiaan, tinggal di rumah yang penuh kegembiraan
                  bersama seluruh keturunanmu.
                </p>
              </div>

              {/* Flower Decoration - Bottom (flipped) */}
              <div className="flex justify-center mt-8" data-layer>
                <img
                  src="https://storage.googleapis.com/stateless-swalapatra-com/2022/11/db822cc5-flower.png"
                  alt="Flower decoration"
                  className="w-40 h-auto opacity-90 rotate-180"
                />
              </div>
            </section>

            {/* Gallery Section */}
            <section
              id="gallery"
              className="scroll-mt-20"
              data-animate="fade-up"
              data-float="true"
            >
              <div className="text-center mb-10" data-layer>
                <ComponentUITitle
                  className={clsx(
                    "text-3xl",
                    isDark ? "text-neutral-100" : "text-gray-800",
                  )}
                  font="pacifico"
                  as="h2"
                >
                  Galeri
                </ComponentUITitle>
                <p
                  className={clsx(
                    "mt-2",
                    isDark ? "text-neutral-400" : "text-gray-500",
                  )}
                >
                  Momen indah kami
                </p>
              </div>
              <div data-layer>
                <Gallery theme={theme} />
              </div>
            </section>

            {/* Event Details Section */}
            <section
              id="event"
              className="scroll-mt-20"
              data-animate="fade-up"
              data-float="true"
            >
              <div className="text-center mb-10" data-layer>
                <ComponentUITitle
                  className={clsx(
                    "text-3xl",
                    isDark ? "text-neutral-100" : "text-gray-800",
                  )}
                  font="pacifico"
                  as="h2"
                >
                  Acara
                </ComponentUITitle>
                <p
                  className={clsx(
                    "mt-2",
                    isDark ? "text-neutral-400" : "text-gray-500",
                  )}
                >
                  Detail pernikahan
                </p>
              </div>
              <div className="space-y-6 " data-layer>
                {/* DateCountDown with Slideshow Background */}
                <div
                  className={clsx(
                    "relative rounded-2xl overflow-hidden shadow-lg h-500",
                    isDark
                      ? "border border-neutral-800"
                      : "border border-amber-200/50",
                  )}
                >
                  {/* Slideshow Background */}
                  <div
                    ref={eventHeroBgRef}
                    className="absolute inset-0 will-change-transform"
                  >
                    <ComponentUIBackgroundTransition
                      images={MAIN_BG_IMAGES}
                      fitVariant="cover"
                      lazy={false}
                    />
                    {/* Overlay */}
                    <div
                      className={clsx(
                        "absolute inset-0",
                        isDark
                          ? "bg-gradient-to-b from-neutral-950/50 via-neutral-950/30 to-neutral-950/50"
                          : "bg-gradient-to-b from-black/40 via-black/20 to-black/40",
                      )}
                    />
                  </div>
                  <div
                    data-shimmer
                    className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-70 mix-blend-screen"
                  />
                  {/* DateCountDown - centered and smaller */}
                  <div className="relative z-10 h-full flex items-center justify-center p-6">

                    {/* Centered Content - Wedding Info */}
                    <div className="relative z-10 lg:h-screen h-[50vh] flex flex-col items-center justify-center p-6 md:p-12 text-center text-white">
                      {/* Wedding Announcement */}
                      <div className="space-y-4 md:space-y-6 max-w-lg">
                        {/* Pre-title */}
                        <p className="text-sm md:text-xl lg:text-2xl font-light tracking-[0.2em] md:tracking-[0.3em] text-amber-200">
                          THE WEDDING OF
                        </p>

                        {/* Couple Names */}
                        <div className="space-y-1 md:space-y-2">
                          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight">
                            Listia & Dedi
                          </h1>
                        </div>

                        {/* Divider */}
                        <div className="flex items-center justify-center gap-4 py-2 md:py-4">
                          <div className="w-12 md:w-16 h-px bg-amber-300/60" />
                          <div className="text-amber-300 text-xl md:text-2xl">✦</div>
                          <div className="w-12 md:w-16 h-px bg-amber-300/60" />
                        </div>

                        {/* Date & Time */}
                        <div className="space-y-1 md:space-y-2">
                          <p className="text-lg md:text-2xl lg:text-3xl font-light tracking-wide">
                            Saturday, December 25, 2026
                          </p>
                          <p className="text-base md:text-xl lg:text-2xl font-light text-amber-200">
                            09:00 AM - 13:00 PM
                          </p>
                        </div>

                        {/* Venue */}
                        <div className="pt-4 md:pt-6">
                          <p className="text-base md:text-lg lg:text-xl font-light italic text-white/90">
                            Grand Ballroom, Hotel Indonesia
                          </p>
                          <p className="text-sm md:text-base text-white/70 mt-1 md:mt-2">
                            Jakarta, Indonesia
                          </p>
                        </div>

                        {/* Countdown Timer */}
                        <div className="pt-4 md:pt-6 lg:pt-8">
                          <DateCountDown />
                        </div>

                        {/* Scroll Indicator - Hide on mobile */}
                        <div className="pt-8 md:pt-12 animate-bounce hidden md:block">
                          <svg
                            className="w-6 h-6 mx-auto text-amber-300"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Google Maps */}
                <div
                  className={clsx(
                    "rounded-2xl overflow-hidden shadow-lg border px-2 py-10",
                    isDark ? "border-neutral-800" : "border-gray-200",
                  )}
                >
                  <div
                    className={clsx(
                      "p-6 border-b",
                      isDark
                        ? "bg-neutral-900/80 border-neutral-800"
                        : "bg-white border-gray-200",
                    )}
                  >
                    <h3
                      className={clsx(
                        "text-xl font-semibold mb-2",
                        isDark ? "text-neutral-100" : "text-gray-800",
                      )}
                    >
                      Lokasi Acara
                    </h3>
                    <p className={isDark ? "text-neutral-300" : "text-gray-600"}>
                      Grand Ballroom, Hotel Indonesia Kempinski
                    </p>
                    <p
                      className={clsx(
                        "text-sm mt-1",
                        isDark ? "text-neutral-400" : "text-gray-500",
                      )}
                    >
                      Jl. M.H. Thamrin Kav. 1, Jakarta 10310
                    </p>
                  </div>
                  <div className="relative h-200 w-full">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.666427009756!2d106.8196613147693!3d-6.193746995520368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f4d2e764b12d%3A0x3d2ad6e1e0a9b4c1!2sHotel%20Indonesia%20Kempinski!5e0!3m2!1sen!2sid!4v1635000000000!5m2!1sen!2sid"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0"
                    />
                  </div>
                  <div
                    className={clsx(
                      "p-4 border-t",
                      isDark
                        ? "bg-neutral-900/80 border-neutral-800"
                        : "bg-white border-gray-200",
                    )}
                  >
                    <a
                      href="https://goo.gl/maps/xyz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={clsx(
                        "flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl transition-colors duration-200 font-medium",
                        isDark
                          ? "bg-amber-500 hover:bg-amber-600 text-neutral-900"
                          : "bg-amber-600 hover:bg-amber-700 text-white",
                      )}
                    >
                      Buka di Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Gift Giving Section */}
            <section
              id="gift"
              className="scroll-mt-20"
              data-animate="fade-up"
              data-float="true"
            >
              <div className="text-center mb-10" data-layer>
                <ComponentUITitle
                  className={clsx(
                    "text-3xl",
                    isDark ? "text-neutral-100" : "text-gray-800",
                  )}
                  font="pacifico"
                  as="h2"
                >
                  Hadiah
                </ComponentUITitle>
                <p
                  className={clsx(
                    "mt-2",
                    isDark ? "text-neutral-400" : "text-gray-500",
                  )}
                >
                  Kirim hadiah pernikahan
                </p>
              </div>
              <div data-layer>
                <GiftGiving theme={theme} />
              </div>
            </section>

            <section
              id="greetings"
              className="scroll-mt-20"
              data-animate="fade-up"
              data-float="true"
            >
              <div className="text-center mb-10" data-layer>
                <ComponentUITitle
                  className={clsx(
                    "text-3xl",
                    isDark ? "text-neutral-100" : "text-gray-800",
                  )}
                  font="pacifico"
                  as="h2"
                >
                  Ucapan
                </ComponentUITitle>
                <p
                  className={clsx(
                    "mt-2",
                    isDark ? "text-neutral-400" : "text-gray-500",
                  )}
                >
                  Kirim ucapan & doa
                </p>
              </div>
              <div data-layer>
                <WeddingGreetings theme={theme} />
              </div>
            </section>

            {/* Footer */}
            <footer
              className={clsx(
                "relative overflow-hidden rounded-3xl border text-center pt-10 pb-16",
                isDark
                  ? "border-neutral-800 bg-neutral-950"
                  : "border-amber-100 bg-amber-50",
              )}
              data-animate="fade-up"
              data-float="true"
            >
              <div
                data-shimmer
                className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-70 mix-blend-screen"
              />
              <div className="mx-auto w-24" data-layer>
                <ComponentUIGradientImage
                  fitVariant="contain"
                  lazy
                  unoptimized
                  src="https://storage.googleapis.com/stateless-swalapatra-com/2022/12/e4e9f1f8-logo3-150x150.png"
                  alt="Wedding logo"
                />
              </div>
              <p
                className={clsx(
                  "mt-4 text-sm font-semibold tracking-wide",
                  isDark ? "text-neutral-200" : "text-gray-700",
                )}
                data-layer
              >
                Listia & Dedi
              </p>

              <div className="absolute bottom-0 left-0 w-full">
                <svg
                  viewBox="0 0 1000 100"
                  preserveAspectRatio="none"
                  className={clsx(
                    "h-10 w-full",
                    isDark ? "text-neutral-950" : "text-amber-50",
                  )}
                >
                  <path
                    className="fill-current"
                    d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7
                   c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4
                   c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"
                  />
                </svg>
              </div>
            </footer>
          </div>
        </div>

        <BottomNavigator
          theme={theme}
          showLamp
          showMusic
          musicSrc="/audio/music.mp3"
          isDark={isDark}
          onToggleTheme={() => setIsDark((prev) => !prev)}
        />
      </div>
    </div>
  );
}
