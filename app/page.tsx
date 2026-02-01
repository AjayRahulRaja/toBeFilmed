"use client";

import React from "react";
import Link from "next/link";
import { BackgroundMarquee } from "@/components/background-marquee";
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
        {/* Multi-layered overlays for depth (Villeneuve style) - Maximum visibility boost (+20% more transparent) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/5 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

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
              Directing The Immaterial
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

        {/* The Split Screen */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 w-full max-w-7xl relative overflow-hidden ring-1 ring-white/10 group/grid mt-20">

          {/* Screenplay */}
          <Link href="/synopsis?mode=screenplay" className="group relative bg-[#0a0a0a]/80 backdrop-blur-sm overflow-hidden p-16 md:p-24 transition-all duration-1000">
            <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/5 transition-colors duration-1000" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <Film className="w-6 h-6 text-indigo-400/40 mb-12 group-hover:text-indigo-400 group-hover:rotate-12 transition-all duration-1000" />
              <h2 className="text-5xl font-medium mb-6 text-white font-cormorant tracking-tight group-hover:tracking-widest transition-all duration-1000">Screenplay</h2>
              <p className="text-xs text-slate-500 font-light leading-[2] tracking-[0.1em] mb-12 max-w-xs group-hover:text-slate-300 transition-all duration-1000 font-sans">
                Constructing the geometry of sight and sound. <br />
                <span className="text-[10px] uppercase text-slate-700 block mt-4 font-sans">Structural Analysis • 24fps</span>
              </p>
              <div className="text-[9px] tracking-[0.4em] uppercase text-indigo-400/50 group-hover:text-indigo-400 transition-all duration-1000 flex items-center gap-4 font-sans">
                [ Initiation ] <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </Link>

          {/* Novel */}
          <Link href="/synopsis?mode=novel" className="group relative bg-[#0a0a0a]/80 backdrop-blur-sm overflow-hidden p-16 md:p-24 transition-all duration-1000">
            <div className="absolute inset-0 bg-rose-600/0 group-hover:bg-rose-600/5 transition-colors duration-1000" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <BookOpen className="w-6 h-6 text-rose-400/40 mb-12 group-hover:text-rose-400 group-hover:-rotate-12 transition-all duration-1000" />
              <h2 className="text-5xl font-medium mb-6 text-white font-cormorant tracking-tight group-hover:tracking-widest transition-all duration-1000">Novel</h2>
              <p className="text-xs text-slate-500 font-light leading-[2] tracking-[0.1em] mb-12 max-w-xs group-hover:text-slate-300 transition-all duration-1000 font-sans">
                Pursuing the weight of every silent letter. <br />
                <span className="text-[10px] uppercase text-slate-700 block mt-4 font-sans">Pure Prose • Manuscript Flow</span>
              </p>
              <div className="text-[9px] tracking-[0.4em] uppercase text-rose-400/50 group-hover:text-rose-400 transition-all duration-1000 flex items-center gap-4 font-sans">
                [ Composition ] <ArrowRight className="w-3 h-3" />
              </div>
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
              ToBeFilmed is the definitive workspace for modern storytellers. From the geometry of a perfectly structured screenplay to the poetic weight of a novel's manuscript, we provide the architectural tools to analyze, visualize, and perfect your vision before the first frame is ever captured.
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

        <div className="mt-40 text-center">
          <div className="inline-block px-12 py-4 border border-white/5 rounded-full backdrop-blur-sm grayscale opacity-30 hover:opacity-100 hover:grayscale-0 transition-all duration-1000 group cursor-default font-sans">
            <div className="text-[8px] tracking-[2em] uppercase text-slate-500 pl-[2em] group-hover:text-white transition-colors font-sans">
              Symmetry • Duration • Light • Mystery
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
