import React, { ChangeEvent, Dispatch, RefObject, SetStateAction, useEffect, useState } from 'react';
import SnippetCard from '../_components/SnippetCard';
import { Snippet } from '../types';
import { useAppContext } from '@/app/_context/AppContext';

interface SnippetsProps{
  scrollableDiv: RefObject<HTMLDivElement>;
}

const Snippets: React.FC<SnippetsProps> = ({
  scrollableDiv,
}) => {
  const {activeCollection, disableSnippets, snippets, singleColumn, currentSnippetsLength, setCurrentSnippetsLength} = useAppContext();
 
  
  useEffect(() => {
    setCurrentSnippetsLength((snippets.filter((value) => (value.collection_id == activeCollection?.id)).length))
  }, [activeCollection, snippets]);

  return (
  !activeCollection || disableSnippets ? 
    <div className="bg-slate-300 flex-1 flex justify-center items-center text-gray-800">
      <span>Select or create a collection to start adding new code snippets</span>
    </div>
    :
    <div className='bg-slate-300 h-full w-full overflow-y-auto '>
       <div className='pl-2'>
        {currentSnippetsLength} / 20
      </div>
    <div className={`swapy-container flex-1 bg-slate-300 grid ${singleColumn ? 'grid-cols-1' : 'grid-cols-2'} p-2 gap-2 justify-center overflow-y-auto `}>
     
      {snippets.map((value, index) => {
        if (value.collection_id !== activeCollection.id) return null;
        return (
          <SnippetCard
            key={index}
            index={index}
            value={value}
        
          />
        );
      })}
    </div>
    </div>
);
}
export default Snippets;
