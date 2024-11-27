// import React from 'react';
// import intro from "../../assets/intro.png"
import intro1 from "../../assets/intro1.jpg"


const Introduction = () => {
  
  return (
    <section id="introduction" className="py-16 bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200">
      <div className="container mx-auto px-4 flex flex-wrap items-center">
        <div className="w-full md:w-1/2  pr-10">
          <h2 className="text-4xl font-bold text-purple-700">Welcome to StepTrace!</h2>
          <p className="mt-4 text-lg text-gray-700 text-justify">
          StepTrace is a cutting-edge project that focuses on human identification through gait analysis, utilizing the 
          distinct walking patterns of individuals as a means of recognition. This system incorporates advanced machine learning
           techniques to analyze video data, extract gait features, and provide accurate identification results. Designed with scalability 
           and user-centric functionality, StepTrace is equipped to serve applications in security, attendance management, and surveillance. 
           Its non-intrusive and efficient design ensures seamless integration into real-world environments, offering a reliable solution for
            modern identification challenges.         
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <img
            src={intro1}
            alt="Introduction"
            className="rounded-lg shadow-lg mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Introduction;


