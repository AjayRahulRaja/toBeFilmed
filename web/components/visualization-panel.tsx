"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Image as ImageIcon, Video, Wand2 } from "lucide-react";

export function VisualizationPanel() {
    const [loading, setLoading] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);

    const generateVisuals = async () => {
        setLoading(true);
        try {
            // Mock getting the current scene text
            const sceneText = "A dark and stormy night. A detective stands under a streetlamp.";

            // 1. Generate Image
            const imgRes = await fetch("http://localhost:8000/api/generate-storyboard", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ scene_text: sceneText }),
            });
            const imgData = await imgRes.json();
            setGeneratedImage(imgData.image_url);

            // 2. Generate Video
            const vidRes = await fetch("http://localhost:8000/api/generate-video", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ scene_text: sceneText }),
            });
            const vidData = await vidRes.json();
            setGeneratedVideo(vidData.video_url);

        } catch (error) {
            console.error("Generation failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col p-4 space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-slate-200">Scene Visualization</h2>
                <Button
                    size="sm"
                    variant="secondary"
                    onClick={generateVisuals}
                    disabled={loading}
                    className="bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 border border-indigo-500/30"
                >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4 mr-2" />}
                    Generate
                </Button>
            </div>

            <Tabs defaultValue="storyboard" className="w-full">
                <TabsList className="w-full bg-slate-800/50">
                    <TabsTrigger value="storyboard" className="flex-1">Storyboard</TabsTrigger>
                    <TabsTrigger value="video" className="flex-1">Animatic</TabsTrigger>
                </TabsList>

                <TabsContent value="storyboard" className="mt-4">
                    <Card className="bg-slate-900 border-slate-800 overflow-hidden aspect-video relative flex items-center justify-center">
                        {generatedImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={generatedImage} alt="Storyboard" className="w-full h-full object-cover" />
                        ) : (
                            <div className="text-slate-600 flex flex-col items-center">
                                <ImageIcon className="h-12 w-12 mb-2 opacity-20" />
                                <span className="text-sm">No storyboard generated</span>
                            </div>
                        )}
                    </Card>
                    <p className="text-xs text-slate-500 mt-2 italic">
                        Style: B&W Sketch. Based on current scene context.
                    </p>
                </TabsContent>

                <TabsContent value="video" className="mt-4">
                    <Card className="bg-slate-900 border-slate-800 overflow-hidden aspect-video relative flex items-center justify-center">
                        {generatedVideo ? (
                            <video controls className="w-full h-full object-cover">
                                <source src={generatedVideo} type="video/mp4" />
                            </video>
                        ) : (
                            <div className="text-slate-600 flex flex-col items-center">
                                <Video className="h-12 w-12 mb-2 opacity-20" />
                                <span className="text-sm">No animatic generated</span>
                            </div>
                        )}
                    </Card>
                    <p className="text-xs text-slate-500 mt-2 italic">
                        Style: Stickman Animation. Represents blocking and movement.
                    </p>
                </TabsContent>
            </Tabs>
        </div>
    );
}
