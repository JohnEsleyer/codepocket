'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import SidebarButton from '../_components/SidebarButton'; 
import Collections from './Collections';
import { DropdownMenu, DropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { CirclePlus, Folder, Icon, LogOut, Search, Settings } from 'lucide-react';
import { Collection, Workspace } from '../types';

interface SidebarProps {
  orientation: string;
  setShowOverlayMenuPage: (show: boolean) => void;
  setFilteredSnippets: (snippets: any[]) => void;
  setCurrentOverlayMenuPage: (page: string) => void;
  handleSignOut: () => void;
  handleAddCollection: () => void;
  loadingAddCollection: boolean;
  collections: any[];
  setSelectedSnippetsId: (ids: any[]) => void;
  setActiveCollection: (collection: any) => void;
  activeCollection: any;
  handleDeleteCollection: (value: any, setShowOverlayMenuPage: any, setCurrentOverlayMenuPage: any, setToDeleteCollection: any) => void;
  setDisableSnippets: Dispatch<SetStateAction<boolean>>;
  workspaces: Workspace[] | undefined;
}

const Sidebar: React.FC<SidebarProps> = ({
  orientation,
  setShowOverlayMenuPage,
  setFilteredSnippets,
  setCurrentOverlayMenuPage,
  handleSignOut,
  handleAddCollection,
  loadingAddCollection,
  collections,
  setSelectedSnippetsId,
  setActiveCollection,
  activeCollection,
  handleDeleteCollection,
  setDisableSnippets,
  workspaces,
}) => { 


  return(
  <div className={`${orientation == "Portrait" ? 'hidden' : ''} w-64 h-full flex flex-col border-r border-black`}>
    <div className="shadow">
      <p className="text-2xl font-bold p-2 flex justify-center">CodePocket</p>
      <div className="pt-4 pb-2 flex flex-col">
        <div className="flex">
        <DropdownMenu>
          <DropdownMenuTrigger>
          <div className="w-64 flex justify-start hover:bg-slate-300">
          <SidebarButton 
          icon={<Folder/>}
          text={workspaces?.filter((workspace) => (workspace.active == true))[0].name as string}
          disableHover={true}
          onClick={() => {
          }}
   
        />
        </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="bg-slate-100 w-64 rounded p-4 shadow-md">
            {
              workspaces?.map((workspace) => (
                <div>{workspace.name}</div>
              ))
            }
            <div className="flex justify-start border-black border-2 p-2 rounded">
              <CirclePlus/>
              <span>Create new workspace</span>
            </div>
           
            </div>
          </DropdownMenuContent>
        
        </DropdownMenu>
        </div>
        <SidebarButton
          icon={<Search />}
          text="Search"
          onClick={() => {
            setShowOverlayMenuPage(true);
            setFilteredSnippets([]);
            setCurrentOverlayMenuPage("search");
          }}
        />
        <SidebarButton
          icon={<Settings />}
          text="Settings"
          onClick={() => {
            setShowOverlayMenuPage(true);
            setCurrentOverlayMenuPage("settings");
          }}
        />
        <SidebarButton
          icon={ <LogOut />}
          text="Sign out"
          onClick={handleSignOut}
        />
        <SidebarButton
          icon={<CirclePlus/>}
          text="Add a collection"
          onClick={handleAddCollection}
          loading={loadingAddCollection}
        />
      </div>
    </div>
    <Collections
      collections={collections}
      setSelectedSnippetsId={setSelectedSnippetsId}
      setActiveCollection={setActiveCollection}
      activeCollection={activeCollection}
      handleDeleteCollection={handleDeleteCollection}
      setShowOverlayMenuPage={setShowOverlayMenuPage}
      setCurrentOverlayMenuPage={setCurrentOverlayMenuPage}
      setDisableSnippets={setDisableSnippets}
    />
  </div>)
}
;

export default Sidebar;
