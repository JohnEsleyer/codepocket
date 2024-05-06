import React from 'react';

interface IconButtonProps {
  icon: string;
  text: string;
  isDark?: boolean;
  noBackground?: boolean;
  onClick?: () => void;
  iconColor?: string;
  disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({ 
  icon, 
  text, 
  onClick, 
  isDark, 
  noBackground, 
  iconColor,
  disabled,
}) => {
  
  if (disabled){
    noBackground = true;
  }

  return (
    <button disabled={disabled} className={`${noBackground ? "": "hover:bg-gray-300"} rounded`} onClick={onClick}>
      <div className={`flex flex items-center ${isDark && !disabled ? 'hover:text-black text-white' : disabled && 'text-gray-500'}`}>
        <span className={`text-2xl material-symbols-outlined text-${iconColor}-500`}>{icon}</span>
        <span className="flex items-center">{text}</span>
      </div>
    </button>
  );
};

export default IconButton;
