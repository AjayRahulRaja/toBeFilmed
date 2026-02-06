"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const CinematicCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorType, setCursorType] = useState<"default" | "screenplay" | "novel">("default");
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if hovering over Screenplay or Novel cards (using href or parent/closest check)
            const link = target.closest("a");
            if (link) {
                if (link.getAttribute("href")?.includes("mode=screenplay")) {
                    setCursorType("screenplay");
                } else if (link.getAttribute("href")?.includes("mode=novel")) {
                    setCursorType("novel");
                } else {
                    setCursorType("default");
                }
            } else {
                setCursorType("default");
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    useEffect(() => {
        if (cursorType !== "default") {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [cursorType]);

    return (
        <motion.div
            className="fixed top-0 left-0 z-50 pointer-events-none drop-shadow-xl"
            animate={{
                x: mousePosition.x,
                y: mousePosition.y,
                scale: isClicking ? 0.9 : 1,
                opacity: isVisible ? 1 : 0
            }}
            transition={{
                type: "spring", stiffness: 1000, damping: 50, mass: 0.2, // Ultra responsive tracking
                opacity: { duration: 0.2 }
            }}
        >
            <AnimatePresence mode="wait">
                {cursorType === "screenplay" && (
                    <motion.div
                        key="screenplay-cursor"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="relative -top-6 -left-6" // Centered offset
                    >
                        {/* Realistic Solid Clapboard Icon */}
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#shadow)">
                                {/* Main Board - Solid White */}
                                <rect x="3" y="11" width="18" height="10" rx="1" fill="white" />

                                {/* The Clapper (Top Arm) - Solid White with Angled Stripes */}
                                <motion.g
                                    style={{ originX: "3px", originY: "11px" }}
                                    animate={{ rotate: isClicking ? 0 : -25 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                                >
                                    <path d="M3 4L21 4V10H3V4Z" fill="white" />
                                    {/* Black Stripes */}
                                    <path d="M7 4L4 10H8L11 4H7Z" fill="black" />
                                    <path d="M13 4L10 10H14L17 4H13Z" fill="black" />
                                </motion.g>

                                {/* Hinge Detail */}
                                <rect x="3" y="10" width="18" height="1" fill="black" fillOpacity="0.2" />
                            </g>

                            {/* SVG Shadow Def */}
                            <defs>
                                <filter id="shadow" x="0" y="0" width="24" height="24" filterUnits="userSpaceOnUse">
                                    <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.3)" />
                                </filter>
                            </defs>
                        </svg>
                    </motion.div>
                )}

                {cursorType === "novel" && (
                    <motion.div
                        key="novel-cursor"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="relative -top-8 -left-1"
                    >
                        {/* Fountain Pen Nib SVG - Refined */}
                        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" className="drop-shadow-xl">
                            <path d="M12 2C13.5 6 16.5 10 16.5 12C16.5 14.5 14.5 16.5 12 16.5C9.5 16.5 7.5 14.5 7.5 12C7.5 10 10.5 6 12 2Z" fill="white" stroke="black" strokeWidth="0.5" />
                            <path d="M12 9V16" stroke="black" strokeWidth="1" strokeLinecap="round" />
                            <circle cx="12" cy="13" r="0.5" fill="black" />
                            {/* Handle hint */}
                            <path d="M12 2L12 0" stroke="white" strokeWidth="4" />
                        </svg>

                        {/* Ink Blot Animation */}
                        {isClicking && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0.8 }}
                                animate={{ scale: 2, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute top-[42px] left-[28px] -translate-x-1/2 w-3 h-3 bg-black rounded-full mix-blend-multiply"
                            />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
