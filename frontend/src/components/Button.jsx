import React from 'react';

const Button = ({ label, onClick, variant = 'primary' }) => {
  const baseStyles = 'rounded-lg font-medium focus:outline-none focus:ring-2';
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-400',
    success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} } md:text-base text-xs px-5 py-1 md:px-10 md:py-2 shadow-md `}
    >
      {label}
    </button>
  );
};

export default Button;
