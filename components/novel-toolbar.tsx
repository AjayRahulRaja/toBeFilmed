"use client";

import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    List,
    ListOrdered,
    Type,
} from "lucide-react";

interface NovelToolbarProps {
    editor: Editor | null;
}

export function NovelToolbar({ editor }: NovelToolbarProps) {
    if (!editor) {
        return null;
    }

    const toggleUppercase = () => {
        const { from, to } = editor.state.selection;
        const text = editor.state.doc.textBetween(from, to, " ");
        const upperText = text.toUpperCase();
        editor.chain().focus().deleteSelection().insertContent(upperText).run();
    };

    const toggleLowercase = () => {
        const { from, to } = editor.state.selection;
        const text = editor.state.doc.textBetween(from, to, " ");
        const lowerText = text.toLowerCase();
        editor.chain().focus().deleteSelection().insertContent(lowerText).run();
    };

    const toggleCapitalize = () => {
        const { from, to } = editor.state.selection;
        const text = editor.state.doc.textBetween(from, to, " ");
        const capitalizedText = text
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
        editor.chain().focus().deleteSelection().insertContent(capitalizedText).run();
    };

    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 backdrop-blur border-b border-slate-800 overflow-x-auto flex-wrap">
            {/* Text Formatting */}
            <div className="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`h-8 w-8 p-0 ${editor.isActive("bold") ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`}
                    title="Bold"
                >
                    <Bold className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`h-8 w-8 p-0 ${editor.isActive("italic") ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`}
                    title="Italic"
                >
                    <Italic className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`h-8 w-8 p-0 ${editor.isActive("underline") ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`}
                    title="Underline"
                >
                    <UnderlineIcon className="h-4 w-4" />
                </Button>
            </div>

            <Separator orientation="vertical" className="h-6 bg-slate-700" />

            {/* Text Transform */}
            <div className="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleUppercase}
                    className="h-8 px-2 text-slate-400 hover:text-white text-xs font-bold"
                    title="UPPERCASE"
                >
                    ABC
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleLowercase}
                    className="h-8 px-2 text-slate-400 hover:text-white text-xs"
                    title="lowercase"
                >
                    abc
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleCapitalize}
                    className="h-8 px-2 text-slate-400 hover:text-white text-xs"
                    title="Capitalize"
                >
                    Abc
                </Button>
            </div>

            <Separator orientation="vertical" className="h-6 bg-slate-700" />

            {/* Alignment */}
            <div className="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().setTextAlign("left").run()}
                    className={`h-8 w-8 p-0 ${editor.isActive({ textAlign: "left" }) ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`}
                    title="Align Left"
                >
                    <AlignLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().setTextAlign("center").run()}
                    className={`h-8 w-8 p-0 ${editor.isActive({ textAlign: "center" }) ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`}
                    title="Align Center"
                >
                    <AlignCenter className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().setTextAlign("right").run()}
                    className={`h-8 w-8 p-0 ${editor.isActive({ textAlign: "right" }) ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`}
                    title="Align Right"
                >
                    <AlignRight className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().setTextAlign("justify").run()}
                    className={`h-8 w-8 p-0 ${editor.isActive({ textAlign: "justify" }) ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`}
                    title="Justify"
                >
                    <AlignJustify className="h-4 w-4" />
                </Button>
            </div>

            <Separator orientation="vertical" className="h-6 bg-slate-700" />

            {/* Lists */}
            <div className="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`h-8 w-8 p-0 ${editor.isActive("bulletList") ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`}
                    title="Bullet List"
                >
                    <List className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`h-8 w-8 p-0 ${editor.isActive("orderedList") ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`}
                    title="Numbered List"
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
