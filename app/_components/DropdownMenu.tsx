import { ChevronDown } from 'lucide-react';
import React, { ReactNode, useState } from 'react';

interface DropdownMenuProps {
  buttonText: string;
  children: ReactNode;
  disabled?: boolean;
}


const MyDropdownMenu: React.FC<DropdownMenuProps> = ({ 
  buttonText, 
  children,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={disabled ? `dropdown text-gray-500`:`dropdown`} style={{ position: 'relative', display: 'inline-block' }}>
      <button className={disabled ? 'dropdown-toggle flex items-center p-2' : `flex items-center p-2 hover:bg-slate-300 rounded hover:text-black`} onClick={toggleDropdown} disabled={disabled}>
      <ChevronDown /> 
        {buttonText}
      </button>
      {isOpen && (
        <div
          className="dropdown-menu"
          style={{
            position: 'absolute',
            top: '100%',
            left: 1,
          
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            zIndex: 5,
          }}
        >
          <button onClick={() => {
            setIsOpen(false);
          }}>
          {children}
          </button>
        
        </div>
      )}
    </div>
  );
};

export default MyDropdownMenu;
