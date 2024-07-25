import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import IconButton from '@/app/components/IconButton';
import WhiteLoading from "/public/loadingWhite.svg";
import { Snippet } from '../types';

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
  setSnippets:  Dispatch<SetStateAction<Snippet[]>>;
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
}) => (
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
    </div>
  </div>
);

export default Toolbar;
