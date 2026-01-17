"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { EditorPanel } from "@/components/editor-panel";
import { VisualizationPanel } from "@/components/visualization-panel";
import { PitchDeck } from "@/components/pitch-deck";
import { QueryLetter } from "@/components/query-letter";
import { ScreenplayToolbar } from "@/components/screenplay-toolbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Share2 } from "lucide-react";
import Link from "next/link";

import { CompletionCertificate } from "@/components/completion-certificate";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";

function EditorContent() {
    const searchParams = useSearchParams();
    const mode = searchParams.get("mode") || "screenplay";
    const [title, setTitle] = useState("Untitled Project");
    const [content, setContent] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Certificate State
    const [showCertificate, setShowCertificate] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [certificateData, setCertificateData] = useState<any>(null);
    const [analyzing, setAnalyzing] = useState(false);

    // Scene Match State
    const [isSceneMatchEnabled, setIsSceneMatchEnabled] = useState(false);
    const [sceneMatch, setSceneMatch] = useState<any>(null);
    const [debouncedContent, setDebouncedContent] = useState(content);

    useEffect(() => {
        const savedTitle = localStorage.getItem("project_title");
        const savedSynopsis = localStorage.getItem("project_synopsis");
        if (savedTitle) setTitle(savedTitle);

        // Initialize content if empty
        if (!content && savedSynopsis) {
            setContent(mode === "screenplay" ? `EXT. LOCATION - DAY\n\n${savedSynopsis}` : `CHAPTER 1\n\n${savedSynopsis}`);
        }
    }, []);

    // Debounce content effect
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedContent(content);
        }, 1000); // Check 1 second after typing stops

        return () => clearTimeout(handler);
    }, [content]);

    // Check for matches effect
    useEffect(() => {
        if (!isSceneMatchEnabled || !debouncedContent || debouncedContent.length < 20) {
            setSceneMatch(null);
            return;
        }

        const checkMatch = async () => {
            try {
                // Focus slightly on the current block/paragraph (simplified: check last 500 chars)
                // In a real app we'd parse the scene currently being edited.
                // For this demo, let's send the whole text (or last chunk)
                const textToCheck = debouncedContent.length > 500
                    ? debouncedContent.slice(-500)
                    : debouncedContent;

                const res = await fetch("http://localhost:8000/api/check-scene-match", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ scene_text: textToCheck }),
                });
                const data = await res.json();
                if (data.match) {
                    setSceneMatch(data.match);
                } else {
                    setSceneMatch(null);
                }
            } catch (error) {
                console.error("Scene match check failed:", error);
            }
        };

        checkMatch();
    }, [debouncedContent, isSceneMatchEnabled]);

    const handleInsertFormat = (formatText: string) => {
        const textarea = document.querySelector('textarea');
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newContent = content.substring(0, start) + formatText + content.substring(end);
        setContent(newContent);

        // Set cursor position after inserted text
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + formatText.length, start + formatText.length);
        }, 0);
    };

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
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Screenplay Toolbar - Only in screenplay mode */}
                {mode === "screenplay" && (
                    <ScreenplayToolbar
                        onInsert={handleInsertFormat}
                        isMatchEnabled={isSceneMatchEnabled}
                        onToggleMatch={() => setIsSceneMatchEnabled(!isSceneMatchEnabled)}
                    />
                )}

                <div className="flex-1 flex overflow-hidden">
                    {/* Left: Editor */}
                    <div className="flex-1 border-r border-slate-800 overflow-y-auto relative">
                        {isSceneMatchEnabled && sceneMatch && (
                            <div className="absolute top-4 right-4 z-10 w-80 bg-slate-900 border border-purple-500/50 rounded-lg p-4 shadow-2xl shadow-purple-900/20 backdrop-blur-md">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-sm font-semibold text-purple-400 flex items-center gap-2">
                                        <Sparkles className="h-4 w-4" />
                                        Existing Scene Detected
                                    </h3>
                                    <span className="text-xs font-bold bg-purple-900/50 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">
                                        {sceneMatch.match_score}% Match
                                    </span>
                                </div>
                                <div className="space-y-2 text-sm text-slate-300">
                                    <p><span className="text-slate-500">Film:</span> <span className="font-medium text-white">{sceneMatch.film} ({sceneMatch.year})</span></p>
                                    <p><span className="text-slate-500">Director:</span> {sceneMatch.director}</p>
                                    <p><span className="text-slate-500">Runtime:</span> {sceneMatch.runtime}</p>
                                    <p><span className="text-slate-500">Timestamp:</span> <span className="font-mono text-xs bg-slate-800 px-1 py-0.5 rounded">{sceneMatch.scene_timestamp}</span></p>
                                    <p><span className="text-slate-500">Language:</span> {sceneMatch.language || "English"}</p>

                                    <div className="mt-3 pt-3 border-t border-slate-800 text-xs italic text-slate-500 line-clamp-3">
                                        "{sceneMatch.text}"
                                    </div>
                                </div>
                            </div>
                        )}
                        <EditorPanel mode={mode} content={content} onChange={setContent} />
                    </div>

                    {/* Right: Visualization */}
                    <div className="w-[400px] bg-slate-900/30 overflow-y-auto border-l border-slate-800">
                        <VisualizationPanel />
                    </div>
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

export default function EditorPage() {
    return (
        <Suspense fallback={
            <div className="h-screen w-screen flex items-center justify-center bg-slate-950">
                <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
            </div>
        }>
            <EditorContent />
        </Suspense>
    );
}
