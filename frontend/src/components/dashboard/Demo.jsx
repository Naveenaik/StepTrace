import { useState } from "react";
import Section from "../Section";
import Button from "../Button";
import VideoStream from "../VideoStream";

const Demo = () => {
  const [analysisResult, setAnalysisResult] = useState("");
  const [personName, setPersonName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [finalResult, setFinalResult] = useState([]);

  const videoStreamURL = "http://192.168.64.6:8080/video";

  const handleExtract = async () => {
    if (!personName) {
      alert("Please enter a person's name before training.");
      return;
    }
    setIsProcessing(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          person_name: personName,
          video_stream_url: videoStreamURL,
        }),
      });
      const data = await response.json();
      alert(data.message || data.error);
    } catch (error) {
      console.error("Training Error:", error);
      alert("An error occurred during training. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTest = () => {
    const videoStreamURL = "http://192.168.64.6:8080/video"; // Ensure this is the correct stream URL
    const eventSource = new EventSource(
      `http://127.0.0.1:5000/predict?video_stream_url=${encodeURIComponent(
        videoStreamURL
      )}`
    );

    setAnalysisResult("Waiting for predictions..."); // Clear previous results
    setIsProcessing(true);

    eventSource.onmessage = (event) => {
      setAnalysisResult(event.data);
      setFinalResult((prevItems) => [...prevItems, event.data]);
    };

    eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
      alert("An error occurred during testing.");
      setIsProcessing(false);
      eventSource.close();
    };

    // Stop the stream after 30 seconds (or adjust as needed)
    setTimeout(() => {
      setIsProcessing(false);
      eventSource.close();
    }, 30000); // Stream time limit in milliseconds
  };

  const handleTestStop = () => {
    // Find the most common prediction
    if (finalResult.length > 0) {
      const frequency = {};
      finalResult.forEach((item) => {
        frequency[item] = (frequency[item] || 0) + 1;
      });

      const mostCommonPrediction = Object.keys(frequency).reduce((a, b) =>
        frequency[a] > frequency[b] ? a : b
      );

      setAnalysisResult(mostCommonPrediction); // Set the most common prediction as result
    } else {
      setAnalysisResult("No predictions were made.");
    }

    setIsProcessing(false); // Reset processing state
    setFinalResult([]); // Clear the final results
  };

  const handleTrain = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/train", {
        method: "POST",
      });
      const data = await response.json();
      alert(data.message || data.error);
    } catch (error) {
      console.error("Training Error:", error);
      alert("An error occurred during training. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="grid grid-cols-2 gap-20 px-10 py-6 h-[110vh]">
        <div className="space-y-6">
          <h1 className="text-xl font-bold">Extracting</h1>
          <VideoStream streamURL={videoStreamURL} />
          <div className="px-10 py-6">
            <label className="block text-lg font-medium text-gray-700">
              Enter Person Name:
            </label>
            <input
              type="text"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              className=" w-full p-2 border border-gray-300 "
              disabled={isProcessing}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              label={"Start Extracting"}
              variant="success"
              onClick={handleExtract}
              disabled={isProcessing}
            />
            <Button label={"Stop"} variant="danger" disabled />
            <Button label={"Train"} variant="primary" onClick={handleTrain} />
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-xl font-bold">Testing</h1>
          <VideoStream streamURL={videoStreamURL} />
          <div className="flex justify-end space-x-4">
            <Button
              label={"Start Testing"}
              variant="success"
              onClick={handleTest}
              disabled={isProcessing}
            />
            <Button label={"Stop"} variant="danger" onClick={handleTestStop} />
          </div>
        </div>
      </div>
      <div className="px-10 py-6">
        <Section
          id="analysis"
          title="Analysis Output"
          description={analysisResult || "Waiting for predictions..."}
          height="h-40"
        />
      </div>
    </div>
  );
};

export default Demo;