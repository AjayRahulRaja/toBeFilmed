"use client";

import React from "react";
import Link from "next/link";
import { BackgroundMarquee } from "@/components/background-marquee";
import { CinematicCursor } from "@/components/cinematic-cursor";
import { motion } from "framer-motion";
import { Film, BookOpen, ArrowRight, Camera, Scissors, Sparkles, Clapperboard } from "lucide-react";

const Quotes = [
  { text: "Cinema is a mosaic made of time.", source: "Andrei Tarkovsky", year: "1986" },
  { text: "If it can be written, or thought, it can be filmed.", source: "Stanley Kubrick", year: "1968" },
  { text: "I'm back.", source: "The Terminator", year: "1984" },
  { text: "There is no such thing as a ghost, just as there is no such thing as a person.", source: "Decision to Leave", year: "2022" },
  { text: "All those moments will be lost in time, like tears in rain.", source: "Blade Runner", year: "1982" },
  { text: "I have always preferred the reflection of the life to life itself.", source: "François Truffaut", year: "1959" },
  { text: "The only way to get rid of a temptation is to yield to it.", source: "Oscar Wilde", year: "1890" },
  { text: "May the Force be with you.", source: "Star Wars", year: "1977" },
  { text: "In the end, we all become stories.", source: "Margaret Atwood", year: "2003" },
  { text: "Every great film should seem new every time you see it.", source: "Roger Ebert", year: "2005" },
];

