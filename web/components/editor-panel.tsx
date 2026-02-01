"use client";

import { Textarea } from "@/components/ui/textarea";
import { KeyboardEvent, useEffect, useState, useRef, useMemo } from "react";
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
    const [cursorPos, setCursorPos] = useState(0);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

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

    // Calculate dynamic style for the textarea based on the current line
    const dynamicStyle = useMemo(() => {
        if (!isScreenplay) return {};

        const textBeforeCursor = content.substring(0, cursorPos);
        const lines = textBeforeCursor.split('\n');
        const currentLine = lines[lines.length - 1];
        const trimmed = currentLine.trim();

        // Locked font metrics to ensure zero drift
        const baseStyle = {
            textAlign: 'left' as const,
            paddingLeft: '0px',
            paddingRight: '0px',
            width: '100%',
            transform: 'none',
            letterSpacing: '0px',
            fontFeatureSettings: '"tnum" 1',
            fontVariantNumeric: 'tabular-nums' as const,
            WebkitFontSmoothing: 'antialiased' as const,
            MozOsxFontSmoothing: 'grayscale' as const,
            fontFamily: '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        };

        // Character (@) -> Centered, shift left by 0.5ch to account for hidden @
        if (currentLine.startsWith('@')) {
            return {
                ...baseStyle,
                textAlign: 'center' as const,
                transform: 'translateX(-0.5ch)'
            };
        }

        // Dialogue ($) -> Indentation: 96px (6rem). 
        // Compensation: Shift padding-left by -1ch to align text start after stripping $
        if (currentLine.startsWith('$')) {
            return {
                ...baseStyle,
                paddingLeft: 'calc(96px - 1ch)',
                paddingRight: 'calc(100% - 96px - 448px)', // Sync with ml-24 (96px) and max-w-md (448px)
            };
        }

        // Parenthetical -> Indentation: 80px (5rem). No prefix stripped.
        if (trimmed.startsWith('(') && trimmed.endsWith(')')) {
            return {
                ...baseStyle,
                paddingLeft: '80px',
                paddingRight: '80px',
            };
        }

        // Music (~) -> Centered, shift left by 0.5ch
        if (currentLine.startsWith('~')) {
            return {
                ...baseStyle,
                textAlign: 'center' as const,
                transform: 'translateX(-0.5ch)'
            };
        }

        // Transitions (>) -> Right, shift right by 1ch to stay at margin
        if (currentLine.startsWith('>')) {
            return {
                ...baseStyle,
                textAlign: 'right' as const,
                transform: 'translateX(1ch)'
            };
        }

        // Montage (%) -> Centered, shift left by 0.5ch
        if (currentLine.startsWith('%')) {
            return {
                ...baseStyle,
                textAlign: 'center' as const,
                transform: 'translateX(-0.5ch)'
            };
        }

        return baseStyle;
    }, [content, cursorPos, isScreenplay]);

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
                    setCursorPos(cursorPos + 2);
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
                    setCursorPos(cursorPos + 2);
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
                        setCursorPos(cursorPos + 2);
                    }, 0);
                } else {
                    // Continue with dialogue
                    const newContent = content.substring(0, cursorPos) + '\n$' + content.substring(cursorPos);
                    onChange(newContent);
                    setTimeout(() => {
                        textarea.selectionStart = textarea.selectionEnd = cursorPos + 2;
                        setCursorPos(cursorPos + 2);
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
                    setCursorPos(cursorPos + 2);
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
                    setCursorPos(cursorPos + 2);
                }, 0);
                return;
            }

            // Normal enter updates cursor pos too
            setTimeout(() => {
                setCursorPos(textarea.selectionStart);
            }, 0);
        }
    };

    const renderFormattedOverlay = () => {
        if (!isScreenplay) return null;

        return (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="whitespace-pre-wrap"
                    style={{
                        fontSize: '16px',
                        lineHeight: '24px',
                        padding: '0',
                        margin: '0',
                        letterSpacing: '0px',
                        fontFeatureSettings: '"tnum" 1',
                        fontVariantNumeric: 'tabular-nums',
                        WebkitFontSmoothing: 'antialiased',
                        MozOsxFontSmoothing: 'grayscale',
                        fontFamily: '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
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
            <div className="h-full px-8 py-4 overflow-y-auto" onClick={() => textareaRef.current?.focus()}>
                <div className="max-w-3xl mx-auto relative min-h-[80vh]">
                    <textarea
                        ref={textareaRef}
                        className="w-full min-h-[80vh] resize-none bg-transparent border-none focus:outline-none font-mono caret-slate-200 relative z-10"
                        style={{
                            fontSize: '16px',
                            lineHeight: '24px',
                            padding: '0',
                            margin: '0',
                            border: 'none',
                            outline: 'none',
                            color: 'transparent',
                            WebkitTextFillColor: 'transparent',
                            ...dynamicStyle
                        }}
                        placeholder=""
                        value={content}
                        onChange={(e) => {
                            onChange(e.target.value);
                            setCursorPos(e.target.selectionStart);
                        }}
                        onSelect={(e) => setCursorPos(e.currentTarget.selectionStart)}
                        onKeyUp={(e) => setCursorPos(e.currentTarget.selectionStart)}
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
