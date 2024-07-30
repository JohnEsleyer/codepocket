'use client'

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { Collection, Snippet, Workspace} from '../home/types';
import { defaultFullscreenSnippet } from '../home/constants';

interface AppContextProps {
    collections: Collection[];
    setCollections: Dispatch<SetStateAction<Collection[]>>;
    snippets: Snippet[];
    setSnippets: Dispatch<SetStateAction<Snippet[]>>;
    orientation: string;
    setOrientation: Dispatch<SetStateAction<string>>;
    activeCollection?: Collection;
    setActiveCollection: Dispatch<SetStateAction<Collection | undefined>>;
    isFullScreen: boolean;
    setIsFullscreen: Dispatch<SetStateAction<boolean>>;
    fullScreenSnippet: Snippet;
    setFullScreenSnippet: Dispatch<SetStateAction<Snippet>>;
    singleColumn: boolean;
    setSingleColumn: Dispatch<SetStateAction<boolean>>;
    showOverlayMenuPage: boolean;
    setShowOverlayMenuPage: Dispatch<SetStateAction<boolean>>;
    currentOverlayMenuPage: string;
    setCurrentOverlayMenuPage: Dispatch<SetStateAction<string>>;
    selectedSnippetsId: number[];
    setSelectedSnippetsId: Dispatch<SetStateAction<number[]>>;
    filteredSnippets: Snippet[];
    setFilteredSnippets: Dispatch<SetStateAction<Snippet[]>>;
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
    linkId: string;
    setLinkId: Dispatch<SetStateAction<string>>;
    disableSnippets: boolean;
    setDisableSnippets: Dispatch<SetStateAction<boolean>>;
    workspaces: Workspace[];
    setWorkspaces: Dispatch<SetStateAction<Workspace[]>>;
    loadingAddCollection: boolean,
    setLoadingAddCollection: Dispatch<SetStateAction<boolean>>;
    loadingAddSnippet: boolean;
    setLoadingAddSnippet: Dispatch<SetStateAction<boolean>>;
    activeWorkspace: Workspace[];
    setActiveWorkspace: Dispatch<SetStateAction<Workspace[]>>;
  }


export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

