import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clapperboard, BookOpen } from "lucide-react";
import { BackgroundMarquee } from "@/components/background-marquee";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-slate-950 text-slate-50 p-4 overflow-hidden">
      {/* Cinematic Background */}
      <BackgroundMarquee />

      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 bg-gradient-to-r from-red-500 to-amber-600 bg-clip-text text-transparent drop-shadow-lg">
            ToBeFilmed
          </h1>
          <p className="text-2xl text-slate-300 max-w-xl drop-shadow-md font-medium leading-relaxed">
            A writing companion that helps you craft original stories,
            visualize your scenes, and get noticed by the industry—using AI to assist, not to write.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          <Link href="/synopsis?mode=screenplay" className="group">
            <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-800 hover:border-indigo-500 transition-all duration-300 h-full group-hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)] group-hover:-translate-y-1">
              <CardHeader>
                <Clapperboard className="w-12 h-12 text-indigo-400 mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-2xl text-slate-100">Screenplay</CardTitle>
                <CardDescription className="text-slate-400">
                  Write a film or TV script. Auto-format scenes, generate storyboards, and create animatics.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
                  Start Screenplay
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/synopsis?mode=novel" className="group">
            <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-800 hover:border-cyan-500 transition-all duration-300 h-full group-hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)] group-hover:-translate-y-1">
              <CardHeader>
                <BookOpen className="w-12 h-12 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-2xl text-slate-100">Novel</CardTitle>
                <CardDescription className="text-slate-400">
                  Write a book. Organize chapters, visualize characters, and track your plot arcs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold">
                  Start Novel
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  );
}
