// import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Gait Recognition System</h1>
        <ul className="flex space-x-4">
          <li>
            <a href="#training" className="text-white hover:underline">
              Training
            </a>
          </li>
          <li>
            <a href="#testing" className="text-white hover:underline">
              Testing
            </a>
          </li>
          <li>
            <a href="#analysis" className="text-white hover:underline">
              Analysis
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
