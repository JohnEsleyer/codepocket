'use client'
import React, { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import IconButton from '@/app/_components/IconButton';
import WhiteLoading from "/public/loadingWhite.svg";
import { Snippet } from '../types';
import DropdownMenu from '@/app/_components/DropdownMenu';
import { languages } from '../constants';
import { handleUpdateSelectedSnippetLanguage, handleUpdateSnippetLanguage } from '../_utility/updateData';

interface ToolbarProps {
  activeCollection: any;
  loadingAddSnippet: boolean;
  handleUpdateCollectionTitle: (event: React.ChangeEvent<HTMLInputElement>, collection: any, setCollections: any, setActiveCollection: any) => void;
  handleAddSnippet: () => void;
  handleShare: () => void;
  handleDeleteSnippets: (ids: any[], setSnippets: any) => void;
  selectedSnippetsId: any[];
  handleMoveSnippets: () => void;
  setCollections: (collections: any[]) => void;
  setActiveCollection: (collection: any) => void;
  setSnippets: Dispatch<SetStateAction<Snippet[]>>;
}

const Toolbar: React.FC<ToolbarProps> = ({
  activeCollection,
  loadingAddSnippet,
  handleUpdateCollectionTitle,
  handleAddSnippet,
  handleShare,
  handleDeleteSnippets,
  selectedSnippetsId,
  handleMoveSnippets,
  setCollections,
  setActiveCollection,
  setSnippets
}) => {

  const [selectedLangauge, setSelectedLanguage] = useState('python');
  
  return (
  <div className="p-2 border-b border-black bg-neutral-900 text-white">
    <p className="text-2xl font-bold flex">
      <input
        className="text-2xl bg-neutral-900 w-full text-2xl font-bold"
        name="title"
        type="text"
        disabled={!activeCollection}
        value={activeCollection?.title}
        onChange={(event) => handleUpdateCollectionTitle(event, activeCollection, setCollections, setActiveCollection)}
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
      <IconButton icon="add" text="New code snippet" onClick={handleAddSnippet} disabled={!activeCollection} isDark />
      {activeCollection?.shared
        ? <IconButton iconColor="green" textColor="green" icon="public" text="Public" isDark onClick={handleShare} />
        : <IconButton icon="share" text="Share" isDark disabled={!activeCollection} onClick={handleShare} />}
      <IconButton icon="delete" text="Delete" isDark disabled={selectedSnippetsId.length === 0} onClick={() => handleDeleteSnippets(selectedSnippetsId, setSnippets)} />
      <IconButton icon="folder" text="Move" isDark disabled={selectedSnippetsId.length === 0} onClick={handleMoveSnippets} />
      <DropdownMenu buttonText={selectedLangauge} disabled={selectedSnippetsId.length === 0}>
        <div className="text-black h-44 grid grid-cols-1 w-24 bg-slate-100 overflow-y-auto">
          {languages.map((lang, index) => (
            <button key={index} onClick={() => {
              setSelectedLanguage(lang);
              handleUpdateSelectedSnippetLanguage(lang, setSnippets, selectedSnippetsId)
            }}>
              <p className="hover:bg-slate-300 p-1">{lang}</p>
            </button>
          ))}
        </div>
      </DropdownMenu>

    </div>
  </div>
  )
};

export default Toolbar;
