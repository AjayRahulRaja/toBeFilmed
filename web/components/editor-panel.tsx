"use client";

import { Textarea } from "@/components/ui/textarea";
import { KeyboardEvent, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { NovelToolbar } from "@/components/novel-toolbar";

interface EditorPanelProps {
    mode: string;
    content: string;
    onChange: (value: string) => void;
}

export function EditorPanel({ mode, content, onChange }: EditorPanelProps) {
    const isNovel = mode === "novel";
    const isScreenplay = mode === "screenplay";

    // Tiptap editor for Novel mode
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Underline,
        ],
        content: content || "",
        immediatelyRender: false, // Required for Next.js SSR
        editorProps: {
            attributes: {
                class: "prose prose-invert max-w-none focus:outline-none min-h-[80vh] text-lg leading-loose",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    // Sync content when it changes externally
    useEffect(() => {
        if (editor && isNovel && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor, isNovel]);

    const handleScreenplayKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            const textarea = e.currentTarget;
            const cursorPos = textarea.selectionStart;
            const textBeforeCursor = content.substring(0, cursorPos);
            const lines = textBeforeCursor.split('\n');
            const currentLine = lines[lines.length - 1];
            const trimmed = currentLine.trim();

            // After Scene Heading (ALL CAPS) -> Action (blank line)
            if (currentLine === currentLine.toUpperCase() && trimmed.length > 0 && !currentLine.startsWith('@') && !currentLine.startsWith('$') && !currentLine.startsWith('>') && !currentLine.startsWith('#') && !currentLine.startsWith('~') && !currentLine.startsWith('%') && !currentLine.startsWith('&')) {
                e.preventDefault();
                const newContent = content.substring(0, cursorPos) + '\n\n' + content.substring(cursorPos);
                onChange(newContent);
                setTimeout(() => {
                    textarea.selectionStart = textarea.selectionEnd = cursorPos + 2;
                }, 0);
                return;
            }

            // After Character (@) -> Dialogue ($)
            if (currentLine.trim().startsWith('@')) {
                e.preventDefault();
                const newContent = content.substring(0, cursorPos) + '\n$' + content.substring(cursorPos);
                onChange(newContent);
                setTimeout(() => {
                    textarea.selectionStart = textarea.selectionEnd = cursorPos + 2;
                }, 0);
                return;
            }

            // After Dialogue ($) -> Keep Dialogue ($) OR if blank -> Action
            if (currentLine.trim().startsWith('$')) {
                e.preventDefault();
                // If dialogue line is blank (just $ or $ with whitespace), go to Action
                if (currentLine.trim() === '$') {
                    const newContent = content.substring(0, cursorPos) + '\n\n' + content.substring(cursorPos);
                    onChange(newContent);
                    setTimeout(() => {
                        textarea.selectionStart = textarea.selectionEnd = cursorPos + 2;
                    }, 0);
                } else {
                    // Continue with dialogue
                    const newContent = content.substring(0, cursorPos) + '\n$' + content.substring(cursorPos);
                    onChange(newContent);
                    setTimeout(() => {
                        textarea.selectionStart = textarea.selectionEnd = cursorPos + 2;
                    }, 0);
                }
                return;
            }

            // After Parenthetical -> Dialogue ($)
            if (trimmed.startsWith('(') && trimmed.endsWith(')')) {
                e.preventDefault();
                const newContent = content.substring(0, cursorPos) + '\n$' + content.substring(cursorPos);
                onChange(newContent);
                setTimeout(() => {
                    textarea.selectionStart = textarea.selectionEnd = cursorPos + 2;
                }, 0);
                return;
            }

            // After Transition (>) -> Scene Heading (blank line)
            if (currentLine.trim().startsWith('>')) {
                e.preventDefault();
                const newContent = content.substring(0, cursorPos) + '\n\n' + content.substring(cursorPos);
                onChange(newContent);
                setTimeout(() => {
                    textarea.selectionStart = textarea.selectionEnd = cursorPos + 2;
                }, 0);
                return;
            }

            // Default: Action stays Action (regular text stays regular text)
            // Just let Enter work normally
        }
    };

    const renderFormattedOverlay = () => {
        if (!isScreenplay) return null;

        return (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="whitespace-pre-wrap font-mono"
                    style={{
                        fontSize: '16px',
                        lineHeight: '24px',
                        padding: '0',
                        margin: '0'
                    }}
                >
                    {content.split('\n').map((line, idx) => {
                        const trimmed = line.trim();

                        // Character names (@)
                        if (line.startsWith('@')) {
                            return <div key={idx} className="text-center font-bold text-slate-100">{line.substring(1) || '\u00A0'}</div>;
                        }
                        // Dialogue ($)
                        if (line.startsWith('$')) {
                            return <div key={idx} className="ml-24 max-w-md text-slate-200">{line.substring(1) || '\u00A0'}</div>;
                        }
                        // Parentheticals
                        if (trimmed.startsWith('(') && trimmed.endsWith(')')) {
                            return <div key={idx} className="ml-20 text-slate-300">{line || '\u00A0'}</div>;
                        }
                        // Transitions (>)
                        if (line.startsWith('>')) {
                            return <div key={idx} className="text-right font-bold text-slate-100">{line.substring(1) || '\u00A0'}</div>;
                        }
                        // Shots (#)
                        if (line.startsWith('#')) {
                            return <div key={idx} className="ml-8 font-bold text-slate-200">{line.substring(1) || '\u00A0'}</div>;
                        }
                        // Music (~)
                        if (line.startsWith('~')) {
                            return <div key={idx} className="text-center italic text-slate-200">{line.substring(1) || '\u00A0'}</div>;
                        }
                        // Montage (%)
                        if (line.startsWith('%')) {
                            return <div key={idx} className="text-center font-bold uppercase text-slate-100">{line.substring(1) || '\u00A0'}</div>;
                        }
                        // Flashback (&)
                        if (line.startsWith('&')) {
                            return <div key={idx} className="font-bold italic text-slate-200">{line.substring(1) || '\u00A0'}</div>;
                        }
                        // Notes
                        if (line.startsWith('[[') && line.endsWith(']]')) {
                            return <div key={idx} className="text-amber-400 italic text-sm">{line || '\u00A0'}</div>;
                        }
                        // Page breaks
                        if (line.startsWith('===')) {
                            return <div key={idx} className="border-t-2 border-slate-600 my-2 text-center text-xs text-slate-500">{line.replace(/=/g, '') || '\u00A0'}</div>;
                        }
                        // Scene headings (ALL CAPS)
                        if (line === line.toUpperCase() && line.trim().length > 0 && !line.startsWith('(')) {
                            return <div key={idx} className="font-bold text-slate-100">{line || '\u00A0'}</div>;
                        }
                        // Regular action lines
                        return <div key={idx} className="text-slate-300">{line || '\u00A0'}</div>;
                    })}
                </div>
            </div>
        );
    };

    if (isScreenplay) {
        return (
            <div className="h-full px-8 py-4 overflow-y-auto">
                <div className="max-w-3xl mx-auto relative">
                    <textarea
                        className="w-full min-h-[80vh] resize-none bg-transparent border-none focus:outline-none font-mono text-transparent caret-slate-400 relative z-10"
                        style={{
                            fontSize: '16px',
                            lineHeight: '24px',
                            padding: '0',
                            margin: '0',
                            border: 'none',
                            outline: 'none'
                        }}
                        placeholder=""
                        value={content}
                        onChange={(e) => onChange(e.target.value)}
                        onKeyDown={handleScreenplayKeyDown}
                        spellCheck={true}
                    />
                    {renderFormattedOverlay()}
                </div>
            </div>
        );
    }

    // Novel mode with Tiptap
    return (
        <div className="h-full flex flex-col">
            <NovelToolbar editor={editor} />
            <div className="flex-1 p-12 max-w-4xl mx-auto overflow-y-auto w-full">
                <EditorContent
                    editor={editor}
                    className="w-full h-full prose-slate prose-headings:text-slate-100 prose-p:text-slate-200 prose-strong:text-slate-100 prose-em:text-slate-300"
                />
            </div>
        </div>
    );
}
