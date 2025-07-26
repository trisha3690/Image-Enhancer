const ImageUpload = (props) => {
    const ShowImageHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            props.UploadImageHandler(file);
        }
    };

    return (
        <div className="modern-card p-8">
            <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center pulse-glow">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold gradient-text mb-2">Upload Your Image</h2>
                <p className="text-white/70 text-lg">Transform your photos with AI-powered enhancement</p>
            </div>

            <label
                htmlFor="fileInput"
                className="block w-full cursor-pointer group"
            >
                <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    onChange={ShowImageHandler}
                    accept="image/*"
                />
                <div className="border-2 border-dashed border-white/30 rounded-2xl p-12 text-center transition-all duration-300 hover:border-purple-400 hover:bg-white/5 group-hover:scale-105">
                    <div className="space-y-4">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-2xl font-semibold text-white mb-2">
                                Drop your image here
                            </p>
                            <p className="text-white/60 text-lg">
                                or click to browse files
                            </p>
                        </div>
                        <div className="flex justify-center items-center space-x-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                            <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-red-400 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </label>

            <div className="mt-6 text-center">
                <p className="text-white/50 text-sm">
                    Supports: JPG, PNG, WEBP (Max 10MB)
                </p>
            </div>
        </div>
    );
};

export default ImageUpload;