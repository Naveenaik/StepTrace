// import React from "react";

const VideoStream = ({ streamURL }) => {
  return (
    <div className="relative w-full h-full max-w-[400px] max-h-[400px] bg-gray-200 overflow-hidden">
      <img
        src={streamURL}
        alt="Mobile Camera Stream"
        className="absolute top-0 left-0 w-full h-full object-contain transform rotate-90 scale-y-[-1]"
      />
    </div>
  );
};

export default VideoStream;
