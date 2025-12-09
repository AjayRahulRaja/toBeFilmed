"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, ArrowRight, Loader2 } from "lucide-react";

export default function SynopsisPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const mode = searchParams.get("mode") || "screenplay";

    const [title, setTitle] = useState("");
    const [synopsis, setSynopsis] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const checkOriginality = async () => {
        if (!synopsis || !title) return;
        setLoading(true);
        setResult(null);

        try {
            const res = await fetch("http://localhost:8000/api/check-originality", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, synopsis }),
            });
            const data = await res.json();
            setResult(data);
        } catch (error) {
            console.error("Error checking originality:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleContinue = () => {
        // Save to local storage or context (mock)
        localStorage.setItem("project_title", title);
        localStorage.setItem("project_synopsis", synopsis);
        localStorage.setItem("project_mode", mode);
        router.push("/editor");
    };

    return (
        <main className="min-h-screen bg-slate-950 text-slate-50 p-6 flex flex-col items-center">
            <div className="max-w-3xl w-full space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-slate-100">
                        New {mode === "novel" ? "Novel" : "Screenplay"} Project
                    </h1>
                    <p className="text-slate-400">
                        First, let's check if your idea is unique. We compare your synopsis against thousands of films.
                    </p>
                </div>

                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-xl text-slate-100">Project Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Title</label>
                            <Input
                                placeholder="Enter working title..."
                                className="bg-slate-950 border-slate-800 text-slate-100 focus:ring-indigo-500"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Synopsis</label>
                            <Textarea
                                placeholder="Describe your story in 2-3 paragraphs..."
                                className="min-h-[200px] bg-slate-950 border-slate-800 text-slate-100 focus:ring-indigo-500"
                                value={synopsis}
                                onChange={(e) => setSynopsis(e.target.value)}
                            />
                        </div>

                        {!result && (
                            <Button
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                                onClick={checkOriginality}
                                disabled={loading || !title || !synopsis}
                            >
                                {loading ? (
                                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Checking Database...</>
                                ) : (
                                    "Check Originality"
                                )}
                            </Button>
                        )}
                    </CardContent>
                </Card>

                {result && (
                    <Card className={`border-2 ${result.is_blocked ? "border-red-900/50 bg-red-950/10" : "border-green-900/50 bg-green-950/10"}`}>
                        <CardContent className="pt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
                                        {result.is_blocked ? (
                                            <><AlertCircle className="text-red-500" /> High Similarity Detected</>
                                        ) : (
                                            <><CheckCircle className="text-green-500" /> Original Concept</>
                                        )}
                                    </h3>
                                    <p className="text-sm text-slate-400">
                                        Similarity Score: {Math.round(result.score * 100)}%
                                    </p>
                                </div>
                                <Badge variant={result.is_blocked ? "destructive" : "default"} className="text-lg px-4 py-1">
                                    {Math.round(result.score * 100)}% Match
                                </Badge>
                            </div>

                            <Progress value={result.score * 100} className={`h-2 ${result.is_blocked ? "bg-red-900" : "bg-green-900"}`} />

                            {result.is_blocked ? (
                                <div className="space-y-4">
                                    <p className="text-slate-300">
                                        Your story is too similar to existing works.
                                        Most notably: <span className="font-semibold text-white">"{result.match_text.slice(0, 50)}..."</span>
                                    </p>
                                    <div className="bg-red-950/30 p-4 rounded-md border border-red-900/30">
                                        <p className="text-red-200 text-sm">
                                            To encourage originality, we require a similarity score below 70%.
                                            Please rework your synopsis to highlight unique elements.
                                        </p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="w-full border-slate-700 text-slate-300 hover:bg-slate-800"
                                        onClick={() => setResult(null)}
                                    >
                                        Edit Synopsis
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <p className="text-slate-300">
                                        Great job! Your story concept appears unique. You can proceed to the editor.
                                    </p>
                                    <Button
                                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                                        onClick={handleContinue}
                                    >
                                        Start Writing <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </main>
    );
}
