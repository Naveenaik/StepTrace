import { useEffect, useRef } from 'react';

const cameraSection = ({ id, title, description, showVideoStream = false, height = 'aspect-video' }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (showVideoStream) {
      const videoElement = videoRef.current;
      videoElement.src = "http://192.168.43.1:8080/video"; // Mobile webcam URL
      videoElement.play();
    }
  }, [showVideoStream]);

  const sendFrameToBackend = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

    // Draw the video frame onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas image to a Blob (e.g., JPEG or PNG format)
    canvas.toBlob(async (blob) => {
      if (blob) {
        const formData = new FormData();
        formData.append('frame', blob, 'frame.jpg');

        // Send the frame to the backend
        await fetch('http://your-backend-url/api/process-frame', {
          method: 'POST',
          body: formData,
        });
      }
    }, 'image/jpeg', 0.9); // 90% image quality
  };

  useEffect(() => {
    if (showVideoStream) {
      const interval = setInterval(sendFrameToBackend, 200); // Adjust the interval as needed
      return () => clearInterval(interval); // Cleanup on component unmount
    }
  }, [showVideoStream]);

  return (
    <section id={id} className="bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-xl font-bold text-gray-700 mb-4">{title}</h2>

      {/* Video or Placeholder Section */}
      <div className={`w-full ${height} bg-gray-300 flex items-center justify-center rounded-lg`}>
        {showVideoStream ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* Video Stream */}
            <video
              ref={videoRef}
              className="border-2 border-gray-300 rounded-lg"
              width="640"
              height="480"
              autoPlay
              muted
            ></video>

            {/* Hidden Canvas to Capture Frames */}
            <canvas
              ref={canvasRef}
              className="hidden"
              width="640"
              height="480"
            ></canvas>
          </div>
        ) : (
          <p className="text-gray-500">{description}</p>
        )}
      </div>
    </section>
  );
};

export default cameraSection;
