"use client";

import clsx from "clsx";
import { useState } from "react";
import ComponentUIBackgroundTransition from "@/components/UI/BackgroundTransition";
import ComponentUIGradientImage from "@/components/UI/GradientImage";
import ComponentUITitle from "@/components/UI/Title";
import BottomNavigator from "@/components/UI/BottomNavigator";
import BrideAndGroom from "./Component/bride-and-groom";
import DateCountDown from "./Component/date-count-down";
import Story from "./Component/story";
import Gallery from "./Component/gallery";
import GiftGiving from "./Component/gift-giving";
import WeddingGreetings from "./Component/wedding-greetings";

const MAIN_BG_IMAGES = [
  "https://i.pinimg.com/736x/79/e7/e9/79e7e9f5520a7384979880271f324692.jpg",
  "https://www.bcalife.co.id/storage//articles/wujudkan-pernikahan-sakral-dan-anti-boros-dengan-konsep-intimate-wedding-1718346697.png",
  "https://images.tokopedia.net/blog-tokopedia-com/uploads/2020/02/pernikahan-adat-bali-sumber-bridestory.jpg",
];

export default function ComponentContentMain() {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? "dark" : "light";

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Half - Hero Section with Background */}
      <div className="hidden lg:flex lg:flex-1 relative lg:h-screen overflow-hidden order-1 lg:order-1">
        {/* Background Transition */}
        <div className="absolute inset-0">
          <ComponentUIBackgroundTransition
            images={MAIN_BG_IMAGES}
            fitVariant="cover"
            lazy={false}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </div>

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

            {/* Countdown Timer Preview - Hide on mobile for space */}
            <div className="pt-4 md:pt-6 lg:pt-8 hidden md:block">
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

      {/* Right Half - Main Content */}
      <div
        className={clsx(
          "w-full lg:w-1/3 relative order-2 lg:order-2 transition-colors duration-300 flex flex-col overflow-hidden",
          isDark ? "bg-neutral-950 text-neutral-100" : "bg-white text-gray-900",
        )}
      >
        <div className="flex-1 overflow-y-auto" data-scroll-container="true">
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
          >
            <div className="absolute inset-0">
              <ComponentUIBackgroundTransition
                images={MAIN_BG_IMAGES}
                fitVariant="cover"
                lazy={false}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/80" />
            </div>
            <div className="relative z-10 px-6 py-8 text-center text-white">
              <p className="text-xs tracking-[0.25em] text-amber-200">
                THE WEDDING OF
              </p>
              <h2 className="mt-3 text-3xl font-bold">Listia & Dedi</h2>
              <div className="mx-auto my-4 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-amber-300/60" />
                <span className="text-amber-300 text-lg">✦</span>
                <span className="h-px w-10 bg-amber-300/60" />
              </div>
              <p className="text-sm text-white/90">
                Saturday, December 25, 2026
              </p>
              <p className="mt-1 text-xs text-amber-200">
                09:00 AM - 13:00 PM
              </p>
            </div>
          </div>
          {/* Bride & Groom Section */}
          <section id="couple" className="scroll-mt-20">
            <div className="text-center mb-10">
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
            <BrideAndGroom theme={theme} />
          </section>

          {/* Story Section */}
          <section id="story" className="scroll-mt-20">
            <div className="text-center mb-10">
              <ComponentUITitle
                className={clsx(
                  "text-3xl",
                  isDark ? "text-neutral-100" : "text-gray-800",
                )}
                font="pacifico"
                as="h2"
              >
                Kisah Cinta
              </ComponentUITitle>
              <p
                className={clsx(
                  "mt-2",
                  isDark ? "text-neutral-400" : "text-gray-500",
                )}
              >
                Perjalanan kami
              </p>
            </div>
            <Story theme={theme} />
          </section>

          {/* Gallery Section */}
          <section id="gallery" className="scroll-mt-20">
            <div className="text-center mb-10">
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
            <Gallery theme={theme} />
          </section>

          {/* Event Details Section */}
          <section id="event" className="scroll-mt-20">
            <div className="text-center mb-10">
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
            <div className="space-y-6">
              <div
                className={clsx(
                  "rounded-2xl p-8 shadow-lg",
                  isDark
                    ? "bg-neutral-900/80 border border-neutral-800"
                    : "bg-gradient-to-br from-amber-50 to-orange-50",
                )}
              >
                <DateCountDown theme={theme} />
              </div>

              {/* Google Maps */}
              <div
                className={clsx(
                  "rounded-2xl overflow-hidden shadow-lg border ",
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
          <section id="gift" className="scroll-mt-20">
            <div className="text-center mb-10">
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
            <GiftGiving theme={theme} />
          </section>

          <section id="greetings" className="scroll-mt-20">
            <div className="text-center mb-10">
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
            <WeddingGreetings theme={theme} />
          </section>

          {/* Footer */}
          <footer
            className={clsx(
              "relative overflow-hidden rounded-3xl border text-center pt-10 pb-16",
              isDark
                ? "border-neutral-800 bg-neutral-950"
                : "border-amber-100 bg-amber-50",
            )}
          >
            <div className="mx-auto w-24">
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
