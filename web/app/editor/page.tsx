"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { EditorPanel } from "@/components/editor-panel";
import { VisualizationPanel } from "@/components/visualization-panel";
import { PitchDeck } from "@/components/pitch-deck";
import { QueryLetter } from "@/components/query-letter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Share2 } from "lucide-react";
import Link from "next/link";

import { CompletionCertificate } from "@/components/completion-certificate";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function EditorPage() {
    const searchParams = useSearchParams();
    const mode = searchParams.get("mode") || "screenplay";
    const [title, setTitle] = useState("Untitled Project");
    const [content, setContent] = useState("");

    // Certificate State
    const [showCertificate, setShowCertificate] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [certificateData, setCertificateData] = useState<any>(null);
    const [analyzing, setAnalyzing] = useState(false);

    useEffect(() => {
        const savedTitle = localStorage.getItem("project_title");
        const savedSynopsis = localStorage.getItem("project_synopsis");
        if (savedTitle) setTitle(savedTitle);

        // Initialize content if empty
        if (!content && savedSynopsis) {
            setContent(mode === "screenplay" ? `EXT. LOCATION - DAY\n\n${savedSynopsis}` : `CHAPTER 1\n\n${savedSynopsis}`);
        }
    }, []);

    const handleCompleteClick = () => {
        if (!content) return;
        setShowConfirmation(true);
    };

    const proceedWithCompletion = async () => {
        setShowConfirmation(false);
        setAnalyzing(true);
        try {
            const res = await fetch("http://localhost:8000/api/analyze-script", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ scene_text: content }), // Reusing endpoint schema
            });
            const stats = await res.json();

            setCertificateData({
                title: title,
                synopsis: localStorage.getItem("project_synopsis") || "A compelling story.",
                ...stats
            });
            setShowCertificate(true);
        } catch (error) {
            console.error("Analysis failed:", error);
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <main className="h-screen flex flex-col bg-slate-950 text-slate-50 overflow-hidden">
            {/* Header */}
            <header className="h-14 border-b border-slate-800 flex items-center justify-between px-4 bg-slate-900/50 backdrop-blur">
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="font-semibold text-slate-100">{title}</h1>
                        <p className="text-xs text-slate-500 capitalize">{mode} Mode</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="default"
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={handleCompleteClick}
                        disabled={analyzing}
                    >
                        {analyzing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CheckCircle2 className="h-4 w-4 mr-2" />}
                        {analyzing ? "Analyzing..." : "Complete Project"}
                    </Button>
                    <div className="h-6 w-px bg-slate-800 mx-2" />
                    <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                        <Save className="h-4 w-4 mr-2" /> Save
                    </Button>
                    <PitchDeck />
                    <QueryLetter />
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left: Editor */}
                <div className="flex-1 border-r border-slate-800 overflow-y-auto">
                    <EditorPanel mode={mode} content={content} onChange={setContent} />
                </div>

                {/* Right: Visualization */}
                <div className="w-[400px] bg-slate-900/30 overflow-y-auto border-l border-slate-800">
                    <VisualizationPanel />
                </div>
            </div>

            <CompletionCertificate
                open={showCertificate}
                onOpenChange={setShowCertificate}
                data={certificateData}
            />

            {/* Confirmation Dialog */}
            <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
                <DialogContent className="bg-slate-900 text-slate-50 border-slate-800 sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Complete Project?</DialogTitle>
                        <DialogDescription className="text-slate-400">
                            Are you sure you want to mark this draft as complete? This will generate your completion certificate.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex gap-2 sm:justify-end">
                        <Button variant="outline" onClick={() => setShowConfirmation(false)} className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                            Go Back
                        </Button>
                        <Button onClick={proceedWithCompletion} className="bg-green-600 hover:bg-green-700 text-white">
                            Yes, Complete Draft
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </main>
    );
}
