import React from 'react';

interface IconButtonProps {
  icon: string;
  text: string;
  isDark?: boolean;
  noBackground?: boolean;
  onClick?: () => void;
  iconColor?: string;

}

const IconButton: React.FC<IconButtonProps> = ({ 
  icon, 
  text, 
  onClick, 
  isDark, 
  noBackground, 
  iconColor,
}) => {
  return (
    <button className={`${noBackground ? "": "hover:bg-gray-300"} rounded`} onClick={onClick}>
      <div className={`flex flex items-center ${isDark ? 'hover:text-black text-white' : 'text-black'}`}>
        <span className={`text-2xl material-symbols-outlined text-${iconColor}-500`}>{icon}</span>
        <span className="flex items-center">{text}</span>
      </div>
    </button>
  );
};

export default IconButton;
