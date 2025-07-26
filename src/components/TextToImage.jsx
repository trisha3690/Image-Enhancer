import { useState } from "react";
import { generateImageFromPrompt } from "../utils/dreamStudioAPI";

const TextToImage = () => {
    const [prompt, setPrompt] = useState("");
    const [generatedImage, setGeneratedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const downloadImage = (imageUrl, filename) => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleGenerateImage = async () => {
        if (!prompt.trim()) {
            setError("Please enter a prompt");
            return;
        }

        setLoading(true);
        setError("");
        setGeneratedImage(null);

        try {
            const result = await generateImageFromPrompt(prompt);
            setGeneratedImage(result);
        } catch (error) {
            console.error("Generation error:", error);
            
            // Show more specific error messages
            if (error.message.includes("401")) {
                setError("Invalid API key. Please check your Dream Studio API key.");
            } else if (error.message.includes("429")) {
                setError("Rate limit exceeded. Please try again later.");
            } else if (error.message.includes("400")) {
                setError("Invalid request. Please check your prompt.");
            } else if (error.message.includes("500")) {
                setError("Server error. Please try again later.");
            } else {
                setError(`Error generating image: ${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modern-card p-8">
            <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center pulse-glow">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold gradient-text mb-2">Generate Image with AI</h2>
                <p className="text-white/70 text-lg">Transform your ideas into stunning visuals</p>
            </div>
            
            <div className="space-y-6">
                <div>
                    <label htmlFor="prompt" className="block text-lg font-semibold text-white mb-3">
                        Describe your vision
                    </label>
                    <div className="relative">
                        <textarea
                            id="prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g., A majestic lighthouse on a cliff overlooking the ocean at golden hour, cinematic lighting, 4K quality"
                            className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none backdrop-blur-sm transition-all duration-300"
                            rows="4"
                        />
                        <div className="absolute top-4 right-4">
                            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-400/30 text-red-200 p-4 rounded-2xl backdrop-blur-sm">
                        <div className="flex items-center space-x-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">{error}</span>
                        </div>
                    </div>
                )}

                <button
                    onClick={handleGenerateImage}
                    disabled={loading || !prompt.trim()}
                    className="w-full btn-3d text-white py-4 px-8 rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 glow-hover"
                >
                    <div className="flex items-center justify-center space-x-2">
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Creating Magic...</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                </svg>
                                <span>Generate Image</span>
                            </>
                        )}
                    </div>
                </button>

                {loading && (
                    <div className="text-center py-6">
                        <div className="flex justify-center items-center space-x-2 mb-4">
                            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-red-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <p className="text-white/80 text-lg font-medium">Crafting your masterpiece...</p>
                    </div>
                )}

                {generatedImage && (
                    <div className="mt-8">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold gradient-text mb-2">Your Generated Image</h3>
                            <p className="text-white/60">AI has brought your vision to life</p>
                        </div>
                        <div className="modern-card overflow-hidden">
                            <div className="image-container">
                                <img
                                    src={generatedImage.image}
                                    alt={generatedImage.prompt}
                                    className="w-full h-auto hover:scale-105 transition-transform duration-300"
                                />
                                <div className="download-overlay">
                                    <button
                                        onClick={() => downloadImage(generatedImage.image, 'generated-image.jpg')}
                                        className="btn-download text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span>Download</span>
                                    </button>
                                </div>
                                <div className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-blue-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    ✨ Generated
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="bg-white/10 rounded-2xl p-4">
                                    <p className="text-white/90 text-sm leading-relaxed">
                                        <span className="font-semibold text-purple-300">Prompt:</span> {generatedImage.prompt}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TextToImage; 