"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Loader2, Copy, Check } from "lucide-react";

export function QueryLetter() {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [letter, setLetter] = useState("");
    const [copied, setCopied] = useState(false);

    const generateLetter = async () => {
        setLoading(true);
        const title = localStorage.getItem("project_title") || "";
        const synopsis = localStorage.getItem("project_synopsis") || "";

        try {
            const res = await fetch("http://localhost:8000/api/generate-query", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, synopsis }),
            });
            const data = await res.json();
            setLetter(data.letter);
        } catch (error) {
            console.error("Failed to generate letter:", error);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(letter);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800 ml-2">
                    <Mail className="h-4 w-4 mr-2" /> Query Agent
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-950 border-slate-800 text-slate-100 max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Generate Query Letter</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <p className="text-sm text-slate-400">
                        This tool generates a professional query letter based on your synopsis,
                        formatted for industry standards.
                    </p>

                    {!letter ? (
                        <div className="flex justify-center py-8">
                            <Button onClick={generateLetter} disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Writing...</> : "Generate Letter"}
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <Textarea
                                value={letter}
                                readOnly
                                className="min-h-[300px] font-mono text-sm bg-slate-900 border-slate-800 text-slate-300"
                            />
                            <div className="flex justify-end">
                                <Button onClick={copyToClipboard} variant="secondary" className="bg-slate-800 hover:bg-slate-700 text-slate-200">
                                    {copied ? <><Check className="mr-2 h-4 w-4" /> Copied</> : <><Copy className="mr-2 h-4 w-4" /> Copy Text</>}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
