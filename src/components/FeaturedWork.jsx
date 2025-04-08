import React, { useState, useEffect, useRef } from 'react';

const FeaturedWork = () => {
  const videos = [
    { id: 1, src: "/featureWork.mp4", title: "Project Alpha with some new feature" },
    { id: 2, src: "/featureWork.mp4", title: "Project Beta with technology" },
    { id: 3, src: "/featureWork.mp4", title: "Project Gamma with renovation" },
    { id: 4, src: "/featureWork.mp4", title: "Project Gamma with base" },
    { id: 5, src: "/featureWork.mp4", title: "Project Gamma with rental" },
    { id: 6, src: "/featureWork.mp4", title: "Project Delta increase in size" }
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const goToNextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    setProgress(0);
  };

  const handleProgressBarClick = (index) => {
    setCurrentVideoIndex(index);
    setProgress(0);
  };

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.currentTime = 0;
      video.play().catch(err => console.error("Video play error:", err));

      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

      progressIntervalRef.current = setInterval(() => {
        if (video.duration) {
          const progressValue = (video.currentTime / video.duration) * 100;
          setProgress(progressValue);
          if (progressValue >= 99.5) {
            goToNextVideo();
          }
        }
      }, 100);

      return () => clearInterval(progressIntervalRef.current);
    }
  }, [currentVideoIndex]);

  return (
    <div className="relative py-10 sm:py-16 bg-black text-white">
      <div className="container mx-auto px-3 sm:px-5 lg:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:py-20 py-12 gap-4">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Featured Work
          </h2>
          <button className="px-6 sm:px-10 py-2 border border-white rounded-full hover:bg-white hover:text-black transition-colors">
            View All Work
          </button>
        </div>

        {/* Video Section */}
        <div className="w-full mx-auto bg-gray-900 rounded-md overflow-hidden">
          <div className="relative aspect-[16/8] sm:aspect-video">
            <video
              ref={videoRef}
              src={videos[currentVideoIndex].src}
              className="w-full h-full object-cover"
              muted
              playsInline
            />

            {/* Video Title */}
            <div className="absolute bottom-24 sm:bottom-20 left-4 right-4 text-gray-400">
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg">
                {videos[currentVideoIndex].title}
              </h3>
            </div>

            {/* Progress Bars (Overlayed) */}
            <div className="absolute bottom-4 w-full flex flex-col gap-2 px-4 items-center">
              <div className="flex gap-1 w-full">
                {videos.map((video, index) => (
                  <div
                    key={video.id}
                    className="h-2 sm:h-3 bg-gray-700 flex-1 rounded-full overflow-hidden cursor-pointer"
                    onClick={() => handleProgressBarClick(index)}
                  >
                    <div
                      className={`h-full transition-[width] ease-linear duration-[2000ms] ${index === currentVideoIndex ? 'bg-white' : 'bg-gray-500'
                        }`}
                      style={{
                        width:
                          index === currentVideoIndex
                            ? `${progress}%`
                            : index < currentVideoIndex
                              ? '100%'
                              : '0%'
                      }}
                    />


                  </div>
                ))}
              </div>

              {/* Numbers below each bar */}
              <div className="flex gap-1 w-full justify-between text-sm sm:text-lg md:text-xl font-semibold text-gray-300 pt-1">
                {videos.map((video, index) => (
                  <div key={video.id} className="flex-1 text-center sm:text-start">
                    0{index + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedWork;
