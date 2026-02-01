"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    User,
    MessageSquare,
    Film,
    Clapperboard,
    Type,
    ArrowRight,
    Camera,
    Users,
    Music,
    FileText,
    SplitSquareHorizontal,
    StickyNote,
    Clock,
    Sparkles
} from "lucide-react";

interface ScreenplayToolbarProps {
    onInsert: (format: string) => void;
    isMatchEnabled: boolean;
    onToggleMatch: () => void;
}

export function ScreenplayToolbar({ onInsert, isMatchEnabled, onToggleMatch }: ScreenplayToolbarProps) {
    // Formatting markers only - no placeholder text
    const formats = [
        { label: "Scene Heading", icon: Clapperboard, value: "\n\nINT. " },
        { label: "Action", icon: Film, value: "\n\n" },
        { label: "Character", icon: User, value: "\n\n@" }, // @ for center
        { label: "Dialogue", icon: MessageSquare, value: "$" }, // $ for dialogue (indented)
        { label: "Parenthetical", icon: Type, value: "()" }, // Parenthetical
        { label: "Transition", icon: ArrowRight, value: "\n\n>" }, // > for right-align
        { label: "Shot", icon: Camera, value: "\n\n#" }, // # for shot
        { label: "Dual Dialogue", icon: Users, value: "\n\n@          @\n" },
        { label: "Music Cue", icon: Music, value: "\n\n~" }, // ~ for music
        { label: "Montage/Intercut", icon: SplitSquareHorizontal, value: "\n\n%MONTAGE - " }, // % for montage
        { label: "Flashback", icon: Clock, value: "\n\n&FLASHBACK - " }, // & for flashback
        { label: "Note", icon: StickyNote, value: "\n\n[[NOTE: " }, // [[ ]] for notes
        { label: "Page Break", icon: FileText, value: "\n\n===PAGE BREAK===\n\n" }, // === for page break
    ];

    return (
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900/50 backdrop-blur border-b border-slate-800 overflow-x-auto">
            <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium mr-2 shrink-0">Insert:</span>
                {formats.map((format, idx) => (
                    <div key={format.label} className="flex items-center gap-2">
                        {idx > 0 && idx % 5 === 0 && <Separator orientation="vertical" className="h-6 bg-slate-700" />}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onInsert(format.value)}
                            className="text-slate-300 hover:text-white hover:bg-slate-800 gap-2 shrink-0"
                            title={format.label}
                        >
                            <format.icon className="h-4 w-4" />
                            <span className="text-xs hidden md:inline">{format.label}</span>
                        </Button>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-2 pl-4 border-l border-slate-800 ml-4">
                <Button
                    variant={isMatchEnabled ? "default" : "ghost"}
                    size="sm"
                    onClick={onToggleMatch}
                    className={`gap-2 ${isMatchEnabled ? "bg-purple-600 hover:bg-purple-700 text-white" : "text-slate-400 hover:text-white"}`}
                >
                    <Sparkles className="h-4 w-4" />
                    <span className="text-xs">AI Scene Match</span>
                </Button>
            </div>
        </div>
    );
}
