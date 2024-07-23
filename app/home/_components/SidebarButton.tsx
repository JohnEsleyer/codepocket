import React from 'react';
import Image from 'next/image';
import Loading from '/public/loading.svg';

interface SidebarButtonProps {
  icon: string;
  text: string;
  onClick?: () => void;
  loading?: boolean;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ icon, text, onClick, loading }) => {
  return (
    <button className="p-1 hover:bg-slate-300" onClick={onClick}>
      <p className="flex items-center pl-2">
        <span className="material-symbols-outlined">{icon}</span>
        {text}
        {loading && (
          <span className="pl-2">
            <Image src={Loading} alt={''} width={30} height={30} />
          </span>
        )}
      </p>
    </button>
  );
};

export default SidebarButton;
