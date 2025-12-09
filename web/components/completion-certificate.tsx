"use strict";
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Download, Printer, Award, Globe, MapPin, Users, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface CertificateData {
    title: string;
    synopsis: string;
    page_count: number;
    location_count: number;
    character_count: number;
    languages: string[];
    potential_markets: string[];
}

interface CompletionCertificateProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: CertificateData | null;
}

export function CompletionCertificate({ open, onOpenChange, data }: CompletionCertificateProps) {
    const certificateRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        // Create a style element for print-specific styles
        const style = document.createElement('style');
        style.innerHTML = `
            @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Pinyon+Script&display=swap');
            @media print {
                body * {
                    visibility: hidden;
                }
                .certificate-container, .certificate-container * {
                    visibility: visible;
                }
                .certificate-container {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    margin: 0;
                    padding: 0;
                    background: white !important;
                    color: black !important;
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
                .no-print {
                    display: none !important;
                }
            }
        `;
        document.head.appendChild(style);
        window.print();
        document.head.removeChild(style);
    };

    if (!data) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 bg-[#fffbf0] text-slate-900 border-none shadow-2xl sm:rounded-xl">
                <DialogTitle className="sr-only">Certificate of Completion</DialogTitle>

                {/* Visual Certificate Container */}
                <div ref={certificateRef} className="certificate-container relative flex flex-col items-center p-8 bg-[#fffbf0] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] min-h-[500px] border-[16px] border-double border-slate-800 mx-auto w-full">

                    {/* Decorative Corner Borders */}
                    <div className="absolute top-4 left-4 w-16 h-16 border-t-[4px] border-l-[4px] border-amber-700/80"></div>
                    <div className="absolute top-4 right-4 w-16 h-16 border-t-[4px] border-r-[4px] border-amber-700/80"></div>
                    <div className="absolute bottom-4 left-4 w-16 h-16 border-b-[4px] border-l-[4px] border-amber-700/80"></div>
                    <div className="absolute bottom-4 right-4 w-16 h-16 border-b-[4px] border-r-[4px] border-amber-700/80"></div>

                    {/* Content Wrapper */}
                    <div className="flex flex-col items-center justify-between h-full w-full max-w-2xl z-10 space-y-4">

                        {/* Header Section */}
                        <div className="text-center space-y-3">
                            <Award className="w-12 h-12 text-amber-700 mx-auto opacity-90" />

                            <div className="space-y-0.5">
                                <h2 className="text-2xl font-serif text-slate-900 uppercase tracking-[0.2em] font-bold" style={{ fontFamily: 'Cinzel, serif' }}>
                                    Certificate of
                                </h2>
                                <h2 className="text-2xl font-serif text-slate-900 uppercase tracking-[0.2em] font-bold" style={{ fontFamily: 'Cinzel, serif' }}>
                                    Completion
                                </h2>
                            </div>

                            <div className="w-1/3 h-px bg-slate-400 mx-auto mt-3"></div>
                        </div>

                        {/* Title Section */}
                        <div className="text-center space-y-3 w-full">
                            <p className="text-base text-slate-600 italic font-serif">
                                This document certifies that the screenplay titled
                            </p>

                            <div className="relative py-1">
                                <h1 className="text-3xl font-bold text-slate-900 font-serif px-6 leading-tight drop-shadow-sm">
                                    {data.title}
                                </h1>
                                {/* Underline decoration */}
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-amber-600 rounded-full opacity-80" />
                            </div>

                            <p className="text-base text-slate-700 font-serif max-w-lg mx-auto leading-relaxed">
                                has been successfully drafted, structured, and registered with the <span className="font-semibold text-slate-900">ToBeFilmed</span> platform.
                            </p>
                        </div>

                        {/* Metrics Grid - Compact */}
                        <div className="w-full max-w-xl bg-white/60 backdrop-blur-sm border border-slate-200 rounded-lg p-4 shadow-sm">
                            <div className="grid grid-cols-4 gap-2 text-center divide-x divide-slate-300">
                                <div className="flex flex-col items-center gap-0.5">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pages</span>
                                    <span className="text-xl font-bold text-indigo-700">{data.page_count}</span>
                                </div>
                                <div className="flex flex-col items-center gap-0.5">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Scenes</span>
                                    <span className="text-xl font-bold text-emerald-700">{data.location_count}</span>
                                </div>
                                <div className="flex flex-col items-center gap-0.5">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Cast</span>
                                    <span className="text-xl font-bold text-blue-700">{data.character_count}</span>
                                </div>
                                <div className="flex flex-col items-center gap-0.5 pl-2">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Potential Markets</span>
                                    <span className="text-base font-bold text-slate-800 line-clamp-1">
                                        {data.potential_markets[0] || "Global"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Footer / Signatures Section */}
                        <div className="w-full grid grid-cols-3 items-end pt-6 pb-2">
                            {/* Writer Signature */}
                            <div className="flex flex-col items-center space-y-1">
                                <div className="w-28 border-b-2 border-slate-800/60 pb-0.5" style={{ fontFamily: 'Pinyon Script, cursive' }}>
                                    <span className="text-xl text-slate-800 pl-2">Writer Signature</span>
                                </div>
                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Authorised Signature</p>
                            </div>

                            {/* Seal */}
                            <div className="flex justify-center -mb-3">
                                <div className="relative w-20 h-20">
                                    <div className="absolute inset-0 border-[3px] border-amber-700 rounded-full opacity-30 animate-pulse"></div>
                                    <div className="w-full h-full border-4 border-double border-slate-800 rounded-full flex items-center justify-center bg-[#fffbf0] shadow-lg">
                                        <div className="text-center">
                                            <Award className="w-5 h-5 text-amber-600 mx-auto mb-0.5" />
                                            <span className="block text-[7px] font-black uppercase tracking-widest text-slate-900">
                                                Official<br />Seal
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Platform Signature */}
                            <div className="flex flex-col items-center space-y-1">
                                <div className="w-28 border-b-2 border-slate-800/60 pb-0.5 text-center">
                                    <span className="text-base font-bold text-slate-900 font-serif">ToBeFilmed</span>
                                </div>
                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Platform Verified</p>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="bg-slate-100 p-3 flex justify-between items-center no-print border-t border-slate-200">
                    <div className="flex items-center gap-2 text-slate-600 italic">
                        <Globe className="w-3 h-3" />
                        <span className="text-xs">Ready to share</span>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => onOpenChange(false)} className="border-slate-300 h-8 text-xs">Close</Button>
                        <Button size="sm" onClick={handlePrint} className="bg-slate-900 hover:bg-slate-800 text-amber-50 gap-2 shadow-md h-8 text-xs">
                            <Printer className="w-3 h-3" /> Print
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
