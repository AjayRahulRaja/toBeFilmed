"use client";

interface ScreenplayPreviewProps {
    content: string;
}

export function ScreenplayPreview({ content }: ScreenplayPreviewProps) {
    return (
        <div className="whitespace-pre-wrap text-base leading-relaxed font-mono">
            {content.split('\n').map((line, idx) => {
                // Character names (prefixed with @)
                if (line.startsWith('@')) {
                    return <div key={idx} className="text-center font-bold text-slate-100">{line.substring(1)}</div>;
                }
                // Dialogue (prefixed with $) - indented
                if (line.startsWith('$')) {
                    return <div key={idx} className="ml-24 max-w-md text-slate-200">{line.substring(1)}</div>;
                }
                // Parenthetical - detect by ( ) and indent
                if (line.trim().startsWith('(') && line.trim().endsWith(')')) {
                    return <div key={idx} className="ml-20 text-slate-300">{line}</div>;
                }
                // Transitions (prefixed with >)
                if (line.startsWith('>')) {
                    return <div key={idx} className="text-right font-bold text-slate-100">{line.substring(1)}</div>;
                }
                // Shot/Camera direction (prefixed with #)
                if (line.startsWith('#')) {
                    return <div key={idx} className="ml-8 font-bold text-slate-200">{line.substring(1)}</div>;
                }
                // Music cue (prefixed with ~)
                if (line.startsWith('~')) {
                    return <div key={idx} className="text-center italic text-slate-200">{line.substring(1)}</div>;
                }
                // Montage/Intercut (prefixed with %)
                if (line.startsWith('%')) {
                    return <div key={idx} className="text-center font-bold uppercase text-slate-100">{line.substring(1)}</div>;
                }
                // Flashback (prefixed with &)
                if (line.startsWith('&')) {
                    return <div key={idx} className="font-bold italic text-slate-200">{line.substring(1)}</div>;
                }
                // Notes/Comments (wrapped in [[ ]])
                if (line.startsWith('[[') && line.endsWith(']]')) {
                    return <div key={idx} className="text-amber-400 italic text-sm">{line}</div>;
                }
                // Page Break (===)
                if (line.startsWith('===')) {
                    return <div key={idx} className="border-t-2 border-slate-600 my-4 text-center text-xs text-slate-500">{line.replace(/=/g, '')}</div>;
                }
                // Scene headings (ALL CAPS lines)
                if (line === line.toUpperCase() && line.trim().length > 0 && !line.startsWith('(')) {
                    return <div key={idx} className="font-bold text-slate-100">{line}</div>;
                }
                // Regular lines
                return <div key={idx} className="text-slate-300">{line || '\u00A0'}</div>;
            })}
        </div>
    );
}
