import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-12 py-4 bg-cyan-400 text-gray-900 font-bold text-xl 
        border-2 border-cyan-400 rounded-full
        hover:bg-transparent hover:text-cyan-400
        transition-all duration-300 ease-in-out
        shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-400/50
        transform hover:scale-105
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
