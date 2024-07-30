'use client'
import React, { ReactNode, useState } from 'react';

interface IconButtonProps {
  icon: ReactNode;
  text: string;
  noBackground?: boolean;
  onClick: () => void;
  disabled?: boolean;
  elementAfterClick?: ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({ 
  icon, 
  text, 
  onClick, 
  noBackground, 
  disabled,
  elementAfterClick,
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
    <button disabled={disabled} className={`${noBackground ? "": "hover:bg-slate-300 hover:text-black "} rounded p-2 ${disabled ? 'text-gray-500' : ''}`} onClick={() => {
      
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
      <div className={`flex flex items-center`}>
        {icon}
        <span className={`flex items-center pl-2`}>{text}</span>
      </div>
    </button>
  );
};

export default IconButton;
