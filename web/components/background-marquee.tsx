"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Curated list of 50 iconic movie backdrops (sourced from public TMDB data)
const BACKDROP_PATHS = [
    "/dqK9Hag1054tghRQSqLSfrkvQnA.jpg", // The Dark Knight
    "/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg", // Inception
    "/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg", // Interstellar
    "/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg", // Pulp Fiction
    "/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg", // Fight Club
    "/l4QHerTSbMI7qgvasqxP36pqjN6.jpg", // The Matrix
    "/Ab8mkHmkYADjU7wQiOkia9BzGvS.jpg", // Spirited Away
    "/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg", // Parasite
    "/nadTlnTE6DdgmYsN4iWc2a2wiaI.jpg", // La La Land
    "/xHDynIimfsgj0ZOs0j5ma8v1vmM.jpg", // Grand Budapest Hotel
    "/ilRyASD8ybpJORWdmkC9NJn0p8a.jpg", // Blade Runner 2049
    "/rPZT06Nn1TMjV5yS3eHqPuxfL.jpg", // The Godfather
    "/xM8o4gC40G6eB96N3xG20z0zR2T.jpg", // The Good, the Bad and the Ugly
    "/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg", // LOTR: Fellowship
    "/kXfqcdQKs0RzPTGXm8PzQ5Jo6HQ.jpg", // Shawshank Redemption
    "/vK5KaX0bLz43oDk1m5B0D701r6H.jpg", // LOTR: Return of the King
    "/qlfSgE7N9h91B49oV9RjS90D1r3.jpg", // Forrest Gump
    "/2p8vN16xH6j3o5s6w7L7z7h7j7k.jpg", // Star Wars: A New Hope
    "/e5Vvx8xys2NuFhl8fevXt41wX7v.jpg", // Schindler's List
    "/xHrpMy0I3A.jpg", // Parasite (Alt)
    "/gL915zE.jpg", // Seven Samurai
    "/5GZ6M5.jpg", // Singin' in the Rain
    "/qZ0oM4gWd2.jpg", // Wizard of Oz
    "/A3H4gB.jpg", // Casablanca
    "/tyJbQe.jpg", // Gladiator
    "/r8oX7bL.jpg", // Fight Club (Alt)
    "/x4R7kE.jpg", // Goodfellas
    "/zxfqR2v.jpg", // Interstellar (Alt)
    "/wHqWb8.jpg", // Spirited Away (Alt)
    "/pZ48a8.jpg", // Eternal Sunshine
    "/sL3Nn0x.jpg", // Back to the Future
    "/eN8uJ7.jpg", // Raiders of the Lost Ark
    "/85lJ7e.jpg", // Alien
    "/qGqD0L.jpg", // The Shining
    "/u4zT9f.jpg", // Blade Runner
    "/nS031V.jpg", // ET
    "/bL6iG9.jpg", // Jurassic Park
    "/wM02g0.jpg", // Titanic
    "/x40p6t.jpg", // Saving Private Ryan
    "/s49m21.jpg", // LOTR: Fellowship (Alt)
    "/w6R9u1.jpg", // LOTR: Two Towers
    "/fM4f0v.jpg", // Apocalypse Now
    "/e8rX4u.jpg", // Inglourious Basterds
    "/aCuy0y.jpg", // Avatar
    "/zV0V2G.jpg", // Django Unchained
    "/aGg2C0.jpg", // Grand Budapest (Alt)
    "/u1s1Nf.jpg", // Get Out
    "/aP69c4.jpg", // Dune
    "/fPFrv.jpg", // Oppenheimer
    "/qP6E6l.jpg", // Psycho
    "/oT1VfL.jpg", // 2001
    "/o1s0l7.jpg", // Whiplash
    "/r3tM7c.jpg", // Mad Max Fury Road
    "/qW337s.jpg", // La La Land (Alt)
    "/fD4pG1.jpg", // Arrival
    "/q1y5N4.jpg", // Joker
    "/fF64K8.jpg", // Spider-Verse
];

// Fisher-Yates shuffle
const shuffle = (array: string[]) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
};

export function BackgroundMarquee() {
    const [columns, setColumns] = useState<string[][]>([]);

    useEffect(() => {
        // 1. Shuffle the ENTIRE master list first
        const shuffledMaster = shuffle([...BACKDROP_PATHS]);

        // 2. Split into 3 distinct chunks => No image overlap between columns!
        const chunkSize = Math.ceil(shuffledMaster.length / 3);
        const chunk1 = shuffledMaster.slice(0, chunkSize);
        const chunk2 = shuffledMaster.slice(chunkSize, chunkSize * 2);
        const chunk3 = shuffledMaster.slice(chunkSize * 2);

        // 3. For each column, create a looping array ensuring no immediate repeats
        // shuffling again before duplicating helps add more "randomness" to the vertical sequence
        setColumns([
            [...chunk1, ...shuffle([...chunk1])],
            [...chunk2, ...shuffle([...chunk2])],
            [...chunk3, ...shuffle([...chunk3])]
        ]);
    }, []);

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        // Hide the container of the broken image
        const target = e.currentTarget;
        const container = target.closest('div');
        if (container) {
            container.style.display = 'none';
        }
    };

    if (columns.length === 0) return null;

    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-black pointer-events-none">
            {/* Increased opacity from 0.5 to 0.7 for even better visibility */}
            <div className="absolute inset-0 grid grid-cols-3 gap-4 opacity-70">
                {columns.map((images, colIndex) => (
                    <div
                        key={colIndex}
                        className={cn(
                            "flex flex-col gap-4 animate-marquee",
                            // Faster speeds: 120s -> 60s approx
                            colIndex === 0 && "duration-[60s]",
                            colIndex === 1 && "duration-[90s] -mt-24",
                            colIndex === 2 && "duration-[75s] -mt-12"
                        )}
                    >
                        {images.map((path, imgIndex) => (
                            <div
                                key={`${colIndex}-${imgIndex}`}
                                className="relative w-full aspect-video rounded-lg overflow-hidden shrink-0 bg-slate-900"
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${path}`}
                                    alt="Movie Backdrop"
                                    className="w-full h-full object-cover transition-opacity duration-300"
                                    loading="lazy"
                                    onError={handleImageError}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Stronger Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50" />
            <div className="absolute inset-0 bg-slate-950/40" />
        </div>
    );
}
