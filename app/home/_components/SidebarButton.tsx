import React, { ReactNode } from 'react';
import Image from 'next/image';
import Loading from '/public/loading.svg';
import { LucideProps } from 'lucide-react';

interface SidebarButtonProps {
  icon: ReactNode;
  text: string;
  onClick?: () => void;
  loading?: boolean;
  disableHover?: boolean;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ icon, text, onClick, loading, disableHover }) => {
  return (
    <button className={`p-1 ${disableHover ? '' : 'hover:bg-slate-300'}`} onClick={onClick}>
      <p className="flex items-center pl-2">
        {icon}
        <div className="pl-2">
        {text}
        </div>
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
