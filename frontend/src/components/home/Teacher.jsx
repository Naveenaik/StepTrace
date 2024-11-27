import React from 'react'
import lokesh from "../../assets/lokesh.jpg"
import sharanya from "../../assets/sharanya.jpg"
const Teacher = () => {
  const teachers = [
    {
      id: 1,
      name: "Prof. Sharanya P S",
      designation: "Assistant Professor",
      description : "AJIET Mangalore",
      image: sharanya,
    },
    {
      id: 2,
      name: "Dr. Lokesh M R",
      designation: "Professor",    
      description : "AJIET Mangalore",  
      image: lokesh,
    },
   
  ];


  return (
    <section
    id="teacher-cards"
    className="pt-5 pb-16 bg-gradient-to-br from-orange-200 via-red-200 to-pink-200"
  >
    <h2 className="text-4xl pb-10 font-bold text-center text-orange-600">
      Meet Our Guides
    </h2>
    <div className="container mx-auto px-6 flex justify-center gap-x-20">
      {teachers.map((teacher) => (
        <div
          key={teacher.id}
          className="bg-white shadow-lg w-80 rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-lg hover:shadow-pink-500"
        >
          <img
            src={teacher.image}
            alt={teacher.name}
            className="h-56 w-full object-cover rounded-3xl mb-4" // Rectangular Image
          />
          <h3 className="text-lg font-bold text-center text-gray-800">
            {teacher.name}
          </h3>
          <h4 className="text-lg font-medium text-center text-gray-700">
            {teacher.designation}
          </h4>
          <p className="text-center text-gray-600 mt-2">
            {teacher.description}
          </p>
        </div>
      ))}
    </div>
  </section>
  
  );
};

export default Teacher;
