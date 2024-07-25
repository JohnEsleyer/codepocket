import React, { ReactNode, useState } from 'react';

interface DropdownMenuProps {
  buttonText: string;
  children: ReactNode;
  disabled?: boolean;
}


const DropdownMenu: React.FC<DropdownMenuProps> = ({ 
  buttonText, 
  children,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={disabled ? `dropdown text-gray-500`:`dropdown`} style={{ position: 'relative', display: 'inline-block' }}>
      <button className="dropdown-toggle flex items-center" onClick={toggleDropdown} disabled={disabled}>
      <span className="text-2xl material-symbols-outlined">expand_more</span>
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

export default DropdownMenu;
