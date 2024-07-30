'use client'
import React, { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import IconButton from '@/app/_components/IconButton';
import WhiteLoading from "/public/loadingWhite.svg";
import { Collection, Snippet } from '../types';
import { languages } from '../constants';
import { handleUpdateCollectionTitle, handleUpdateSelectedSnippetLanguage, handleUpdateSnippetLanguage } from '../_utility/updateData';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { ChevronDown, CirclePlus, Earth, Folder, Share2, Trash2 } from 'lucide-react';
import MyDropdownMenu from '@/app/_components/DropdownMenu';
import { useAppContext } from '@/app/_context/AppContext';
import { handleAddSnippet } from '../_utility/addData';
import { handleMoveSnippets, handleShare } from '../_utility/otherHandlers';
import { handleDeleteSnippets } from '../_utility/deleteData';

interface ToolbarProps {
  scrollToBottom: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({scrollToBottom}) => {

  const {
    activeCollection, 
    loadingAddSnippet, 
    selectedSnippetsId, 
    setCollections,
    setActiveCollection,
    setSnippets,
    setLoadingAddSnippet,
    setLinkId,
    setShowOverlayMenuPage,
    setCurrentOverlayMenuPage,
    currentSnippetsLength,
    snippets,
  } = useAppContext();

  const [selectedLanguage, setSelectedLanguage] = useState('python');

  return (
  <div className="p-2 border-b border-black bg-neutral-900 text-white">
    <p className="text-2xl font-bold flex">
      <input
        className="text-2xl bg-neutral-900 w-full text-2xl font-bold"
        name="title"
        type="text"
        disabled={!activeCollection}
        value={activeCollection?.title}
        onChange={(event) => handleUpdateCollectionTitle(event,setCollections,activeCollection,setActiveCollection)}
      />
      {loadingAddSnippet && <span className="pl-2">
        <Image
          src={WhiteLoading}
          alt={''}
          width={30}
          height={30}
        />
      </span>}
    </p>
    <div className="flex space-x-4">
      <IconButton icon={<CirclePlus/>} text="New code snippet" onClick={() => {
        if (currentSnippetsLength < 20){
          handleAddSnippet(scrollToBottom,setLoadingAddSnippet,setSnippets,activeCollection);
        }
      }} disabled={!activeCollection}  />
      {activeCollection?.shared
        ? <IconButton icon={<Earth color='green' />} text="Public"  onClick={() => {
          handleShare(activeCollection, setLinkId, setActiveCollection, setCollections, setShowOverlayMenuPage, setCurrentOverlayMenuPage)
        }} />
        : <IconButton icon={<Share2 />} text="Share"  disabled={!activeCollection} onClick={() => {
          handleShare(activeCollection, setLinkId, setActiveCollection, setCollections, setShowOverlayMenuPage, setCurrentOverlayMenuPage)
        }} />}
      <IconButton icon={<Trash2 />} text="Delete"  disabled={selectedSnippetsId.length === 0} onClick={() => {handleDeleteSnippets(selectedSnippetsId, setSnippets, snippets)}} />
      <IconButton icon={<Folder/>} text="Move"  disabled={selectedSnippetsId.length === 0} onClick={() => {
        handleMoveSnippets(setCurrentOverlayMenuPage, setShowOverlayMenuPage);
      }} />
      <MyDropdownMenu buttonText={selectedLanguage} disabled={selectedSnippetsId.length === 0}>
        <div className="text-black h-44 grid grid-cols-1 w-24 bg-slate-100 overflow-y-auto">
          {languages.map((lang, index) => (
            <button key={index} onClick={() => {
              setSelectedLanguage(lang);
              handleUpdateSelectedSnippetLanguage(lang, setSnippets, selectedSnippetsId);
            }}>
              <p className="hover:bg-slate-300 p-1">{lang}</p>
            </button>
          ))}
        </div>
      </MyDropdownMenu>
  
    </div>
  </div>
  )
};

export default Toolbar;
