// import React from 'react';
import motivation from "../../assets/moti2.jpg"
const Motivation = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4 flex flex-wrap items-center">
        <div className="w-full md:w-1/2">
          <img
            src={motivation}
            alt="Motivation"
            className="rounded-lg shadow-lg mx-auto"
          />
        </div>

        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-4xl font-bold text-pink-600">Our Motivation</h2>
          <p className="mt-4 text-lg text-gray-700 text-justify">
          The motivation for StepTrace lies in the growing need for non-intrusive and efficient identification 
          systems for surveillance and biometric applications. By utilizing gait analysis, the project leverages
           an individual's unique walking patterns to provide a reliable and secure method of identification, addressing
            challenges faced by traditional systems and enhancing accuracy in real-world scenarios.             
          </p>
        </div>
      </div>
    </section>
  );
};

export default Motivation;
