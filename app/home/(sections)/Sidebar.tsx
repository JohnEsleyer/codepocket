import React, { Dispatch, SetStateAction } from 'react';
import SidebarButton from '../_components/SidebarButton'; 
import Collections from './Collections';
import { DropdownMenu, DropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { workspacesData } from '../testData';

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
}) => (
  <div className={`${orientation == "Portrait" ? 'hidden' : ''} w-64 h-full flex flex-col border-r border-black`}>
    <div className="shadow">
      <p className="text-2xl font-bold p-2 flex justify-center">CodePocket</p>
      <div className="pt-4 pb-2 flex flex-col">
        <div className="pl-4">
          <DropdownMenu>
            <DropdownMenuTrigger>Workspaces</DropdownMenuTrigger>
            <DropdownMenuContent>
              {workspacesData.map((workspace) => (
                <div className="bg-white">{workspace.name}</div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <SidebarButton
          icon="search"
          text="Search"
          onClick={() => {
            setShowOverlayMenuPage(true);
            setFilteredSnippets([]);
            setCurrentOverlayMenuPage("search");
          }}
        />
        <SidebarButton
          icon="settings"
          text="Settings"
          onClick={() => {
            setShowOverlayMenuPage(true);
            setCurrentOverlayMenuPage("settings");
          }}
        />
        <SidebarButton
          icon="logout"
          text="Sign out"
          onClick={handleSignOut}
        />
        <SidebarButton
          icon="add"
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
  </div>
);

export default Sidebar;
