"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const CinematicCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorType, setCursorType] = useState<"default" | "screenplay" | "novel">("default");
    const [isClicking, setIsClicking] = useState(false);

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

    if (cursorType === "default") return null;

    return (
        <motion.div
            className="fixed top-0 left-0 z-50 pointer-events-none drop-shadow-xl"
            animate={{
                x: mousePosition.x,
                y: mousePosition.y,
                scale: isClicking ? 0.9 : 1
            }}
            transition={{ type: "spring", stiffness: 800, damping: 35, mass: 0.5 }}
        >
            <AnimatePresence mode="wait">
                {cursorType === "screenplay" && (
                    <motion.div
                        key="screenplay-cursor"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="relative -top-3 -left-3"
                    >
                        {/* Realistic Clapboard Icon */}
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Bottom Board */}
                            <path d="M4 12H20V20H4V12Z" fill="white" stroke="black" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M4 20H20" stroke="black" strokeWidth="1.5" />

                            {/* The Clapper (Top Arm) - Pivots from left */}
                            <motion.g
                                style={{ originX: "4px", originY: "12px" }}
                                animate={{ rotate: isClicking ? 0 : -20 }}
                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            >
                                {/* Arm Shape */}
                                <path d="M4 4L20 4V12H4V4Z" fill="white" stroke="black" strokeWidth="1.5" strokeLinejoin="round" />
                                {/* Stripes on Arm */}
                                <path d="M7 4L4 12" stroke="black" strokeWidth="1.5" />
                                <path d="M12 4L9 12" stroke="black" strokeWidth="1.5" />
                                <path d="M17 4L14 12" stroke="black" strokeWidth="1.5" />
                            </motion.g>

                            {/* Hinge */}
                            <circle cx="4" cy="12" r="1.5" fill="black" />
                        </svg>
                    </motion.div>
                )}

                {cursorType === "novel" && (
                    <motion.div
                        key="novel-cursor"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="relative -top-4 -left-4"
                    >
                        {/* Fountain Pen Nib SVG */}
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
                            <path d="M12 2L15.5 11L12 22L8.5 11L12 2Z" fill="white" stroke="black" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M12 2V11" stroke="black" strokeWidth="1" />
                            <circle cx="12" cy="11" r="1" fill="black" />
                        </svg>

                        {/* Ink Blot Animation */}
                        {isClicking && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0.8 }}
                                animate={{ scale: 1.5, opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="absolute top-[38px] left-[18px] w-2 h-2 bg-black rounded-full"
                            />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
