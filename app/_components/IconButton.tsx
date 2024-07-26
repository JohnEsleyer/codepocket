import React, { ReactNode, useState } from 'react';

interface IconButtonProps {
  icon: string;
  text: string;
  isDark?: boolean;
  noBackground?: boolean;
  onClick: () => void;
  iconColor?: string;
  textColor? :string;
  disabled?: boolean;
  disableHover?: boolean;
  elementAfterClick?: ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({ 
  icon, 
  text, 
  onClick, 
  isDark, 
  noBackground, 
  iconColor,
  disabled,
  elementAfterClick,
  textColor,
  disableHover,
}) => {

  const [changeElement, setChangeElement] = useState(false);
  
  if (disabled){
    noBackground = true;
  }

  if (changeElement){
    return (<div>
      {elementAfterClick}
    </div>)
  }

  return (
    <button disabled={disabled} className={`${noBackground ? "": "hover:bg-slate-300"} rounded`} onClick={() => {
      
      if (elementAfterClick){
        setChangeElement(true);
        onClick!();
        
        setTimeout(() => {
          setChangeElement(false);
        }, 2000);
      }else{
        onClick!();
      }
    
    }}>
      <div className={`flex flex items-center ${isDark && !disabled ? disableHover ? 'text-white' :'hover:text-black text-white' : disabled ? 'text-gray-500': 'text-black'}`}>
        <span className={`text-2xl material-symbols-outlined text-${iconColor}-500`}>{icon}</span>
        <span className={`flex items-center text-${textColor}-500`}>{text}</span>
      </div>
    </button>
  );
};

export default IconButton;
