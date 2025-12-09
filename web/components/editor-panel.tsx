"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

interface EditorPanelProps {
    mode: string;
    content: string;
    onChange: (value: string) => void;
}

export function EditorPanel({ mode, content, onChange }: EditorPanelProps) {

    // Initial load logic moved to parent or kept here? 
    // It's better to keep the initial load logic in the parent or a separate hook
    // But for now, we'll just render what's passed.

    return (
        <div className="h-full p-8 max-w-3xl mx-auto">
            <Textarea
                className="w-full h-full min-h-[80vh] resize-none bg-transparent border-none focus-visible:ring-0 text-lg leading-relaxed font-mono text-slate-300 placeholder:text-slate-700"
                placeholder={mode === "screenplay" ? "INT. SCENE - DAY..." : "Start writing your chapter..."}
                value={content}
                onChange={(e) => onChange(e.target.value)}
                spellCheck={false}
            />
        </div>
    );
}
