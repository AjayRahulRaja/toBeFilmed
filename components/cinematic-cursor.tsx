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
            className="fixed top-0 left-0 z-50 pointer-events-none mix-blend-difference"
            animate={{
                x: mousePosition.x - 16,
                y: mousePosition.y - 16,
                rotate: isClicking && cursorType === "screenplay" ? -15 : 0,
                scale: isClicking ? 0.9 : 1
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        >
            <AnimatePresence mode="wait">
                {cursorType === "screenplay" && (
                    <motion.div
                        key="screenplay-cursor"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="relative"
                    >
                        {/* Clapboard SVG */}
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white drop-shadow-lg">
                            {/* Top Slate (The Clapper) */}
                            <motion.path
                                d="M4 4L20 10V12H4V4Z"
                                className="fill-white"
                                animate={{ rotate: isClicking ? 20 : 0, y: isClicking ? 5 : 0 }}
                                style={{ originX: 0, originY: 1 }}
                            />
                            {/* Bottom Board */}
                            <rect x="4" y="12" width="16" height="8" rx="1" className="fill-white" />
                            <path d="M4 12L20 12" stroke="black" strokeWidth="0.5" />
                        </svg>
                    </motion.div>
                )}

                {cursorType === "novel" && (
                    <motion.div
                        key="novel-cursor"
                        initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
                        animate={{
                            opacity: 1,
                            rotate: 0,
                            scale: 1,
                            x: isClicking ? 2 : 0,
                            y: isClicking ? 2 : 0
                        }}
                        exit={{ opacity: 0, rotate: -45, scale: 0.5 }}
                        className="relative -top-4 -left-4"
                    >
                        {/* Fountain Pen Nib SVG */}
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-white drop-shadow-lg">
                            <path d="M12 2L15 11L12 22L9 11L12 2Z" fill="white" />
                            <path d="M12 2L12 11" stroke="black" strokeWidth="0.5" />
                            <circle cx="12" cy="11" r="1.5" fill="black" />
                        </svg>
                        {/* Ink drop on click */}
                        {isClicking && (
                            <motion.div
                                initial={{ scale: 0, opacity: 1 }}
                                animate={{ scale: 2, opacity: 0 }}
                                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rounded-full"
                            />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
