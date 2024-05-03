import React from 'react';

interface IconButtonProps {
  icon: string;
  text: string;
  isDark?: boolean;
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, text, onClick, isDark}) => {
  return (
    <button className="hover:bg-gray-300 rounded" onClick={onClick}>
      <div className={`flex flex items-center ${isDark ? 'hover:text-black' : ''}`}>
        <span className="text-2xl material-symbols-outlined">{icon}</span>
        <span className="flex items-center">{text}</span>
      </div>
    </button>
  );
};

export default IconButton;