export default function Home() {
  const [currentQuote, setCurrentQuote] = React.useState(Quotes[0]);

  React.useEffect(() => {
    const randomQuote = Quotes[Math.floor(Math.random() * Quotes.length)];
    setCurrentQuote(randomQuote);
  }, []);

  return (
    <main className="relative min-h-screen bg-black text-slate-200 overflow-hidden selection:bg-amber-500/30 font-sans">
      {/* Cinematic Background Layer */}
      <div className="fixed inset-0 z-0">
        <BackgroundMarquee />
        {/* Multi-layered overlays for depth (Villeneuve style) - Maximum visibility (+30% total) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/5 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />

        {/* Animated Film Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay animate-flicker bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Ethereal Anamorphic Light Flares */}
        <div className="absolute top-1/3 -left-40 w-[600px] h-32 bg-indigo-500/10 blur-[150px] rounded-full rotate-12 opacity-50" />
        <div className="absolute bottom-1/3 -right-40 w-[600px] h-32 bg-amber-600/10 blur-[150px] rounded-full -rotate-12 opacity-50" />
      </div>

      {/* Minimalist Navigation */}
      <nav className="relative z-50 flex justify-between items-center px-8 md:px-20 py-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2 }}
          className="flex flex-col"
        >
          <span className="text-[10px] tracking-[0.8em] uppercase font-bold text-white/40 mb-1 font-sans">ToBeFilmed</span>
          <span className="text-[8px] tracking-[0.4em] uppercase font-light text-slate-700 italic font-sans">Vision 2026</span>
        </motion.div>
      </nav>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 -mt-20">
        {/* Title - A24 / Criterion Bold Symmetry */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <h1 className="text-[14vw] md:text-[10vw] font-bold tracking-[-0.05em] leading-[0.8] font-cormorant text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] mb-8">
            ToBeFilmed
          </h1>

          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "20vw" }}
              transition={{ delay: 1, duration: 2 }}
              className="h-[0.5px] bg-white/20"
            />
            <p className="text-[10px] md:text-xs tracking-[1em] uppercase font-light text-slate-500 pl-[1em] font-sans">
              Keep Writing Until It Is Made
            </p>
          </div>
        </motion.div>

        {/* Subtitle - Dynamic Cinematic/Literary Quote */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 2 }}
          className="max-w-2xl text-center"
        >
          <p className="text-lg md:text-xl font-light text-slate-400 leading-relaxed italic mb-4 font-cormorant">
            "{currentQuote.text}"
          </p>
          <span className="text-slate-700 not-italic text-[10px] tracking-[0.5em] uppercase block font-sans">
            {currentQuote.source} ({currentQuote.year})
          </span>
        </motion.div>

        {/* The Split Screen - Redesigned Cinematic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl mt-20">

          {/* Screenplay - Film Strip Design */}
          <Link href="/synopsis?mode=screenplay" className="group relative bg-gradient-to-br from-blue-950/40 via-black/60 to-black/80 backdrop-blur-md overflow-hidden transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_0_80px_rgba(37,99,235,0.4)] border-2 border-blue-900/20 hover:border-blue-600/60 cursor-none">
            {/* Film Strip Perforations */}
            <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-b from-blue-900/30 to-transparent">
              <div className="flex flex-col gap-4 py-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-2 h-2 mx-auto rounded-sm bg-blue-800/40" />
                ))}
              </div>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-b from-blue-900/30 to-transparent">
              <div className="flex flex-col gap-4 py-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-2 h-2 mx-auto rounded-sm bg-blue-800/40" />
                ))}
              </div>
            </div>

            {/* Anamorphic Letterbox Effect */}
            <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-all duration-700" />

            <div className="relative z-10 flex flex-col items-center justify-center text-center py-32 px-20">
              <Film className="w-12 h-12 text-blue-500/60 mb-10 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-700 animate-pulse" />
              <h2 className="text-6xl md:text-7xl font-bold mb-8 text-white font-cormorant tracking-tight group-hover:tracking-wide transition-all duration-700 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">Screenplay</h2>
              <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mb-8 group-hover:w-40 transition-all duration-700" />
              <p className="text-sm text-slate-400 font-light leading-relaxed tracking-wide max-w-md group-hover:text-slate-200 transition-all duration-700 font-sans">
                Constructing the geometry of sight and sound
              </p>
              <span className="text-[10px] uppercase text-blue-600/60 block mt-6 tracking-[0.3em] font-sans group-hover:text-blue-400 transition-colors duration-700">24 Frames Per Second</span>
            </div>
          </Link>

          {/* Novel - Vintage Manuscript Paper */}
          <Link href="/synopsis?mode=novel" className="group relative bg-[#181515] overflow-hidden transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_0_80px_rgba(220,38,38,0.3)] cursor-none">

            {/* Deckled Edge Paper Texture */}
            <div className="absolute inset-4 border border-white/5 bg-[#1c1917] shadow-inner">
              {/* Subtle Ruling Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_31px,rgba(255,255,255,0.03)_32px)] bg-[size:100%_32px]" />
              {/* Vertical Margin Line */}
              <div className="absolute left-16 top-0 bottom-0 w-[1px] bg-red-900/20" />
            </div>

            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.2] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

            <div className="relative z-10 flex flex-col items-center justify-center text-center py-32 px-20">
              <div className="mb-10 relative">
                <BookOpen className="w-12 h-12 text-rose-300/40 group-hover:text-rose-400 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute -inset-4 bg-rose-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <h2 className="text-6xl md:text-7xl font-bold mb-8 text-[#e7e5e4] font-cormorant tracking-tight group-hover:tracking-wide transition-all duration-700 drop-shadow-lg italic">Novel</h2>

              {/* Decorative Ink Divider */}
              <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-rose-900/60 to-transparent mb-8 group-hover:w-48 transition-all duration-700" />

              <p className="text-sm text-stone-400 font-serif italic leading-relaxed tracking-wide max-w-md group-hover:text-stone-300 transition-all duration-700">
                Pursuing the weight of every silent letter
              </p>

              <span className="text-[10px] uppercase text-rose-900/60 block mt-6 tracking-[0.3em] font-sans font-bold">First Draft • Typewriter</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="h-40" /> {/* Spacer instead of Auteur Details */}

      {/* Footer - Final Sequence */}
      <footer className="relative z-10 w-full px-8 md:px-20 py-32 border-t border-white/5 bg-black/90 backdrop-blur-3xl font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-20">
          <div className="md:col-span-8 space-y-12">
            <div className="flex items-center gap-6">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-600 shadow-[0_0_20px_rgba(225,29,72,0.8)] animate-pulse" />
              <span className="text-[10px] tracking-[0.6em] uppercase font-bold text-white/40 italic font-sans">The Vision</span>
            </div>
            <p className="text-[14px] text-slate-500 max-w-2xl font-light leading-loose tracking-[0.05em] font-sans">
              ToBeFilmed is a place where one should enter to start writing with an idea in mind of how this would look on the big screen. Every word has to be unique, creative, and authentic. AI is a tool here to support us in keeping our work uninfluenced by others, including AI.
            </p>
          </div>

          <div className="md:col-span-4 space-y-8 text-right">
            <h4 className="text-[9px] tracking-[0.4em] uppercase text-white/20 font-sans">Technical</h4>
            <div className="flex flex-col gap-4 text-[10px] tracking-widest text-slate-500 font-sans">
              <span>Vercel Deployment</span>
              <span>GitHub Repository</span>
              <span className="text-white/10 italic font-sans mt-4">© 2026 ToBeFilmed</span>
            </div>
          </div>
        </div>


      </footer>

      {/* Custom Interaction Layer */}
      <CinematicCursor />
    </main>
  );
}
