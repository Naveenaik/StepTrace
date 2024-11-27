import { useState } from "react";
import Navbar from "../components/Navbar";
import Section from "../components/Section";
import Button from "../components/Button";
import VideoStream from "../components/VideoStream";

const Dashboard = () => {
  const [analysisResult, setAnalysisResult] = useState("");
  const [personName, setPersonName] = useState("");

  const handleTrain = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/train", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ person_name: personName }),
      });
      const data = await response.json();
      alert(data.message || data.error);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleTest = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ video_stream_url: "http://192.168.64.6:8080/video" }),
      });
      const data = await response.json();
      setAnalysisResult(data.predicted_person);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="px-10 py-6">
        <label className="block text-lg font-medium text-gray-700">
          Enter Person's Name:
        </label>
        <input
          type="text"
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="grid grid-cols-2 gap-10 px-10 py-6 h-[70vh]">
        <div className="space-y-6">
          <h1>Training</h1>
          <VideoStream streamURL={"http://192.168.64.6:8080/video"} />
          <div className="flex justify-end space-x-4">
            <Button label={"Start Training"} variant="success" onClick={handleTrain} />
            <Button label={"Stop"} variant="danger" />
          </div>
        </div>
        <div className="space-y-6">
          <h1>Testing</h1>
          <VideoStream streamURL={"http://192.168.64.6:8080/video"} />
          <div className="flex justify-end space-x-4">
            <Button label={"Start Testing"} variant="success" onClick={handleTest} />
            <Button label={"Stop"} variant="danger" />
          </div>
        </div>
      </div>

      <div className="px-10 py-6">
        <Section
          id="analysis"
          title="Analysis Output"
          description={analysisResult || "No analysis performed yet"}
          height="h-40"
        />
      </div>
    </div>
  );
};

export default Dashboard;

