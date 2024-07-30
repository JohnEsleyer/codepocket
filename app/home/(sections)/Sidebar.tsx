'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import SidebarButton from '../_components/SidebarButton'; 
import Collections from './Collections';
import { DropdownMenu, DropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { CirclePlus, Folder, Icon, LogOut, Search, Settings } from 'lucide-react';
import { Collection, Workspace } from '../types';
import { useAppContext } from '@/app/_context/AppContext';
import { handleSignOut } from '../_utility/otherHandlers';
import { handleAddCollection } from '../_utility/addData';


const Sidebar: React.FC = () => { 

  const {
    orientation,
    setShowOverlayMenuPage,
    setFilteredSnippets,
    setCurrentOverlayMenuPage,
    loadingAddCollection,
    workspaces,
    setLoadingAddCollection,
    setCollections,
    activeWorkspace,
  } = useAppContext();

  
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
          text='Niwejfiewjf'
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
          onClick={() => {
            handleSignOut(setShowOverlayMenuPage, setCurrentOverlayMenuPage)
          }}
        />
        <SidebarButton
          icon={<CirclePlus/>}
          text="Add a collection"
          onClick={()=> {
            handleAddCollection(setLoadingAddCollection, setCollections, activeWorkspace);
          }}
          loading={loadingAddCollection}
        />
      </div>
    </div>
    <Collections />
  </div>)
}
;

export default Sidebar;
