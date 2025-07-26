import Loading from "./Loading";

const ImagePreview = (props) => {
    const downloadImage = (imageUrl, filename) => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Original Image */}
            <div className="modern-card overflow-hidden">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4">
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full pulse-glow"></div>
                        <h2 className="text-xl font-bold text-white">
                            Original Image
                        </h2>
                        <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full pulse-glow"></div>
                    </div>
                </div>

                <div className="p-6">
                    {props.uploaded ? (
                        <div className="image-container">
                            <img
                                src={props.uploaded}
                                alt="Original"
                                className="w-full h-80 object-cover rounded-2xl hover:scale-105 transition-transform duration-300"
                            />
                            <div className="download-overlay">
                                <button
                                    onClick={() => downloadImage(props.uploaded, 'original-image.jpg')}
                                    className="btn-download text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>Download</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-80 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border-2 border-dashed border-white/20">
                            <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-white/50" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <p className="text-white/60 text-lg font-medium">No Image Selected</p>
                            <p className="text-white/40 text-sm mt-2">Upload an image to get started</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Enhanced Image */}
            <div className="modern-card overflow-hidden">
                <div className="bg-gradient-to-r from-blue-800 to-purple-800 p-4">
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full pulse-glow"></div>
                        <h2 className="text-xl font-bold text-white">
                            Enhanced Image
                        </h2>
                        <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full pulse-glow"></div>
                    </div>
                </div>

                <div className="p-6">
                    {props.enhanced && !props.loading ? (
                        <div className="image-container">
                            <img
                                src={props.enhanced}
                                alt="Enhanced"
                                className="w-full h-80 object-cover rounded-2xl hover:scale-105 transition-transform duration-300"
                            />
                            <div className="download-overlay">
                                <button
                                    onClick={() => downloadImage(props.enhanced, 'enhanced-image.jpg')}
                                    className="btn-download text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>Download</span>
                                </button>
                            </div>
                            <div className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-blue-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                ✓ Enhanced
                            </div>
                        </div>
                    ) : props.loading ? (
                        <div className="flex flex-col items-center justify-center h-80 bg-gradient-to-br from-blue-800/50 to-purple-800/50 rounded-2xl">
                            <Loading />
                            <p className="text-white/80 text-lg font-medium mt-4">Enhancing your image...</p>
                            <div className="flex space-x-1 mt-2">
                                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full pulse-glow"></div>
                                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full pulse-glow" style={{animationDelay: '0.5s'}}></div>
                                <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-red-400 rounded-full pulse-glow" style={{animationDelay: '1s'}}></div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-80 bg-gradient-to-br from-blue-800/50 to-purple-800/50 rounded-2xl border-2 border-dashed border-white/20">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-white/50" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <p className="text-white/60 text-lg font-medium">No Enhanced Image</p>
                            <p className="text-white/40 text-sm mt-2">Upload an image to see the magic</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImagePreview;