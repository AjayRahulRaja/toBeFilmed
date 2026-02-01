"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, CheckCircle, Copy } from "lucide-react";

export function PitchDeck() {
    const [title, setTitle] = useState("");
    const [synopsis, setSynopsis] = useState("");

    useEffect(() => {
        setTitle(localStorage.getItem("project_title") || "Untitled");
        setSynopsis(localStorage.getItem("project_synopsis") || "");
    }, []);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Share2 className="h-4 w-4 mr-2" /> Export Pitch
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-950 border-slate-800 text-slate-100 max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center mb-8">Project Pitch Deck</DialogTitle>
                </DialogHeader>

                <div className="space-y-8">
                    {/* Slide 1: Title Card */}
                    <div className="bg-slate-900 p-8 rounded-lg border border-slate-800 text-center space-y-4">
                        <h1 className="text-4xl font-black tracking-tight text-white uppercase">{title}</h1>
                        <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/50 px-4 py-1 text-sm">
                            <CheckCircle className="w-4 h-4 mr-2" /> Verified Original Concept
                        </Badge>
                        <p className="text-slate-400 max-w-2xl mx-auto italic">
                            "A high-concept thriller that defies expectations."
                        </p>
                    </div>

                    {/* Slide 2: Logline & Synopsis */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-indigo-400">Logline</h3>
                            <p className="text-lg text-slate-300 leading-relaxed">
                                {synopsis.split('.')[0]}.
                            </p>

                            <h3 className="text-xl font-semibold text-indigo-400 mt-8">Synopsis</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                {synopsis}
                            </p>
                        </div>

                        {/* Slide 3: Visuals */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-indigo-400">Visual Style</h3>
                            <div className="aspect-video bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-center overflow-hidden">
                                {/* Placeholder for generated image */}
                                <div className="text-slate-600 text-center p-4">
                                    <p>Generated Concept Art</p>
                                    <p className="text-xs opacity-50">(Select a scene in the editor to feature here)</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="aspect-video bg-slate-900 rounded-lg border border-slate-800"></div>
                                <div className="aspect-video bg-slate-900 rounded-lg border border-slate-800"></div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-center pt-8 border-t border-slate-800">
                        <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                            <Copy className="h-4 w-4 mr-2" /> Copy Shareable Link
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
