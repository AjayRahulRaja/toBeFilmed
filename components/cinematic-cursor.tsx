"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

export const CinematicCursor = () => {
    // Use MotionValues for direct DOM updates (bypassing React render cycle for performance)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for the cursor movement
    const springConfig = { damping: 20, stiffness: 300, mass: 0.1 }; // Adjusted for "smooth but snappy" feel
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    const [cursorType, setCursorType] = useState<"default" | "screenplay" | "novel">("default");
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            // Update MotionValues directly
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
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
    }, [mouseX, mouseY]);

    useEffect(() => {
        setIsVisible(cursorType !== "default");
    }, [cursorType]);

    return (
        <motion.div
            className="fixed top-0 left-0 z-50 pointer-events-none drop-shadow-2xl"
            style={{
                x: smoothX,
                y: smoothY,
            }}
            animate={{
                scale: isClicking ? 0.9 : 1,
                opacity: isVisible ? 1 : 0,
            }}
            transition={{
                scale: { type: "spring", stiffness: 400, damping: 25 },
                opacity: { duration: 0.15 } // slightly smoother fade
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
                        className="relative -top-5 -left-5"
                    >
                        {/* User Requested: Outline Clapboard with Play Button */}
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
                            {/* Bottom Board Area */}
                            <path d="M4 12h16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2z" fill="white" fillOpacity="0.1" />
                            <path d="M4 12h16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2z" stroke="white" />

                            {/* Play Button Triangle */}
                            <path d="M10 15.5l5 3-5 3v-6z" fill="white" stroke="white" strokeWidth="1.5" />

                            {/* Top Clapper Arm - Animated */}
                            <motion.g
                                style={{ originX: "4px", originY: "12px" }} // Pivot at hinge
                                animate={{ rotate: isClicking || !isVisible ? 0 : -15 }} // Default slightly open, close on click
                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            >
                                {/* Outline of Top Arm */}
                                <path d="M4 4h16c1.1 0 2 .9 2 2v4H2V6c0-1.1.9-2 2-2z" fill="white" fillOpacity="0.1" stroke="none" />
                                <path d="M22 6v4H2V6c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2z" stroke="white" />

                                {/* Diagonal Stripes */}
                                <line x1="7" y1="4" x2="5" y2="10" stroke="white" />
                                <line x1="12" y1="4" x2="10" y2="10" stroke="white" />
                                <line x1="17" y1="4" x2="15" y2="10" stroke="white" />

                                {/* Hinge/Bolt Dots */}
                                <circle cx="4" cy="7" r="1" fill="white" stroke="none" />
                            </motion.g>

                            {/* Bottom Hinge Dot */}
                            <circle cx="4" cy="14" r="1" fill="white" stroke="none" />
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
                        className="relative -top-6 -left-1"
                    >
                        {/* Fountain Pen Nib SVG - Matching Outline Style */}
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
                            <path d="M12 19l7-7 3 3-7 7-3-3z" stroke="none" /> {/* Optional body fill */}
                            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" stroke="white" />
                            <path d="M2 2l7.586 7.586" stroke="white" />
                            <circle cx="11" cy="11" r="2" stroke="white" />
                        </svg>

                        {/* Ink Blot Animation */}
                        {isClicking && (
                            <motion.div
                                initial={{ scale: 0, opacity: 1 }}
                                animate={{ scale: 2, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute top-[38px] left-[10px] w-2 h-2 bg-white rounded-full"
                            />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
