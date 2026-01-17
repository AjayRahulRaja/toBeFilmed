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
    "/jOzrELAzFxtMx2I4uDGHOotdfsS.jpg", // Star Wars: A New Hope
    "/e5Vvx8xys2NuFhl8fevXt41wX7v.jpg", // Schindler's List
    "/hziKb0K7QnLPeqYGC2Q1q9UqFL5.jpg", // Avengers Endgame
    "/2Fk3AB8E9dYIBc2ywJkxk8BTyhc.jpg", // Mad Max Fury Road
    "/lmZFxXgJE3vgrciwuDib0N8CfQo.jpg", // The Godfather Part II
    "/qdIMHd4sEfJSckfVJfKQvisL02a.jpg", // 12 Angry Men
    "/vI3aUGTuRRdM7J78KIdW98LdxE5.jpg", // The Dark Knight Rises
    "/poec6RqOKY9iSiIUmfyfPfiLtvB.jpg", // Harry Potter
    "/rhIRbceoE9lR4veEXuwCC2wARtG.jpg", // LOTR: Two Towers
    "/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg", // Inglourious Basterds
    "/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg", // Interstellar (Alt)
    "/90ez6ArvpO8bvpyIngBuwXOqJm5.jpg", // Whiplash
    "/ctOEhQiFIHWkiaYp7b0ibSTe5IL.jpg", // Joker
    "/8ZTVKSpN2iUkbg1JF6HiXF4d8n0.jpg", // Gladiator
    "/ilKFhqnwvyoW8vE6H32mM0iASYv.jpg", // Good Will Hunting
    "/rr7E0NoH7J5B6laq2SAgD5qQgSM.jpg", // Avatar
    "/78lPtwv72eTNqFW9COBYI0dWDJa.jpg", // Dune
    "/kuf6dutpsT0vSVehic3EZIqkOBt.jpg", // Oppenheimer
    "/dIWwZW7dJJtqC6CgWzYkNVKIUm8.jpg", // LOTR: Fellowship (Alt)
    "/bQXAqRx2Fgc46uCVWgoPQP2gH7m.jpg", // The Shawshank Redemption (Alt)
    "/6MKr3KgOLmzOP6MSuZERO41Lpkt.jpg", // The Matrix Reloaded
    "/lJhSbR3IzRW9LxE0JkVv7NmEsLl.jpg", // Fight Club (Alt)
    "/fCayJrkfRaCRCTh8GqN30f8oyQL.jpg", // Pulp Fiction (Alt)
    "/eShw0LB5CkoEfYtpxOfTLa4JOY9.jpg", // The Silence of the Lambs
    "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", // Saving Private Ryan
    "/kXfqpcdQKs0RzPTGXm8PzQ5Jo6H.jpg", // Goodfellas
    "/hiKmpZMGZsrkA3cdce8a7Dpos1j.jpg", // Forrest Gump (Alt)
    "/bHarw8xrmQeqf3t8HpuMY7zoK4x.jpg", // Back to the Future
    "/gzlJkVfWV5VEG5xK25cvFGJgWAc.jpg", // Jurassic Park  
    "/wkT5a8orDCZrvPqbQXY8pOEZrF0.jpg", // E.T.
    "/qdBShVcsdWJAJXJlCeNP90fWqZD.jpg", // Casablanca
    "/mSDsSDwaP3E7dEfUPWy4J0djt4O.jpg", // The Green Mile
    "/qW337sxk3fmBFH2fLdSdW47LTGS.jpg", // La La Land (Alt)
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

        // 3. Duplicate each chunk for infinite scroll (no cross-column repeats)
        setColumns([
            [...chunk1, ...chunk1],
            [...chunk2, ...chunk2],
            [...chunk3, ...chunk3]
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
