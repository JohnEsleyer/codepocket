'use client'
import React, { Dispatch, SetStateAction } from 'react';
import { Collection } from '../types';
import { Folder, Trash2 } from 'lucide-react';
import { useAppContext } from '@/app/_context/AppContext';
import { handleDeleteCollection } from '../_utility/deleteData';

const Collections: React.FC = () => {
  const {
    collections, 
    setSelectedSnippetsId,
    setActiveCollection,
    setDisableSnippets,
    activeCollection,
    setCurrentOverlayMenuPage,
    setShowOverlayMenuPage,
  } = useAppContext();
  
  return (

  <div className="flex flex-col overflow-y-auto pl-2">
    {collections.map((value, index) => (
      <button
        key={index}
        className="flex justify-start"
        onClick={() => {
          setSelectedSnippetsId([]);
          setActiveCollection(value);
          setDisableSnippets(false);
        }}
      >
        <div className={`w-full flex text-xl pl-2 ${activeCollection?.id == value.id ? "bg-neutral-900 text-white" : "hover:bg-slate-300 text-black"} hover:rounded`}>
          <div className="flex overflow-x-auto w-80">
            <div className="truncate flex">
              <div className="flex items-center">
              <div className="pr-2">
              <Folder/>
                </div>
              </div>
              <p className="truncate">{value.title}</p>
            </div>
          </div>
          <div className="flex-1 flex justify-end pr-2 ">
            <button onClick={() => handleDeleteCollection(value, setCurrentOverlayMenuPage, setShowOverlayMenuPage)}>
            <Trash2 />
            </button>
          </div>
        </div>
      </button>
    ))}
  </div>
);
}

export default Collections;
