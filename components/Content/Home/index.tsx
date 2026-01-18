"use client";

import ComponentUIButton from "@/components/UI/Button";
import ComponentUIGradientImage from "@/components/UI/GradientImage";
import ComponentUIIcon from "@/components/UI/Icon";
import ComponentUITitle from "@/components/UI/Title";
import { MdOutlineMail } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Heart {
    id: number;
    top: number;
    left: number;
    size: string;
    opacity: number;
    duration: number;
}

// Generate random decorative hearts
function generateRandomHearts(count: number): Heart[] {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 80 + 5,
        left: Math.random() * 80 + 5,
        size: ["text-2xl", "text-3xl", "text-4xl", "text-5xl", "text-6xl"][Math.floor(Math.random() * 5)],
        opacity: Math.random() * 0.15 + 0.05,
        duration: Math.random() * 2 + 2,
    }));
}

export default function ComponentContentHome() {
    const [hearts, setHearts] = useState<Heart[]>([]);
    const [mounted, setMounted] = useState(false);

    // Refs for GSAP animations
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const namesRef = useRef<HTMLDivElement>(null);
    const dateRef = useRef<HTMLDivElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        setHearts(generateRandomHearts(8));
        setMounted(true);
    }, []);

    // Entrance animations
    useGSAP(() => {
        if (!mounted) return;

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Set initial states
        gsap.set([headerRef.current, imageRef.current, namesRef.current, dateRef.current, dividerRef.current, buttonRef.current, footerRef.current], {
            opacity: 0,
            y: 30,
        });

        gsap.set(imageRef.current, {
            scale: 0.8,
        });

        // Animation sequence
        tl.to(headerRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
        })
            .to(imageRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
            }, "-=0.4")
            .to(namesRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
            }, "-=0.5")
            .to(dateRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.6,
            }, "-=0.4")
            .to(dividerRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.5,
            }, "-=0.3")
            .to(buttonRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.6,
            }, "-=0.2")
            .to(footerRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.5,
            }, "-=0.3");

    }, { scope: containerRef, dependencies: [mounted] });

    return (
        <div ref={containerRef} className="relative min-h-screen overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <ComponentUIGradientImage
                    fitVariant="cover"
                    lazy
                    src="https://i.pinimg.com/736x/79/e7/e9/79e7e9f5520a7384979880271f324692.jpg"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
            </div>

            {/* Random Decorative Hearts */}
            {mounted && hearts.map((heart) => (
                <div
                    key={heart.id}
                    className="absolute z-5 pointer-events-none"
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

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
                {/* Elegant Header */}
                <div ref={headerRef} className="text-center mb-8">
                    <p className="text-golden-amber tracking-[0.3em] text-xs uppercase mb-2 font-light">
                        The Wedding of
                    </p>
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-golden-amber to-transparent mx-auto" />
                </div>

                {/* Profile Image with Border */}
                <div ref={imageRef} className="relative mb-8">
                    {/* Decorative Ring */}
                    <div className="absolute -inset-3 rounded-full border border-golden-amber/30 animate-pulse" />
                    <div className="absolute -inset-6 rounded-full border border-golden-amber/15" />

                    {/* Image Container */}
                    <div className="w-200 h-200 lg:w-280 lg:h-280 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl shadow-black/50">
                        <ComponentUIGradientImage
                            fitVariant="cover"
                            lazy
                            src="https://i.pinimg.com/736x/79/e7/e9/79e7e9f5520a7384979880271f324692.jpg"
                        />
                    </div>
                </div>

                {/* Names */}
                <div ref={namesRef} className="text-center mb-6">
                    <ComponentUITitle
                        className="text-36d lg:text-51d text-white drop-shadow-lg"
                        font="pacifico"
                        as="h1"
                    >
                        Dedi & Aminah
                    </ComponentUITitle>
                </div>

                {/* Date */}
                <div ref={dateRef} className="text-center mb-10">
                    <p className="text-white/70 text-sm tracking-wider">
                        Sabtu, 14 Februari 2026
                    </p>
                </div>

                {/* Divider */}
                <div ref={dividerRef} className="flex items-center gap-4 mb-10">
                    <div className="w-16 h-px bg-gradient-to-r from-transparent to-golden-amber/50" />
                    <ComponentUIIcon size="text-xl" color="#D4AF37" animation="pulse" duration={1.5}>
                        <FaHeart />
                    </ComponentUIIcon>
                    <div className="w-16 h-px bg-gradient-to-l from-transparent to-golden-amber/50" />
                </div>

                {/* CTA Button */}
                <div ref={buttonRef}>
                    <ComponentUIButton
                        className="bg-white/95 hover:bg-white text-neutral-800 px-8 py-4 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    >
                        <div className="flex items-center gap-3">
                            <ComponentUIIcon size="text-xl" animation="bounce" duration={1} color="#D4AF37">
                                <MdOutlineMail />
                            </ComponentUIIcon>
                            <ComponentUITitle className="text-14d lg:text-16d" font="pacifico" as="span">
                                Open Invitation
                            </ComponentUITitle>
                        </div>
                    </ComponentUIButton>
                </div>

                {/* Footer Text */}
                <p ref={footerRef} className="mt-12 text-white/40 text-xs tracking-wider">
                    Kami mengundang Anda untuk hadir
                </p>
            </div>
        </div>
    );
}