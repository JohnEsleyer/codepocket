'use client'

import { ReactNode, useState } from "react";
import { defaultFullscreenSnippet } from "../home/constants";
import { Collection, Snippet, Workspace } from "../home/types";
import { AppContext } from "./AppContext";

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [collections, setCollections] = useState<Collection[]>([]);
    const [snippets, setSnippets] = useState<Snippet[]>([]);
    const [orientation, setOrientation] = useState<string>('');
    const [activeCollection, setActiveCollection] = useState<Collection>();
    const [isFullScreen, setIsFullscreen] = useState(false);
    const [fullScreenSnippet, setFullScreenSnippet] = useState<Snippet>(defaultFullscreenSnippet);
    const [singleColumn, setSingleColumn] = useState(false);
    const [showOverlayMenuPage, setShowOverlayMenuPage] = useState(false);
    const [currentOverlayMenuPage, setCurrentOverlayMenuPage] = useState('search');
    const [selectedSnippetsId, setSelectedSnippetsId] = useState<number[]>([]);
    const [filteredSnippets, setFilteredSnippets] = useState<Snippet[]>([]);
    const [query, setQuery] = useState('');
    const [linkId, setLinkId] = useState('');
    const [disableSnippets, setDisableSnippets] = useState(false);
    const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
    const [loadingAddCollection, setLoadingAddCollection] = useState(false);
    const [loadingAddSnippet, setLoadingAddSnippet] = useState(false);
    const [activeWorkspace, setActiveWorkspace] = useState<Workspace>();
    const [currentSnippetsLength, setCurrentSnippetsLength] = useState(0);
    const [currentCollectionsLength, setCurrentCollectionsLength] = useState(0);
    
    return (
        <AppContext.Provider
          value={{
            collections,
            setCollections,
            snippets,
            setSnippets,
            orientation,
            setOrientation,
            activeCollection,
            setActiveCollection,
            isFullScreen,
            setIsFullscreen,
            fullScreenSnippet,
            setFullScreenSnippet,
            singleColumn,
            setSingleColumn,
            showOverlayMenuPage,
            setShowOverlayMenuPage,
            currentOverlayMenuPage,
            setCurrentOverlayMenuPage,
            selectedSnippetsId,
            setSelectedSnippetsId,
            filteredSnippets,
            setFilteredSnippets,
            query,
            setQuery,
            linkId,
            setLinkId,
            disableSnippets,
            setDisableSnippets,
            workspaces,
            setWorkspaces,
            loadingAddCollection,
            setLoadingAddCollection,
            loadingAddSnippet,
            setLoadingAddSnippet,
            activeWorkspace,
            setActiveWorkspace,
            currentSnippetsLength,
            setCurrentSnippetsLength,
            currentCollectionsLength,
            setCurrentCollectionsLength,
          }}
        >
          {children}
        </AppContext.Provider>
      );
    };