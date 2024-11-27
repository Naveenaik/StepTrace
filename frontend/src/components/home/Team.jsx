import React from 'react';
import himmath from "../../assets/himmath.jpg"
import ganesh from "../../assets/ganesh.jpg"
import gaurav from "../../assets/gaurav.jpg"
import naveena from "../../assets/NAVEENA.jpg"

const teamMembers = [
  {
    id: 1,
    name: "HIMMATH KUMAR",
    image: himmath,
    usn: "4JK21IS019",
    description: "Passionate about coding and emerging technologies, currently enrolled at AJIET.",
  },
  {
    id: 2,
    name: "NAVEENA",
    image: naveena,
    usn: "4JK21IS030",
    description: "A skilled software developer with a passion for innovation,currently enrolled at AJIET.",
  },
  {
    id: 3,
    name: "GAURAV B S",
    image: gaurav,
    usn: "4JK21IS017",
    description: "Chasing dreams of innovation and tech mastery, one line of code at a time at AJIET",
  },
  {
    id: 4,
    name: "GANESAN",
    image: ganesh,
    usn: "4JK21IS016",
    description: "A creative coder in the making, exploring the tech world while studying at AJIET",
  },
];

export default function TeamSection() {
  return (
    <section
      id="team"
      className="py-16 bg-gradient-to-r from-green-200 via-blue-200 to-purple-200"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-blue-600">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl hover:shadow-purple-400"
            >
              <img
                src={member.image}
                alt={member.name}
                className="h-36 w-36 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-bold text-center text-gray-800">
                {member.name}
              </h3>
              <h3 className="text-lg font-bold text-center text-gray-800">
                {member.usn}
              </h3>
              <p className="text-center text-gray-600">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}