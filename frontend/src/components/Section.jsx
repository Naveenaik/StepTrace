// import React from 'react';

const Section = ({ id, title, description, height = 'aspect-video' }) => {
  return (
    <section id={id} className="bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-xl font-bold text-gray-700 mb-4">{title}</h2>
      <div className={`w-full ${height} bg-gray-300 flex items-center justify-center rounded-lg`}>
        <p className="text-gray-500">{description}</p>
      </div>
    </section>
  );
};

export default Section;
