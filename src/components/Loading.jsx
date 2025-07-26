import React from "react";

const Loading = () => {
    return (
        <div className="flex flex-col justify-center items-center h-full">
            <div className="relative">
                {/* Outer ring */}
                <div className="w-16 h-16 border-4 border-white/20 rounded-full animate-spin"></div>
                
                {/* Middle ring */}
                <div className="absolute top-2 left-2 w-12 h-12 border-4 border-purple-400/60 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
                
                {/* Inner ring */}
                <div className="absolute top-4 left-4 w-8 h-8 border-4 border-pink-400/80 rounded-full animate-spin" style={{animationDuration: '1s'}}></div>
                
                {/* Center dot */}
                <div className="absolute top-6 left-6 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full pulse-glow"></div>
            </div>
            
            {/* Loading text */}
            <div className="mt-4 text-center">
                <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-red-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
            </div>
        </div>
    );
};

export default Loading;