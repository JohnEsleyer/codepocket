import React from 'react';

interface OverlayMenuProps {
  showOverlayMenuPage: boolean;
  displayCurrentOverlayMenuPage: () => React.ReactNode;
}

const OverlayMenu: React.FC<OverlayMenuProps> = ({ showOverlayMenuPage, displayCurrentOverlayMenuPage }) => (
  <>
    <div className={`${!showOverlayMenuPage && "hidden"} z-10 absolute top-0 left-0 w-full h-full bg-neutral-800 opacity-50`}></div>
    <div className={`${!showOverlayMenuPage && "hidden"} z-20 h-full w-full p-4 font-sans absolute flex justify-center items-center opacity-100`}>
      {displayCurrentOverlayMenuPage()}
    </div>
  </>
);

export default OverlayMenu;
