// import React from 'react'
import Navbar from "../components/Navbar";
import Section from "../components/Section";
import Button from "../components/Button";
const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="grid grid-cols-2 gap-10 m-10">
        <div>
          <Section
            id="training"
            title="Training Model"
            description="Training Video Stream"
          />
          <div className="mt-5 flex justify-end space-x-4">
            <Button label={"Start"} variant="success" />
            <Button label={"Stop"} variant="danger" />
          </div>
        </div>

        <div>
          <Section
            id="testing"
            title="Testing Model"
            description="Testing Video Stream"
          />
          <div className="mt-5 flex justify-end space-x-4">
            <Button label={"Start"} variant="success" />
            <Button label={"Stop"} variant="danger" />
          </div>
        </div>
      </div>

      <div className="m-10">
        <Section
          id="analysis"
          title="Analysis Output"
          description="Analysis Results"
          height="h-40"
        />
      </div>
    </div>
  );
};

export default Dashboard;
