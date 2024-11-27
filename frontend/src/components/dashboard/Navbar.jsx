// import React from 'react'
import logo from "../../assets/logo.png"
const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Home Icon" className="h-16 w-16 mr-4 mix-blend-multiply" />
          <h1 className="text-2xl font-bold text-purple-600">StepTrace</h1>
        </div>
        <ul className="flex items-center space-x-6">
          
          <li>
            <a className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-600" href='/'>
              Back to Home
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;