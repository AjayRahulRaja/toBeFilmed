"use client";

import Link from "next/link";
import { BackgroundMarquee } from "@/components/background-marquee";
import { motion } from "framer-motion";
import { Clapperboard, BookOpen, Film, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-slate-200 overflow-hidden font-sans">
      {/* Cinematic Background with stronger grain and darker overlay */}
      <div className="fixed inset-0 z-0">
        <BackgroundMarquee />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black/90" />
        {/* Film Grain Overlay - Using a subtle SVG filter effect via CSS */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay bg-repeat bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* Navigation - Minimalist/Haneke style */}
      <nav className="relative z-50 flex justify-between items-center px-8 md:px-12 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="text-xs tracking-[0.4em] uppercase font-light text-slate-400"
        >
          Aesthete Studio
        </motion.div>
        <div className="flex gap-8 text-[10px] tracking-[0.2em] uppercase font-medium text-slate-500">
          <Link href="#" className="hover:text-white transition-colors">Manifesto</Link>
          <Link href="#" className="hover:text-white transition-colors">Archive</Link>
        </div>
      </nav>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
        {/* Title - Kubrick Symmetry & A24 Boldness */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 mb-16"
        >
          <h1 className="text-[14vw] md:text-[10vw] font-bold tracking-[-0.05em] leading-[0.8] font-cormorant text-white drop-shadow-2xl">
            ToBeFilmed
          </h1>
          <div className="flex items-center justify-center gap-6">
            <div className="h-[1px] w-12 bg-white/10" />
            <p className="text-[10px] md:text-xs tracking-[0.6em] uppercase font-light text-slate-500">
              The Auteur's Companion
            </p>
            <div className="h-[1px] w-12 bg-white/10" />
          </div>
        </motion.div>

        {/* Subtitle - Tarkovsky/Kore-eda Poeticism */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
          className="max-w-2xl text-lg md:text-xl font-light text-slate-400 leading-relaxed italic mb-16 font-cormorant px-6"
        >
          "Film is a mosaic made of time." — Tarkovsky. <br />
          <span className="text-slate-600 not-italic text-sm tracking-widest uppercase mt-4 block">
            We provide the fragments. You compose the masterpiece.
          </span>
        </motion.div>

        {/* Main Actions - Blade Runner Contrast & Nolan Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl relative px-4">
          {/* Screenplay - The Indigo Lens */}
          <motion.div
            whileHover={{ scale: 1.01, y: -4 }}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.2 }}
            className="group relative"
          >
            <Link href="/synopsis?mode=screenplay">
              <div className="absolute inset-0 bg-indigo-500/5 blur-[100px] group-hover:bg-indigo-500/10 transition-all rounded-full" />
              <div className="relative overflow-hidden bg-white/[0.02] border border-white/5 backdrop-blur-3xl p-8 md:p-12 rounded-sm hover:border-indigo-500/40 transition-all duration-700">
                <Film className="w-6 h-6 text-indigo-400/60 mb-8 font-thin transition-all group-hover:text-indigo-400 group-hover:scale-110" />
                <h2 className="text-4xl font-medium mb-4 text-white font-cormorant tracking-tight">Screenplay</h2>
                <p className="text-sm text-slate-500 font-light leading-relaxed mb-10 group-hover:text-slate-300 transition-colors">
                  Craft your three-act opus. Symmetric formatting, AI-assisted mise-en-scène, and original script analytics for the modern cinephile.
                </p>
                <div className="text-[9px] tracking-[0.3em] uppercase text-indigo-400/80 group-hover:text-indigo-300 group-hover:translate-x-2 transition-all flex items-center gap-3">
                  Initiate Sequence <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Novel - The Amber Lens */}
          <motion.div
            whileHover={{ scale: 1.01, y: -4 }}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.2 }}
            className="group relative"
          >
            <Link href="/synopsis?mode=novel">
              <div className="absolute inset-0 bg-amber-500/5 blur-[100px] group-hover:bg-amber-500/10 transition-all rounded-full" />
              <div className="relative overflow-hidden bg-white/[0.02] border border-white/5 backdrop-blur-3xl p-8 md:p-12 rounded-sm hover:border-amber-500/40 transition-all duration-700">
                <BookOpen className="w-6 h-6 text-amber-400/60 mb-8 font-thin transition-all group-hover:text-amber-400 group-hover:scale-110" />
                <h2 className="text-4xl font-medium mb-4 text-white font-cormorant tracking-tight">Novel</h2>
                <p className="text-sm text-slate-500 font-light leading-relaxed mb-10 group-hover:text-slate-300 transition-colors">
                  Pen your literary masterpiece. Rich text architecture designed for novelists who value the poetic weight of every word and silence.
                </p>
                <div className="text-[9px] tracking-[0.3em] uppercase text-amber-400/80 group-hover:text-amber-300 group-hover:translate-x-2 transition-all flex items-center gap-3">
                  Begin Manuscript <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer - Wong Kar-wai color accent & minimalist info */}
      <footer className="relative z-10 w-full mt-32 px-8 md:px-12 py-16 border-t border-white/5 bg-black/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_12px_rgba(220,38,38,0.9)] animate-pulse" /> {/* 2049/Chungking Red */}
              <span className="text-[9px] tracking-[0.4em] uppercase font-bold text-white/80">Directing Reality</span>
            </div>
            <p className="text-[11px] text-slate-500 max-w-sm font-light leading-loose">
              Designed for those who understand that cinema is not just a medium, but a way of seeing. Inspired by the clinical precision of Haneke, the poetry of Kore-eda, and the brutalism of Villeneuve's Blade Runner.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-16 text-[9px] tracking-[0.25em] uppercase font-medium text-slate-500">
            <div className="flex flex-col gap-3">
              <span className="text-white/10 mb-1">Inspirations</span>
              <span className="text-slate-400/60">A24</span>
              <span className="text-slate-400/60">Criterion</span>
              <span className="text-slate-400/60">MUBI</span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-white/10 mb-1">Legal</span>
              <span className="text-slate-400/60">© 2026 Vision</span>
              <span className="text-slate-400/60">Privacy Policy</span>
              <span className="text-slate-400/60">Auteur Terms</span>
            </div>
          </div>
        </div>
        <div className="mt-20 text-center text-[7px] tracking-[1.5em] uppercase text-slate-800 font-bold">
          Symmetry • Time • Light • Shadow • Memory
        </div>
      </footer>
    </main>
  );
}

