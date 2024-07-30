'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import SidebarButton from '../_components/SidebarButton'; 
import Collections from './Collections';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { CirclePlus, Folder, Icon, LogOut, Search, Settings } from 'lucide-react';
import { Collection, Workspace } from '../types';
import { useAppContext } from '@/app/_context/AppContext';
import { handleSignOut } from '../_utility/otherHandlers';
import { handleAddCollection, handleAddNewWorkspace } from '../_utility/addData';
import { handleChangeWorkspace } from '../_utility/updateData';


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
    setWorkspaces,
    setActiveWorkspace,
    collections,
    currentCollectionsLength,
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
          text={activeWorkspace?.name as string}
          disableHover={true}
          onClick={() => {
          }}
   
        />
        </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="bg-black text-white w-64 rounded p-4 shadow-md">
            <div>
              <p>{workspaces.length} / 3</p>
            </div>
            <div className="flex flex-col justify-between">
            
            {
              workspaces?.map((workspace) => (
                
                <button key={workspace.id} onClick={() => {
                  handleChangeWorkspace(workspace, setWorkspaces, setActiveWorkspace);
                }} className="w-full">
                  <DropdownMenuItem>
                <div className="p-1 flex items-center rounded hover:bg-slate-200 hover:text-black">
                  <Folder/>
                <div className="p-1 ">{workspace.name}</div>
                </div>
                </DropdownMenuItem>
                </button>
                
              ))
            }
            </div>
            <button onClick={() => {
              if (workspaces.length < 3){
                handleAddNewWorkspace(setWorkspaces);
              }
              
            }} className="w-full flex justify-center">
            <div className="flex bg-white text-black border-black border-2 p-2 rounded">
              <CirclePlus/>
              <span>Create new workspace</span>
            </div>
            </button>
           
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
            if (currentCollectionsLength < 10){
              handleAddCollection(setLoadingAddCollection, setCollections, activeWorkspace);
              console.log('added new colleciton!');
            }
            
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
