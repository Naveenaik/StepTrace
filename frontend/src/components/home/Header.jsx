// import React from 'react'
import logo from "../../assets/logo.png"
const Header = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Home Icon" className="h-16 w-16 mr-4 mix-blend-multiply" />
          <h1 className="text-2xl font-bold text-purple-600">StepTrace</h1>
        </div>
        <ul className="flex items-center space-x-6">
          <li><a href="#introduction" className="text-lg text-gray-800 hover:text-purple-500">Introduction</a></li>
          <li><a href="#about" className="text-lg text-gray-800 hover:text-purple-500">About</a></li>
          <li><a href="#team" className="text-lg text-gray-800 hover:text-purple-500">Team</a></li>
          <li><a href="#terms-contact" className="text-lg text-gray-800 hover:text-purple-500">Terms & Contact</a></li>
          <li>
            <a className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-600" href='/dashboard'>
              Try Model
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;