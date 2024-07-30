'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Collection } from '../types';
import { Folder, FolderCode, Trash2 } from 'lucide-react';
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
    activeWorkspace,
    currentCollectionsLength,
    setCurrentCollectionsLength,
  } = useAppContext();

  
  useEffect(() => {
    setCurrentCollectionsLength(collections.filter((value) => ( value.workspace_id == activeWorkspace?.id)).length);
  }, [activeWorkspace, collections]);

  return (

  <div className="flex flex-col overflow-y-auto pl-2">
    <div>{currentCollectionsLength} / 10</div>
    {collections.map((value, index) => ( value.workspace_id == activeWorkspace?.id && 
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
              <FolderCode />
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
